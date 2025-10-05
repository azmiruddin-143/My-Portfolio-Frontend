// This file assumes a structure like: app/projects/[id]/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from 'next/navigation';

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
// 1. Zod Validation Schema (Must be the same as the Create Form)
// =================================================================
const projectSchema = z.object({
  title: z.string().min(3, { message: "Project title must be at least 3 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  features: z.array(z.string()).min(1, { message: "At least one feature is required." }),
  thumbnail: z.array(z.string().url({ message: "Must be a valid URL" })).min(1, { message: "At least one thumbnail URL is required." }),
  liveUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal('')),
  authorId: z.number().int({ message: "Author ID must be an integer." }),
});

type ProjectFormData = z.infer<typeof projectSchema>;

// Mock/Default data structure for fetching
interface ProjectData extends ProjectFormData {
    id: number;
}

// =================================================================
// 2. Server Action (Update API Logic)
// =================================================================

// This function runs exclusively on the server, handling the UPDATE request
async function updateProjectAction(projectId: number, data: ProjectFormData) {

  
  try {
 
  const validatedData = projectSchema.parse(data);
    const response = await fetch(`http://localhost:5000/api/v1/project/${projectId}`, {
      method: "PUT", // Use PUT or PATCH for updates
      headers: {
        "Content-Type": "application/json",
        // Add Authorization header here if needed
      },
      body: JSON.stringify(validatedData),
      cache: 'no-store',
      credentials: "include"
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update project on the backend.");
    }
    
    // Optionally revalidate a path to show the updated project data
    // revalidatePath(`/projects/${projectId}`); 

    return {
        success: true, 
        message: result.message || "Project updated successfully!", 
        data: result.data
    };

  } catch (error) {
    console.error("Project Update Error:", error);
    return { 
        success: false, 
        message: error instanceof Error ? error.message : "An unknown error occurred during update." 
    };
  }
}


// =================================================================
// 3. Data Fetching Simulation
// =================================================================
// In a real application, this function would be an async Server Component function 
// that fetches data from your backend. Since we are in a single 'use client' file 
// to meet your request, we will simulate the fetch with a useEffect hook.

const fetchProjectData = async (projectId: number): Promise<ProjectData> => {
    // !!! REPLACE THIS MOCK FETCH with your actual API call !!!
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api/v1/projects"}/${projectId}`;
    
    try {
        // This is a placeholder for your actual data fetching
        const response = await fetch(apiUrl, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Failed to fetch project data');
        }
        const data = await response.json();
        
        // Assuming your backend returns data in the expected shape
        return data.data as ProjectData; 
    } catch (e) {
        console.error("Error fetching project data:", e);
        // Fallback mock data for demonstration if API fails
        return { 
            id: projectId,
            title: "Fallback Ecommerce Project Title",
            description: "Failed to load data, showing mock values. This is a fallback project built to show features and live URL.",
            features: ["Mock Feature 1", "Mock Feature 2", "Mock Feature 3"],
            thumbnail: ["https://i.imgur.com/example1.jpg", "https://i.imgur.com/example2.jpg"],
            liveUrl: "https://mockproject.example.com",
            authorId: 3
        };
    }
};


// =================================================================
// 4. Main Form Component (Client Component)
// =================================================================

interface EditProjectProps {
    // Next.js App Router passes 'params' which contains the dynamic route segment
    params: {
        id: string; 
    };
}

const EditProject = ({ params }: EditProjectProps) => {
  const router = useRouter();
  const projectId = parseInt(params.id);

  // State to handle data loading and form submission
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // -------------------------
  // 4.1. Initialize Form
  // -------------------------
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
  });

  // Access to dynamic fields arrays
  const { 
    fields: featureFields, 
    append: appendFeature, 
    remove: removeFeature,
    replace: replaceFeature,
  } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const { 
    fields: thumbnailFields, 
    append: appendThumbnail, 
    remove: removeThumbnail,
    replace: replaceThumbnail,
  } = useFieldArray({
    control: form.control,
    name: "thumbnail",
  });


  // -------------------------
  // 4.2. Load Data on Mount
  // -------------------------
  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
        const data = await fetchProjectData(projectId);
        setProject(data);

        // Set form default values using the fetched data
        form.reset({
            title: data.title,
            description: data.description,
            liveUrl: data.liveUrl,
            authorId: data.authorId,
            // Dynamic arrays need special handling (replace existing empty ones)
            features: data.features.length > 0 ? data.features : ["", ""],
            thumbnail: data.thumbnail.length > 0 ? data.thumbnail : ["", ""],
        });
        
        // This is necessary because form.reset might not correctly handle the field arrays
        // with empty strings if the fetched data was empty.
        replaceFeature(data.features.length > 0 ? data.features : ["", ""]);
        replaceThumbnail(data.thumbnail.length > 0 ? data.thumbnail : ["", ""]);
        
        setIsLoading(false);
    };

    if (projectId) {
        loadData();
    }
  }, [projectId]); // Depend on projectId to re-run if it changes (rarely)


  // -------------------------
  // 4.3. Form Submission Handler
  // -------------------------
  async function onSubmit(data: ProjectFormData) {
    if (!project) return; // Should not happen if data loaded

    setIsSubmitting(true);
    
    // Filter out empty strings from dynamic arrays before sending to the server
    const payload = {
      ...data,
      features: data.features.filter(f => f.trim() !== ""),
      thumbnail: data.thumbnail.filter(t => t.trim() !== ""),
    };

    const result = await updateProjectAction(projectId, payload);
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Project Update");
      // Redirect to the project detail page after successful update
      router.push(`/projects`); 
    } else {
      toast.error(result.message); 
    }
  }

  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            <p className="ml-3 text-lg">Loading project data...</p>
        </div>
    );
  }
  
  if (!project) {
    return (
        <div className="min-h-screen flex items-center justify-center text-red-500">
            <h1 className="text-3xl">Error: Project not found.</h1>
        </div>
    );
  }

  // -------------------------
  // 4.4. Render Form
  // -------------------------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">Edit Project: #{projectId}</CardTitle>
          <CardDescription>Update the details for {project.title}. The changes will be saved to the database.</CardDescription>
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
                            <Input placeholder={`Feature ${index + 1}: e.g., User Authentication`} {...field} />
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
                      disabled={featureFields.length <= 1} 
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