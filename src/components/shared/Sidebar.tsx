/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"; 

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Home, PlusCircle, Settings, Layers, Loader2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from 'next/navigation'; // useRouter যোগ করা হলো
import toast from 'react-hot-toast'; // Toast নোটিফিকেশনের জন্য

const navItems = [
    { href: "/", label: "Home (Public)", icon: Home },
    // { href: "/dashboard/create-blog", label: "Create Blog", icon: PlusCircle },
    { href: "/dashboard/manage-blogs", label: "Manage Blog", icon: Layers },
    { href: "/dashboard/manage-projects", label: "Manage Projects", icon: Layers }, // Updated route to /projects
    // { href: "/dashboard/settings", label: "Settings", icon: Settings },
];
const LOGIN_ROUTE = '/login'; 
// -------------------------------------------------------------------
// Logout Handler Function
// -------------------------------------------------------------------

interface SidebarContentProps {
    handleLogout: () => void;
    isLoggingOut: boolean;
}

const SidebarContent = ({ handleLogout, isLoggingOut }: SidebarContentProps) => (
    
    <>
        {/* Top Logo / App Name Section */}
        <div className="flex items-center h-16 px-4 border-b border-gray-700 bg-gray-900 text-white">
            <span className="text-xl font-bold">Azmir Uddin (Owner)</span>
        </div>

        {/* Main Navigation Area */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Link>
            ))}
        </nav>

        {/* Bottom Action / Logout Section */}
        <div className="p-3 border-t border-gray-700 bg-gray-900/70">
            <Button
                variant="destructive"
                className="w-full justify-start gap-3 cursor-pointer bg-red-600 hover:bg-red-700"
                onClick={handleLogout}
                disabled={isLoggingOut}
            >
                {isLoggingOut ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Logging Out...
                    </>
                ) : (
                    <>
                        <LogOut className="h-4 w-4" />
                        Logout
                    </>
                )}
            </Button>
        </div>
    </>
);


export default function Sidebar() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        const API_URL = "https://developerazmir.vercel.app/api/v1/auth/logout"; 

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                 cache: 'no-store',
                credentials: "include"
               
            });
 

            if (response.ok || response.status === 204) {
                localStorage.removeItem("adminData");
                toast.success("Logged out successfully!");
                router.push(LOGIN_ROUTE);
            } else {
                const data = await response.json();
                toast.error(data.message || "Logout failed on server side.");
            }

        } catch (error) {
            toast.error("Network error during logout.");
        } finally {
            setIsLoggingOut(false);
         
        }
    };


    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <>

            <aside className="hidden md:flex w-64 flex-col border-r border-gray-700 bg-gray-900 shadow-xl">
                <SidebarContent handleLogout={handleLogout} isLoggingOut={isLoggingOut} />
            </aside>

            {/* 2. Mobile Drawer/Overlay (Small screens only) */}
            <div className="md:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger className='left-0  absolute top-3' asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className='h-6 w-6' />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-64 p-0 border-r-0 bg-gray-900 flex flex-col">
                        <SidebarContent handleLogout={() => { 
                            // Close sheet before logging out to prevent UI freeze
                            setIsSheetOpen(false); 
                            handleLogout(); 
                        }} isLoggingOut={isLoggingOut} />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
