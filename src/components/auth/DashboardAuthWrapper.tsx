/* eslint-disable @typescript-eslint/no-unused-vars */
// components/auth/DashboardAuthWrapper.tsx
'use client'; 

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

// --- Configuration ---
const LOGIN_ROUTE = '/login'; 
const REQUIRED_ROLE = 'ADMIN'; 
const LOCAL_STORAGE_KEY = 'adminData'; 

interface AdminInfo { role: string; }

// ড্যাশবোর্ডের সব রুটে এই কম্পোনেন্টটি থাকবে, তাই এটি গ্লোবালি কাজ করবে।
export default function DashboardAuthWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    const protectedRoutes = [
        '/dashboard', 
        '/dashboard/create-blog', 
        '/dashboard/manage-projects'
    ];
    
    const isDashboardRoute = protectedRoutes.some(route => pathname.startsWith(route));


    useEffect(() => {
        if (!isDashboardRoute) {
            setIsChecking(false);
            return;
        }

        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        
        if (storedData) {
            try {
                const data: AdminInfo = JSON.parse(storedData);
                
                if (data.role === REQUIRED_ROLE) {
                    setIsAuthenticated(true);
                } else {
    
                    router.replace(LOGIN_ROUTE + '?error=unauthorized');
                }
            } catch (e) {
                // JSON পার্স error
                router.replace(LOGIN_ROUTE);
            }
        } else {
            router.replace(LOGIN_ROUTE);
        }
        
        setIsChecking(false);
    }, [router, pathname, isDashboardRoute]);


    if (isChecking || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                 <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
            </div>
        );
    }
    
    return <>{children}</>;
}