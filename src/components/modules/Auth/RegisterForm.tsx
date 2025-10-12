"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import * as z from "zod"; 


// --- ১. ZOD SCHEMA তৈরি (VALIDATION) ---
const passwordStrengthRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const RegisterFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  // Phone এর জন্য স্ট্রিং ভ্যালিডেশন, min 10 digits
  phone: z.string().regex(/^[0-9]{11,}$/, { message: "Valid phone number (min 10 digits) is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(passwordStrengthRegex, {
      message: "Password must include uppercase, lowercase, number, and special character.",
    }),
});

type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const form = useForm<RegisterFormValues>({
    // ✅ zodResolver দিয়ে ভ্যালিডেশন যুক্ত করা হয়েছে
    resolver: zodResolver(RegisterFormSchema), 
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  // --- ২. ফর্ম সাবমিশন এবং ব্যাকএন্ডে ডেটা পাঠানো ---
  // const onSubmit = async (values: RegisterFormValues) => {
  //   setIsSubmitting(true);
    
  //   // আপনার রেজিস্ট্রেশন রুট
  //   const API_URL = "http://localhost:5000/api/v1/auth"; 
  //   const payload = { ...values, role: "USER" }; 

  //   try {
  //     const response = await fetch(API_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();

  //     if (response.ok && data.success) {
  //       toast.success("Registration successful! Please log in.");
  //       form.reset(); // ফর্ম রিসেট করুন
  //       router.push('/login'); // সফল হলে লগইন পেজে রিডাইরেক্ট করুন
  //     } else {
  //       // ব্যাকএন্ড ভ্যালিডেশন এরর, যেমন ইমেল অলরেডি বিদ্যমান
  //       toast.error(data.message || "Registration failed. Please try again.");
  //     }
  //   } catch (error) {
  //     toast.error("Network error. Could not connect to the server.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Form {...form}>
        <form
          // ✅ Invalid হলে submit হবে না এবং error দেখানো হবে
          
          className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-bold text-center">Register Now</h2>
          
          {/* Name Field (Required) */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Email Field (Required & Valid Email) */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone Field (Required & Valid Format) */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Password Field (Required, Strong Password Check, Eye Icon) */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"} // ✅ type পরিবর্তন হবে
                      placeholder="Enter your password"
                      {...field}
                    />
                    {/* ✅ Eye Icon - ইনপুট ফিল্ডের ভেতরে */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      // Tailwind class দিয়ে পজিশনিং করা হয়েছে
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                {/* ❌ এরর মেসেজ */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}