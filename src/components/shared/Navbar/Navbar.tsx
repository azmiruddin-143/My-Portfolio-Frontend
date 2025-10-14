/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LOGIN_ROUTE = '/login'; 
const Navbar = () => {

const router = useRouter();
  let role: string | undefined;

  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("adminData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        role = parsedData?.role;
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
      }
    }
  }


  
    const handleLogout = async () => {
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
        } 
    };


  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-full bg-background border dark:border-slate-700/70 z-30">
      <div className="flex h-full items-center justify-between px-6 md:px-8">

        <Link href="/" className="flex-shrink-0 ">
          {/* <Logo /> */}
          <h1 className="text-2xl font-bold">Azmir Uddin</h1>
        </Link>


        <NavMenu role={role} className="hidden md:block" />

        {/* Actions and Mobile Menu */}
        <div className="flex items-center gap-4 md:gap-6">

          {role === "ADMIN" ?
            <Button  onClick={handleLogout} className="rounded-full cursor-pointer px-5 py-2 text-sm md:text-base">
                Logout
            </Button>
            :

            <Button className="rounded-full px-5 py-2 text-sm md:text-base">
              <Link href="/login" className="block cursor-pointer w-full text-center">
                Login
              </Link>
            </Button>

          }





          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
