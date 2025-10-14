// app/dashboard/page.tsx
'use client'; 

// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Mail, User, Shield,  } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// --- Configuration ---
// const LOGIN_ROUTE = '/login'; 
// const REQUIRED_ROLE = 'ADMIN'; 
// const LOCAL_STORAGE_KEY = 'adminData'; 

// interface AdminInfo {
//     id: number | string;
//     name: string;
//     email: string;
//     role: string;
// }

export default function AdminProfileDashboard() {
  // Note: এখন ownerData পাওয়ার জন্য আপনাকে সার্ভার-সাইডে কিছু একটা করতে হবে, 
    // অথবা ডেটা লোড হওয়ার পর ownerData টি state/context থেকে লোড করতে হবে।
    // যেহেতু আপনি localStorage ব্যবহার করছেন, আমরা ধরে নিচ্ছি AuthWrapper চেক করে দিয়েছে।
    
    // ... (ownerData লোড করার সহজ লজিক এখানে যুক্ত করা হলো)
    
    // const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ownerData, setOwnerData] = useState<any>(null); // State of the currently logged in user

    useEffect(() => {
        // AuthWrapper check has already passed. Just load the display data.
        const storedData = localStorage.getItem('adminData');
        if (storedData) {
            setOwnerData(JSON.parse(storedData));
        }
    }, []);

    if (!ownerData) return null; // Wait for the local data to be set

    // ... (আপনার Admin Profile Design কোড এখানে) ...



    // --- Logout Logic (Client Side) ---
    // const handleLogout = () => {
    //     localStorage.removeItem(LOCAL_STORAGE_KEY)
    //     router.push(LOGIN_ROUTE);
    // };


    // --- Loading State ---
    // if (isLoading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    //              <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
    //         </div>
    //     );
    // }
    
    // --- Error/Unauthorised State (যদি ডেটা লোড হয় কিন্তু অ্যাক্সেস না থাকে) ---
    if (!ownerData) {
        // এটি useEffect দ্বারা হ্যান্ডেল করা উচিত, তবুও ফলব্যাক
        return <div className='p-8 text-red-500'>Access Denied. Redirecting...</div>;
    }


    // --- Admin Information Panel Design ---
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 flex justify-center items-center">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6 border-t-8 border-indigo-600">

                {/* Header Section */}
                <div className="flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Admin Profile
                    </h1>
                    <Shield className="h-6 w-6 text-indigo-600" />
                </div>

                {/* Profile Avatar/Initial (Static placeholder) */}
                <div className="flex flex-col items-center pt-4">
                    <div className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-lg">
                        {ownerData.name ? ownerData.name.charAt(0) : 'A'}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{ownerData.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{ownerData.role}</p>
                </div>

                {/* Information Grid */}
                <div className="space-y-4 pt-4">
                    <InfoRow icon={Mail} label="Email Address" value={ownerData.email} />
                    <InfoRow icon={User} label="User ID" value={ownerData.id.toString()} />
                    <InfoRow icon={Shield} label="Access Role" value={ownerData.role} isBadge={true} />
                </div>

                {/* Action Button */}
                {/* <div className="pt-6">
                    <Button 
                        onClick={handleLogout} 
                        className="w-full bg-red-600 hover:bg-red-700 text-lg h-12 transition-all duration-300"
                    >
                        <LogOut className="h-5 w-5 mr-2" /> Log Out
                    </Button>
                </div> */}

            </div>
        </div>
    );
}

// --- Reusable Info Row Component ---
interface InfoRowProps {
    icon: React.ElementType;
    label: string;
    value: string;
    isBadge?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value, isBadge = false }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
        <span className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
            <Icon className="h-5 w-5 text-indigo-500 flex-shrink-0" />
            {label}:
        </span>
        {isBadge ? (
            <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 text-sm font-semibold rounded-full">
                {value}
            </span>
        ) : (
            <span className="text-gray-900 dark:text-white font-semibold text-right break-words">
                {value}
            </span>
        )}
    </div>
);