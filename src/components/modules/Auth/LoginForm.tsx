// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Eye, EyeOff } from "lucide-react"; 
// import { zodResolver } from "@hookform/resolvers/zod"; 
// import * as z from "zod"; 
// import toast from "react-hot-toast"; 
// import { useRouter } from "next/navigation"; 

// // --- A. ZOD SCHEMA তৈরি (VALIDATION) ---
// const LoginFormSchema = z.object({
//   email: z.string().email({ message: "Invalid email format." }),
//   password: z.string().min(1, { message: "Password is required." }),
// });

// type LoginFormValues = z.infer<typeof LoginFormSchema>;

// export default function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter(); 
  
//   const form = useForm<LoginFormValues>({
//     // ✅ Resolver যুক্ত করা
//     resolver: zodResolver(LoginFormSchema), 
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

// const onSubmit = async (values: LoginFormValues) => {
//     setIsSubmitting(true);
//     // ✅ আপনার লগইন API এর URL
//     const API_URL = "http://localhost:5000/api/v1/auth/login"; 

//     try {
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             // ✅ ফ্রন্টএন্ড থেকে শুধু email এবং password পাঠানো হচ্ছে
//             body: JSON.stringify(values),
//             credentials: "include", 
//         });

//         // 1. JSON ডেটা পার্স করার চেষ্টা করুন
//         const data = await response.json();
        
//         // ----------------------------------------------------
//         // ✅ ফেইলুর লজিক (HTTP 4xx/5xx অথবা data.success === false)
//         // ----------------------------------------------------
//         // response.ok (2xx স্ট্যাটাস) নয়, অথবা JSON বডিতে success: false থাকলে
//         if (!response.ok || data.success === false) { 
//             const errorMessage = 
//                 data.message || 
//                 (response.status === 401 ? "Invalid email or password. Please check your credentials." : "Login failed due to a server error.");
            
//             toast.error(errorMessage);
//             return; // ফেইল হলে এখান থেকেই ফাংশন বন্ধ হবে।
//         }

//         // ----------------------------------------------------
//         // ✅ সফলতার লজিক (data.success === true এবং response.ok)
//         // ----------------------------------------------------
        
//         // আপনার সার্ভার রেসপন্স: { success: true, message: '...', user: {...} }
//         if (data.success && data.message === "User Login Successfully") { 
//             toast.success("Login successful! Redirecting to Dashboard.");
            
//             // ✅ কুকি সেট হয়ে যাওয়ায়, শুধু ইউজারের রোলটি সেভ করা হচ্ছে
//             // যাতে ফ্রন্টএন্ডে role based routing করা যায়।
//             const userRole = data.user?.role || "USER"; 
//             localStorage.setItem("userRole", userRole); 

//             form.reset();
//             // router.push('/dashboard'); 
            
//         } else {
//              // অপ্রত্যাশিত success: true রেসপন্স কিন্তু মেসেজ বা ডেটা মিসিং
//             toast.error("An unexpected response received from the server.");
//         }

//     } catch (error) {
//         // নেটওয়ার্ক সংযোগ বিচ্ছিন্ন হলে
//         toast.error("Network error. Could not connect to the server.");
//     } finally {
//         setIsSubmitting(false);
//     }
// };



//   const handleSocialLogin = (provider: "google" | "github") => {
//     toast.error(`Social login for ${provider} is not implemented yet.`);
//    signIn()
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6 w-full max-w-md"
//           >
//             <h2 className="text-3xl font-bold text-center">Login</h2>

//             {/* Email Field (Required & Valid Email) */}
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="Enter your email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Password Field (Required & Eye Icon) */}
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Input
//                         type={showPassword ? "text" : "password"} // ✅ type পরিবর্তন হবে
//                         placeholder="Enter your password"
//                         {...field}
//                       />
//                       {/* ✅ Eye Icon */}
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="h-5 w-5" />
//                         ) : (
//                           <Eye className="h-5 w-5" />
//                         )}
//                       </button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
//               {isSubmitting ? "Logging in..." : "Login"}
//             </Button>

//             <div className="flex items-center justify-center space-x-2">
//               <div className="h-px w-16 bg-gray-300" />
//               <span className="text-sm text-gray-500">or continue with</span>
//               <div className="h-px w-16 bg-gray-300" />
//             </div>
//           </form>
//         </Form>
        
//         {/* Social Login Buttons (Design same রাখা হয়েছে) */}
//         <div className="flex flex-col gap-3 mt-4">
//           <Button
//             variant="outline"
//             className="flex items-center justify-center gap-2"
//             onClick={() => handleSocialLogin("github")}
//           >
//             <Image
//               src="https://img.icons8.com/ios-glyphs/24/github.png"
//               alt="GitHub"
//               className="w-5 h-5"
//               width={20}
//               height={20}
//             />
//             Login with GitHub
//           </Button>

//           <Button
//             variant="outline"
//             className="flex items-center justify-center gap-2"
//             // onClick={() => signIn('google', {
//             //   callbackUrl:"/dashboard"
//             // })}
//           >
//             <Image
//               src="https://img.icons8.com/color/24/google-logo.png"
//               alt="Google"
//               className="w-5 h-5"
//               width={20}
//               height={20}
//             />
//             Login with Google
//           </Button>
//         </div>
        
//         {/* Register Link */}
//         <p className="text-center text-sm text-gray-500 mt-4">
//           Don’t have an account?{" "}
//           <Link href="" className="text-blue-500 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react"; // <--- এটি আর দরকার নেই
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import * as z from "zod"; 
import toast from "react-hot-toast"; 
import { useRouter } from "next/navigation"; 

// --- A. ZOD SCHEMA তৈরি (VALIDATION) ---
const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); 
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema), 
    defaultValues: {
      email: "",
      password: "",
    },
  });

const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    // ✅ আপনার লগইন API এর URL
    const API_URL = "http://localhost:5000/api/v1/auth/login"; 

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include", 
        });

        const data = await response.json();
        
        if (!response.ok || data.success === false) { 
            const errorMessage = 
                data.message || 
                (response.status === 401 ? "Invalid email or password. Please check your credentials." : "Login failed due to a server error.");
            
            toast.error(errorMessage);
            return;
        }

        // ----------------------------------------------------
        // ✅ সফলতার লজিক
        // ----------------------------------------------------
        
        if (data.success && data.message === "User Login Successfully") { 
            toast.success("Login successful! Redirecting to Dashboard.");
            
            // ✅ লগইন সফল হওয়ায়, এখন ড্যাশবোর্ড রুটে রিডাইরেক্ট করা হচ্ছে
            // Middleware কুকি চেক করে অ্যাক্সেস দেবে
            router.push('/dashboard'); 
            form.reset();
        } else {
            toast.error("An unexpected response received from the server.");
        }

    } catch (error) {
        toast.error("Network error. Could not connect to the server.");
    } finally {
        setIsSubmitting(false);
    }
};

  // Social Login এখন অকেজো (Not Implemented)
  const handleSocialLogin = (provider: "google" | "github") => {
    toast.error(`Social login for ${provider} is not implemented in this custom setup.`);
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-center">Admin Login</h2>

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your admin email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-16 bg-gray-300" />
              <span className="text-sm text-gray-500">or continue with</span>
              <div className="h-px w-16 bg-gray-300" />
            </div>
          </form>
        </Form>
        
        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => handleSocialLogin("github")}
          >
            <Image
              src="https://img.icons8.com/ios-glyphs/24/github.png"
              alt="GitHub"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            Login with GitHub
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => handleSocialLogin("google")}
          >
            <Image
              src="https://img.icons8.com/color/24/google-logo.png"
              alt="Google"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            Login with Google
          </Button>
        </div>
        
        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

