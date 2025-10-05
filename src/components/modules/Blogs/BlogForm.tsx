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

// ----------------------------------------------------------------
// A. ZOD SCHEMA (VALIDATION)
// ----------------------------------------------------------------
const BlogSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters." }).max(250, { message: "Title is too long." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters for a meaningful post." }),
});

type BlogFormValues = z.infer<typeof BlogSchema>;

// ----------------------------------------------------------------
// B. COMPONENT PROPS (Create vs. Edit)
// ----------------------------------------------------------------
interface BlogFormProps {
    type: 'create' | 'edit';
    blogId?: string; // Edit এর জন্য আবশ্যিক
    initialData?: BlogFormValues; // Edit এর জন্য ডিফল্ট ভ্যালু
}


export default function BlogForm({ type, blogId, initialData }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ✅ 1. defaultValues এ initialData ব্যবহার করা হলো
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "", 
    },
  });

  // --- C. API ইন্টিগ্রেশন এবং সাবমিশন ---
  const onSubmit = async (values: BlogFormValues) => {
    setIsSubmitting(true);
    

    

    try {
      const response = await fetch(`http://localhost:5000/api/v1/blog/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(values),
        credentials: "include", 
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(`Blog post updated successfully!`);
        form.reset(); 
        // সফলতার পর ম্যানেজ পেজে নিয়ে যান
        router.push('/dashboard/manage-blogs'); 
      } else {
        toast.error(data.message || `Failed to update blog post.`);
      }
    } catch (error) {
      toast.error("Network error. Could not connect to the backend.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const pageTitle = type === 'edit' ? `Edit Blog Post (ID: ${blogId})` : "Create New Blog Post";
  const buttonText = isSubmitting ? (type === 'edit' ? "Updating..." : "Publishing...") : (type === 'edit' ? "Update Post" : "Publish Post");


  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          {pageTitle}
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-100"
          >
            
            {/* 1. Title Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Post Title</FormLabel>
                  <FormControl>
                    <Input 
                        placeholder="Write a compelling title for your blog post" 
                        className="h-14 text-xl"
                        {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2. Content (Textarea) */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Content</FormLabel>
                  <FormControl>
                    <Textarea 
                        placeholder="Start writing your blog content here..."
                        className="min-h-[300px] text-lg resize-y"
                        {...field} 
                    />
                  </FormControl>
                  <FormMessage /> 
                </FormItem>
              )}
            />

            {/* 3. Submit Button */}
            <Button 
                type="submit" 
                className="text-red-600 bg-amber-500 py-2 px-2"
                disabled={isSubmitting}
            >
              {buttonText}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
