"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

export default function Sidebar() {

  //  const router = useRouter();

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/v1/auth/logout", {
  //       method: "POST",
  //       credentials: "include", 
  //     });

  //     if (!response.ok) {
  //       console.error("Backend logout failed, proceeding with local cleanup.");
  //     }
  //   } catch (error) {
  //     console.error("Network error during logout, proceeding with local cleanup.", error);
  //   }


  //   localStorage.removeItem("userRole"); 
  //   localStorage.removeItem("accessToken"); 

  //   toast.success("Logged out successfully.");
  //   router.push('/login'); 
  // };


  const session = useSession ()


  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-black text-white">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <Link
          href="/dashboard/create-blog"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <PlusCircle className="h-4 w-4" />
          Create Blog
        </Link>
      </nav>

      {/* Bottom action */}
      <div className="p-4 border-t border-gray-500">
        {
          session.status === "authenticated" &&
          <Button
          variant="destructive"
          className="w-full justify-start gap-2 cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
        }
      </div>
    </aside>
  );
}
