/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/shared/Sidebar.tsx

"use client";

import Link from "next/link";
import { LogOut, Home, PlusCircle, Settings, Menu, Layers } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
// ✅ shadcn/ui থেকে আপনার কম্পোনেন্টগুলি ইম্পোর্ট করুন (যদি প্রয়োজন হয়)
import { Button } from "@/components/ui/button"; 
// ধরে নিচ্ছি shadcn/ui Sidebar আপনাকে কিছু utility component দিয়েছে

// ----------------------------------------------------------------
// আপনার প্রোফাইল তথ্য এবং লজিক
// ----------------------------------------------------------------
const ProfileSection = ({ user }: { user: any }) => (
    <div className="flex items-center justify-between p-4 border-t border-gray-700 bg-gray-900/50">
        <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
                {user?.name || "Portfolio Admin"}
            </span>
            <span className="text-xs text-gray-400">
                {user?.email || "admin@example.com"}
            </span>
        </div>
        {/* আপনি এখানে একটি আইকন বা ডিকনস্ট্রাকশন বাটন দিতে পারেন */}
        <Menu className="h-4 w-4 text-gray-400 cursor-pointer" />
    </div>
);

// ----------------------------------------------------------------
// প্রধান Sidebar কম্পোনেন্ট
// ----------------------------------------------------------------
export default function Sidebar() {
    const { data: session, status } = useSession();
    const user = session?.user; // Next-Auth থেকে ইউজার ডেটা

    // সাইডবার আইটেম (আপনার প্রয়োজন অনুযায়ী সাজানো)
    const navItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/dashboard/create-blog", label: "Create Blog", icon: PlusCircle },
        { href: "/dashboard/manage-projects", label: "Manage Projects", icon: Layers }, // ✅ Project ম্যানেজমেন্ট যোগ করা হলো
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        // আপনার স্ক্রিনশটের ডিজাইনের মতো ফ্লেক্স কন্টেইনার
        <aside className="flex h-screen w-64 flex-col border-r border-gray-700 bg-gray-900 text-white shadow-xl">
            
            {/* Top Logo / App Name Section (Acme Inc. Enterprise এর মতো) */}
            <div className="flex items-center h-16 px-4 border-b border-gray-700">
                {/* ধরে নিলাম আপনার কাছে একটি লোগো আছে */}
                <span className="text-xl font-bold">My Portfolio</span>
            </div>

            {/* Main Navigation Area */}
            <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        // ✅ shadcn/ui স্টাইল এবং hover ইফেক্ট
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors 
                        text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Bottom Action / User Profile Section */}
            {status === "authenticated" && (
                <>
                    <ProfileSection user={user} />
                    <div className="p-3 border-t border-gray-700 bg-gray-900/70">
                        <Button
                            variant="destructive"
                            className="w-full justify-start gap-3 cursor-pointer bg-red-600 hover:bg-red-700"
                            onClick={() => signOut({ callbackUrl: "/login" })} // ✅ Next-Auth Logout
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </>
            )}
        </aside>
    );
}