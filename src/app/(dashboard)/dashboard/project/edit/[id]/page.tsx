/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"; // useFieldArray removed
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'; 

// --- Shadcn/ui Imports ---
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { revalidateProjectPage } from '../../../../../../app/revalidate-actions'; 
// =================================================================
// 1. Types and Schema
// =================================================================
const projectSchema = z.object({
  title: z.string().min(3, { message: "Project title must be at least 3 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  // features and thumbnail removed from zod to avoid useFieldArray error
  liveUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal('')),
  authorId: z.number().int({ message: "Author ID must be an integer." }),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectData extends ProjectFormData {
    id: number;
    createdAt: string;
    updatedAt: string;
    // Load original arrays for state initialization
    features: string[]; 
    thumbnail: string[];
}


const fetchProjectData = async (projectId: number): Promise<ProjectData | null> => {
    const apiUrl = `https://developerazmir.vercel.app/api/v1/project/${projectId}`;
    
    try {
        const response = await fetch(apiUrl, { cache: 'no-store', credentials: "include" });
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch project data from API.');
        }
        const data = await response.json();
        return data.data as ProjectData; 
    } catch (e) {
        console.error("Error fetching project data:", e);
        // Fallback mock data if API fails
        return { 
            id: projectId,
            title: `Fallback Project ID: ${projectId}`,
            description: "Mock data loaded. Check API status.",
            features: ["Mock Feature 1", "Mock Feature 2"],
            thumbnail: ["https://placehold.co/100x100/1e88e5/ffffff?text=Mock+Image"],
            liveUrl: "https://mockproject.example.com/edit",
            authorId: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as ProjectData;
    }
};

async function updateProjectAction(projectId: number, data: ProjectFormData & {features: string[], thumbnail: string[]}) {
    // ... (logic from previous fix) ...
    try {
        const apiUrl = `https://developerazmir.vercel.app/api/v1/project/${projectId}`
        ;
        const response = await fetch(apiUrl, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            cache: 'no-store',
            credentials: "include"
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to update project on the backend.");
        }
        return { success: true, message: result.message || "Project updated successfully!", data: result.data };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred during update." };
    }
}


// =================================================================
// 4. Main Form Component (Client Component)
// =================================================================

interface EditProjectProps {
    params: { id: string; };
}

const EditProject = ({ params }: EditProjectProps) => {
  const router = useRouter();
  const projectId = parseInt(params.id);

  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 🔥🔥 useFieldArray এর বদলে Local State 🔥🔥
  const [featureInputs, setFeatureInputs] = useState<string[]>([""]);
  const [thumbnailInputs, setThumbnailInputs] = useState<string[]>([""]);
  
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
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
    if (list.length > 1) { 
      setList(prev => prev.filter((_, i) => i !== index));
    } else {
        toast.error("You must keep at least one field.");
    }
  };


  // -------------------------
  // 4.2. Load Data and Set Defaults (useEffect ফিক্সড)
  // -------------------------
  useEffect(() => {
    const loadData = async () => {
        if (isNaN(projectId)) {
            toast.error("Invalid Project ID provided.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const data = await fetchProjectData(projectId);
        setProject(data);

        if (data) {
            // 1. useForm Field গুলোর মান সেট করা
            form.reset({
                title: data.title,
                description: data.description,
                liveUrl: data.liveUrl,
                authorId: data.authorId,
            });
            
            // 2. 🔥 Local State গুলোর মান সেট করা (features/thumbnail) 🔥
            const safeFeatures = data.features.length > 0 ? data.features : [""];
            const safeThumbnails = data.thumbnail.length > 0 ? data.thumbnail : [""];
            
            setFeatureInputs(safeFeatures);
            setThumbnailInputs(safeThumbnails);
        }
        
        setIsLoading(false);
    };

    loadData();
  }, [projectId]); 


  // -------------------------
  // 4.3. Form Submission Handler
  // -------------------------
  async function onSubmit(data: ProjectFormData) {
    if (!project) return; 

    setIsSubmitting(true);
    
    // 1. Local State থেকে ডেটা ফিল্টার করা
    const finalFeatures = featureInputs.map(f => f.trim()).filter(f => f.length > 0);
    const finalThumbnails = thumbnailInputs.map(t => t.trim()).filter(t => t.length > 0);
    
    // 2. Manual Validation Check
    if (finalFeatures.length === 0 || finalThumbnails.length === 0) {
        toast.error("Please add at least one feature and one image URL.");
        setIsSubmitting(false);
        return;
    }


    const payload = {
      ...data,
      features: finalFeatures,
      thumbnail: finalThumbnails,
    };

    const result = await updateProjectAction(projectId, payload);
    setIsSubmitting(false);

    if (result.success) {
    await revalidateProjectPage(projectId.toString()); 
      toast.success(result.message);
      router.push(`/projects`); // Redirect to the project listing page
    } else {
      toast.error(result.message); 
    }
  }

  // -------------------------
  // 4.4. Loading/Error States (remains the same)
  // -------------------------
  if (isLoading) {
    // ... Loading JSX ...
     return (
         <div className="min-h-screen flex items-center justify-center">
             <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
             <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">Loading project data...</p>
         </div>
     );
  }
  
  if (!project) {
    // ... Not Found JSX ...
     return (
         <div className="min-h-screen flex items-center justify-center text-red-500">
             <h1 className="text-3xl font-bold">Error: Project with ID {params.id} not found.</h1>
         </div>
     );
  }

  // -------------------------
  // 4.5. Render Form (Updated Inputs)
  // -------------------------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">Edit Project: #{projectId}</CardTitle>
          <CardDescription>Update the details for {project.title}. All changes will be saved upon clicking Update Project.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* General Information (useForm Fields - No change needed here) */}
              
              <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel className="font-semibold">Project Title *</FormLabel><FormControl>
                  <Input placeholder="e.g., Full-Stack E-commerce Application" {...field} /></FormControl><FormMessage /></FormItem>)} />
              
              <FormField control={form.control} name="liveUrl" render={({ field }) => (<FormItem><FormLabel className="font-semibold">Live URL (Optional)</FormLabel><FormControl>
                  <Input placeholder="https://myproject.example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />

              <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel className="font-semibold">Detailed Description *</FormLabel><FormControl>
                  <Textarea placeholder="Explain the project's purpose, technologies used, and key achievements." rows={5} className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>)} />

              <Separator />
              
              {/* 🔥🔥 DYNAMIC FEATURES LIST (useState Method) 🔥🔥 */}
              <div className="space-y-4">
                <FormLabel className="text-xl font-bold block mb-4">✅ Key Features *</FormLabel>
                {featureInputs.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Input 
                        placeholder={`Feature ${index + 1}: e.g., Real-time data synchronization`} 
                        value={feature}
                        // Manual state update
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
              
              {/* Dynamic Thumbnail URLs */}
              <div className="space-y-4">
                <FormLabel className="text-xl font-bold block mb-4">🖼️ Thumbnail URLs (Screenshots) *</FormLabel>
                {thumbnailInputs.map((thumbnail, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {/* No FormField wrapper needed as we use local state */}
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
                    Saving Changes...
                  </>
                ) : (
                  "Update Project"
                )}
              </Button>
              
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProject;