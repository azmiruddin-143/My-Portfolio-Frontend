/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react"; 

// ----------------------------------------------------------------
// A. ZOD SCHEMA (VALIDATION)
// ----------------------------------------------------------------
const CreateBlogSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters." }).max(250, { message: "Title is too long." }),
  content: z.string().min(20, { message: "Content must be at least 20 characters for a meaningful post." }),
  
  image: z.string().url({ message: "A valid image URL is required." }), 
});

type CreateBlogFormValues = z.infer<typeof CreateBlogSchema>;


export default function CreateBlog() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CreateBlogFormValues>({
    resolver: zodResolver(CreateBlogSchema),
    defaultValues: {
      title: "",
      content: "", 
      image: "",
    },
  });


  const onSubmit = async (values: CreateBlogFormValues) => {
    setIsSubmitting(true);
    
    // Payload তৈরি করা
    const payload = {
        title: values.title,
        content: values.content, 
        image: values.image, 
        
    };

    try {
      const response = await fetch("https://developerazmir.vercel.app/api/v1/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include", 
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Blog post created successfully!");
        form.reset(); 
        router.push('/dashboard/manage-blogs');
      } else {
        toast.error(data.message || "Failed to create blog post. Check backend logs.");
      }
    } catch (error) {
      toast.error("Network error. Could not connect to the backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
          Create New Blog Post
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            
            {/* 1. Title Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Post Title *</FormLabel>
                  <FormControl>
                    <Input 
                        placeholder="Write a compelling title for your blog post" 
                        className="h-12 text-xl dark:bg-gray-700 dark:text-white"
                        {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2. Image URL Input (Now Required) */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Image URL *</FormLabel>
                  <FormControl>
                    <Input 
                        placeholder="Paste the URL of your cover image here (e.g., https://example.com/image.jpg)" 
                        className="h-12 dark:bg-gray-700 dark:text-white"
                        {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. Content (Textarea) */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Content *</FormLabel>
                  <FormControl>
                    <Textarea
                        placeholder="Start writing your blog content here..."
                        className="min-h-[300px] text-lg resize-y dark:bg-gray-700 dark:text-white"
                        {...field} 
                    />
                  </FormControl>
                  <FormMessage /> 
                </FormItem>
              )}
            />

            {/* 4. Submit Button */}
            <Button 
                type="submit" 
                className="w-full h-14 text-xl font-bold bg-indigo-600 hover:bg-indigo-700 transition-all duration-200" 
                disabled={isSubmitting}
            >
              {isSubmitting ? (
                  <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Publishing...
                  </>
              ) : (
                  "Publish Post"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
