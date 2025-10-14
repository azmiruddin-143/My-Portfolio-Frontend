/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, } from "react";
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
import { revalidateProjectPage } from "@/app/revalidate-actions";

// ----------------------------------------------------------------
// A. ZOD SCHEMA (VALIDATION) - Create Blog থেকে আনা
// ----------------------------------------------------------------
const BlogSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters." }).max(250, { message: "Title is too long." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters for a meaningful post." }),
  // 🔥 নতুন/আপডেটেড ফিল্ড: image (URL) - বাধ্যতামূলক
  image: z.string().url({ message: "A valid image URL is required." }), 
});

type BlogFormValues = z.infer<typeof BlogSchema>;

// API থেকে আসা ডেটার জন্য টাইপ
interface BlogData {
    id: number;
    title: string;
    content: string; 
    // 🔥 নিশ্চিত করুন image ফিল্ডটি আছে
    image: string | null; 
    // ... অন্যান্য ফিল্ড
}

interface BlogFormProps {
    initialData: BlogData; 
    type: "create" | "edit";
    blogId?: string; // Edit এর জন্য blogId প্রয়োজন
}

// ----------------------------------------------------------------
// B. MAIN FORM COMPONENT
// ----------------------------------------------------------------
export default function BlogForm({ initialData, type, blogId }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 1. Default Values সেট করুন (initialData থেকে)
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: initialData.title || "",
      content: initialData.content || "", 
      image: initialData.image || "", 
    },
  });


  // --- C. ফর্ম সাবমিশন লজিক ---
  const onSubmit = async (values: BlogFormValues) => {
    if (type !== 'edit' || !blogId) return; 

    setIsSubmitting(true);
    
    // Payload তৈরি করা
    const payload = {
        title: values.title,
        content: values.content, 
        image: values.image, 
    };

    try {
      // Edit এর জন্য PUT মেথড ব্যবহার করা হচ্ছে
      const response = await fetch(`https://developerazmir.vercel.app/api/v1/blog/${blogId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include", // কুকি পাঠানোর জন্য
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await revalidateProjectPage(blogId.toString());
        toast.success(`Blog post ID ${blogId} updated successfully!`);
        // আপডেটের পর ম্যানেজ পেজে রিডাইরেক্ট
        router.push('/dashboard/manage-blogs'); 
      } else {
        toast.error(data.message || "Failed to update blog post. Check backend logs.");
      }
    } catch (error) {
      toast.error("Network error. Could not connect to the backend.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
          {type === 'edit' ? `Edit Blog Post` : 'Create New Blog Post'}
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
                  <FormLabel className="text-xl font-bold">Blog Title *</FormLabel>
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

            {/* 2. Image URL Input */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Image URL *</FormLabel>
                  <FormControl>
                    {/* 🔥 default value হিসেবে initialData.image দেখাবে */}
                    <Input 
                        placeholder="Paste the URL of your cover image here" 
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
                    {/* 🔥 default value হিসেবে initialData.content দেখাবে */}
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
                      Saving Changes...
                  </>
              ) : (
                  "Update Blog"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}