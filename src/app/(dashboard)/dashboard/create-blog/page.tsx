// src/app/dashboard/create-blog/page.tsx

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
const CreateBlogSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters." }).max(250, { message: "Title is too long." }),
  // content এখন একটি সাধারণ স্ট্রিং হিসেবে থাকবে
  content: z.string().min(50, { message: "Content must be at least 50 characters for a meaningful post." }),
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
    },
  });

  // --- B. API ইন্টিগ্রেশন এবং সাবমিশন ---
  const onSubmit = async (values: CreateBlogFormValues) => {
    setIsSubmitting(true);
    
    const payload = {
        title: values.title,
        content: values.content, 
    };

    try {
      const response = await fetch("http://localhost:5000/api/v1/blog", {
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
        router.push('/blogs'); 
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
      {/* রেসপনসিভ কন্টেইনার */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Create New Blog Post
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
                    {/* ✅ Textarea Component ব্যবহার করা হলো */}
                    <Textarea
                        placeholder="Start writing your blog content here..."
                        className="min-h-[300px] text-lg resize-y" // রেসপনসিভ উচ্চতা
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
                className="w-full h-14 text-xl font-bold bg-green-600 hover:bg-green-700" 
                disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}