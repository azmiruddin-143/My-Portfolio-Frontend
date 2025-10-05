/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import React, { useState } from 'react'; // ✅ useState যোগ করা হলো
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Home, PlusCircle, Settings, Menu, Layers, PanelLeft } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
// ✅ shadcn/ui Sheet কম্পোনেন্ট আমদানি
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard/create-blog", label: "Create Blog", icon: PlusCircle },
  { href: "/dashboard/manage-blogs", label: "Manage Blog", icon: Layers },
  { href: "/dashboard/manage-projects", label: "Manage Projects", icon: Layers },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];


const SidebarContent = ({ user, status }: { user: any, status: string }) => (
  <>
    {/* Top Logo / App Name Section */}
    <div className="flex items-center h-16 px-4 border-b border-gray-700">
      <span className="text-xl font-bold">My Portfolio</span>
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

    {/* Bottom Action / User Profile Section */}
    {status === "authenticated" && (
      <>
        {/* <ProfileSection user={user} /> */}
        <div className="p-3 border-t border-gray-700 bg-gray-900/70">
          <Button
            variant="destructive"
            className="w-full justify-start gap-3 cursor-pointer bg-red-600 hover:bg-red-700"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </>
    )}
  </>
);



export default function Sidebar() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <>
      {/* 1. Desktop Sidebar (Large screens only) */}
      <aside className="hidden md:flex h-screen w-64 flex-col border-r border-gray-700 bg-gray-900 shadow-xl">
        <SidebarContent user={user} status={status} />
      </aside>

      {/* 2. Mobile Drawer/Overlay (Small screens only) */}
      <div className="md:hidden  ">
        <Sheet>
      
            <SheetTrigger className='left-2.5 relative top-5' asChild>
           
               <PanelLeft />
          
            </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0 border-r-0 bg-gray-900">
            <SidebarContent user={user} status={status} />
          </SheetContent>
        </Sheet>

      
      </div>
    </>
  );
}