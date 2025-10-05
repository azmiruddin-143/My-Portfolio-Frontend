// This file can be used as a page in the App Router (e.g., app/projects/create/page.tsx)
'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";

// --- Shadcn/ui Imports ---
// IMPORTANT: Adjust import paths based on your project structure
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import toast from 'react-hot-toast';

// =================================================================
// 1. Zod Validation Schema
// =================================================================
// Matches your required payload structure: title, description, features, thumbnail, liveUrl, authorId
const projectSchema = z.object({
  title: z.string().min(3, { message: "Project title must be at least 3 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  // Features and Thumbnail URLs are filtered to remove empty strings before validation/submission
  features: z.array(z.string()).min(1, { message: "At least one feature is required." }),
  thumbnail: z.array(z.string().url({ message: "Must be a valid URL" })).min(1, { message: "At least one thumbnail URL is required." }),
  liveUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal('')),
  authorId: z.number().int({ message: "Author ID must be an integer." }),
});

type ProjectFormData = z.infer<typeof projectSchema>;

// =================================================================
// 2. Server Action (Full-Stack API Logic)
// =================================================================

// This function runs exclusively on the server, acting as your API handler.
async function createProjectAction(data: ProjectFormData) {
  "use client"
  
  try {
    // Note: Zod validation runs twice (client-side in onSubmit, server-side here for security)
    const validatedData = projectSchema.parse(data);


    const response = await fetch("http://localhost:5000/api/v1/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(validatedData),
      cache: 'no-store',
      credentials: "include"
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        // Throw error from backend response message
        throw new Error(result.message || "Failed to create project on the backend.");
    }
    
    console.log("sss");
    // Optionally revalidate a path to show the new project on a listing page
    // revalidatePath("/projects"); 

    return {
        success: true, 
        message: result.message || "Project created successfully!", 
        data: result.data
    };

  } catch (error) {
    console.error("Project Creation Error:", error);
    return { 
        success: false, 
        message: error instanceof Error ? error.message : "An unknown error occurred during submission." 
    };
  }
}

// =================================================================
// 3. Main Form Component
// =================================================================

const defaultValues: ProjectFormData = {
  title: "",
  description: "",
  features: ["", ""], // Start with 2 empty fields
  thumbnail: ["", ""], // Start with 2 empty fields
  liveUrl: "",
  authorId: 3, // Default ID. In production, get this from an Auth context.
};


const CreateProject  =  () => {


 
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues,
    mode: "onChange",
  });

  // Hook to handle dynamic arrays for Features
  const { 
    fields: featureFields, 
    append: appendFeature, 
    remove: removeFeature 
  } = useFieldArray({
    control: form.control,
    name: "features",
  });

  // Hook to handle dynamic arrays for Thumbnails
  const { 
    fields: thumbnailFields, 
    append: appendThumbnail, 
    remove: removeThumbnail 
  } = useFieldArray({
    control: form.control,
    name: "thumbnail",
  });

  async function onSubmit(data: ProjectFormData) {
    setIsSubmitting(true);
    
    // Filter out empty strings from dynamic arrays before sending to the server
    const payload = {
      ...data,
      features: data.features.filter(f => f.trim() !== ""),
      thumbnail: data.thumbnail.filter(t => t.trim() !== ""),
    };

    const result = await createProjectAction(payload);
    setIsSubmitting(false);

    if (result.success) {
      toast.success(result.message);
      form.reset(defaultValues); // Reset form on success
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">Create New Project</CardTitle>
          <CardDescription>Fill out the details to showcase your work. All fields marked with * are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* General Information */}
              <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel className="font-semibold">Project Title *</FormLabel>
                              <FormControl>
                                  <Input placeholder="e.g., Full-Stack E-commerce Application" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="liveUrl"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel className="font-semibold">Live URL (Optional)</FormLabel>
                              <FormControl>
                                  <Input placeholder="https://myproject.example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Detailed Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain the project's purpose, technologies used, and key achievements."
                        rows={5}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />
              
              {/* Dynamic Features List */}
              <div className="space-y-4">
                <FormLabel className="text-xl font-bold block mb-4">✅ Key Features *</FormLabel>
                {featureFields.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <FormField
                      control={form.control}
                      name={`features.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input placeholder={`Feature ${index + 1}: e.g., Real-time data synchronization`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={featureFields.length <= 1} // Keep at least one for schema
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => appendFeature("")}
                  className="mt-2"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Another Feature
                </Button>
              </div>

              <Separator />
              
              {/* Dynamic Thumbnail URLs */}
              <div className="space-y-4">
                <FormLabel className="text-xl font-bold block mb-4">🖼️ Thumbnail URLs (Screenshots) *</FormLabel>
                {thumbnailFields.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <FormField
                      control={form.control}
                      name={`thumbnail.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input placeholder={`Image ${index + 1} URL: https://i.imgur.com/example${index + 1}.jpg`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeThumbnail(index)}
                      disabled={thumbnailFields.length <= 1}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => appendThumbnail("")}
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
                              {/* Use type="number" and value={field.value} onChange={e => field.onChange(Number(e.target.value))} if not using defaultValues */}
                              <Input type="number" {...field} />
                          </FormControl>
                      </FormItem>
                  )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
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