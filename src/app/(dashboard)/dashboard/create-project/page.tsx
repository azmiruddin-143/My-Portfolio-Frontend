

'use client';

import React, { useState } from 'react';
import { useForm } from "react-hook-form"; // useFieldArray removed
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// =================================================================
// 1. Zod Validation Schema (অপরিবর্তিত)
// =================================================================
const projectSchema = z.object({
  title: z.string().min(3, { message: "Project title must be at least 3 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  // features and thumbnail now handled by custom logic and validated in onSubmit
  liveUrl: z.string().url({ message: "A valid image URL is required." }),
  projectUrl: z.string().url({ message: "A valid image URL is required." }),


  authorId: z.number().int({ message: "Author ID must be an integer." }),

});

type ProjectFormData = z.infer<typeof projectSchema>;

// =================================================================
// 3. Main Form Component
// =================================================================

const defaultValues: ProjectFormData = {
  title: "",
  description: "",
  liveUrl: "",
  projectUrl: "",
  authorId: 3,
};


const CreateProject = () => {
  const router = useRouter();
  // 🔥🔥 useFieldArray এর বদলে useState ব্যবহার করা হলো 🔥🔥
  const [featureInputs, setFeatureInputs] = useState(["", ""]); // Start with 2 empty fields
  const [thumbnailInputs, setThumbnailInputs] = useState([""]); // Start with 2 empty fields
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues,
    mode: "onChange",
  });


  // --- Helper Functions for Local State Management ---

  const handleInputChange = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  const handleAddField = (setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(prev => [...prev, ""]);
  };

  const handleRemoveField = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    if (list.length > 1) { // অন্তত একটি ইনপুট রাখা হলো
      setList(prev => prev.filter((_, i) => i !== index));
    }
  };

  // --- API Submission ---
  async function onSubmit(data: ProjectFormData) {
    setIsSubmitting(true);

    // 1. Local State থেকে ডেটা ফিল্টার করা
    const finalFeatures = featureInputs.map(f => f.trim()).filter(f => f.length > 0);
    const finalThumbnails = thumbnailInputs.map(t => t.trim()).filter(t => t.length > 0);

    // 2. ক্লায়েন্ট-সাইড ভ্যালিডেশন চেক (যেহেতু Zod স্কিমাতে অ্যারে নেই)
    if (finalFeatures.length === 0 || finalThumbnails.length === 0) {
      toast.error("Please add at least one feature and one image URL.");
      setIsSubmitting(false);
      return;
    }

    // 3. চূড়ান্ত Payload তৈরি


    const payload = {
      ...data,
      features: finalFeatures,
      thumbnail: finalThumbnails,
    };

    // console.log(payload);
    // // ... (API কল লজিক)
    try {
      const response = await fetch("https://developerazmir.vercel.app/api/v1/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Project created successfully!");
        router.push('/dashboard/manage-projects');
        form.reset(defaultValues);
        setFeatureInputs(["", ""]); // লোকাল স্টেট রিসেট
        setThumbnailInputs(["", ""]); // লোকাল স্টেট রিসেট
      } else {
        throw new Error(result.message || "Failed to create project.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 p-4 md:p-8">
      <Card className=" shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">Create New Project</CardTitle>
          <CardDescription>Fill out the details to showcase your work. All fields marked with * are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {/* Note: useFieldArray এর ঝামেলা এড়াতে form ট্যাগের ভেতরেই সরাসরি ইনপুট ব্যবহার করা হয়েছে */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel className="font-semibold">Project Title *</FormLabel><FormControl>
                  <Input placeholder="e.g., Full-Stack E-commerce Application" {...field} /></FormControl><FormMessage /></FormItem>
              )} />

            
                {/* Live URL Field */}
                <FormField control={form.control} name="liveUrl" render={({ field }) => (
                  <FormItem><FormLabel className="font-semibold">Live URL</FormLabel><FormControl>
                    <Input placeholder="https://myproject.example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />


                {/* project URL Field */}
                <FormField control={form.control} name="projectUrl" render={({ field }) => (
                  <FormItem><FormLabel className="font-semibold">Project URL </FormLabel><FormControl>
                    <Input  placeholder="https://myproject.example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              

              {/* Description Field */}
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel className="font-semibold">Detailed Description *</FormLabel><FormControl>
                  <Textarea placeholder="Explain the project's purpose..." rows={5} className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>
              )} />


              <Separator />

              {/* 🔥🔥 DYNAMIC FEATURES LIST (useState Method) 🔥🔥 */}
              <div className="space-y-4">
                <FormLabel className="text-xl font-bold block mb-4">✅ Key Features *</FormLabel>
                {featureInputs.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Input
                      placeholder={`Feature ${index + 1}: e.g., Real-time data synchronization`}
                      value={feature}
                      onChange={(e) => handleInputChange(featureInputs, setFeatureInputs, index, e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveField(featureInputs, setFeatureInputs, index)}
                      disabled={featureInputs.length <= 1}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleAddField(setFeatureInputs)}
                  className="mt-2"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Another Feature
                </Button>
                {/* Manual Error Message for required array */}
                {(featureInputs.filter(f => f.trim() !== "").length === 0 && !isSubmitting) && (
                  <p className="text-sm font-medium text-red-500">At least one feature is required.</p>
                )}
              </div>

              <Separator />

              {/* 🔥🔥 DYNAMIC THUMBNAIL URLS (useState Method) 🔥🔥 */}
              <div className="space-y-4">
                <FormLabel className="text-xl font-bold block mb-4">🖼️ Thumbnail URLs (Screenshots) *</FormLabel>
                {thumbnailInputs.map((thumbnail, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Input
                      placeholder={`Image ${index + 1} URL: https://i.imgur.com/example${index + 1}.jpg`}
                      value={thumbnail}
                      onChange={(e) => handleInputChange(thumbnailInputs, setThumbnailInputs, index, e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveField(thumbnailInputs, setThumbnailInputs, index)}
                      disabled={thumbnailInputs.length <= 1}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>

                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleAddField(setThumbnailInputs)}
                  className="mt-2"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Another Image
                </Button>
              </div>

              {/* Author ID (Hidden/Pre-filled) */}
              <FormField
                control={form.control}
                name="authorId"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  "Save Project"
                )}
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;


