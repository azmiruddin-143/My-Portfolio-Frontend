// components/skeletons/BlogCardSkeleton.tsx

import React from 'react';
// যদি আপনার Heroicon/Lucide icon library থাকে, User, Calendar, ArrowRight এর জন্য
// import { User, Calendar, ArrowRight } from 'lucide-react'; 

const BlogCardSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col h-full rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-pulse">
            
            {/* 1. Image Area Placeholder (Match aspect-video and overlay) */}
            <div className="relative w-full aspect-video bg-gray-300 dark:bg-gray-700 overflow-hidden flex items-end p-4">
                {/* Overlay for Title (as in your original design) */}
                <div className="absolute inset-0 bg-gray-900/50 dark:bg-gray-900/70"></div>
                
                {/* Title Placeholder on Overlay */}
                <div className="z-10 h-8 bg-gray-100/30 rounded-md w-full"></div>
            </div>

            {/* 2. Content Body Placeholder */}
            <div className="p-5 flex flex-col justify-between flex-grow space-y-4">

                {/* Title Placeholder */}
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-full"></div>
                
                {/* Description Placeholder */}
                <div className="space-y-2 flex-grow">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10/12"></div>
                </div>

                {/* Metadata & CTA Placeholder */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                    {/* Author & Date Placeholder */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center mb-3">
                        <div className="flex items-center gap-1">
                            <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div> {/* User Icon Placeholder */}
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24"></div> {/* Author Name Placeholder */}
                        </div>
                        {/* যদি Calendar আইকন এবং ডেট দেখাতে চান: */}
                        {/* <div className="flex items-center gap-1">
                            <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-20"></div>
                        </div> */}
                    </div>
                    
                    {/* Read More Button Placeholder */}
                    <div className="mt-2 flex items-center gap-1">
                        <div className="h-4 bg-blue-600/50 rounded-md w-32"></div> {/* "Continue Reading" text */}
                        <div className="h-4 w-4 bg-blue-600/50 rounded-full"></div> {/* Arrow icon */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCardSkeleton;