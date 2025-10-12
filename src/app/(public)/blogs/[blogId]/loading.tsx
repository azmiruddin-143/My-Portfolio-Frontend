// app/blogs/[blogId]/loading.tsx

import React from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';

const BlogSingleSkeleton: React.FC = () => {
    return (
        // <article> এর রুট ক্লাসগুলো এখানে রাখা হলো
        <article className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 animate-pulse">

            {/* 1. TOP HEADER / COVER IMAGE SKELETON */}
            <header className="relative w-full h-80 md:h-96 overflow-hidden shadow-xl bg-gray-300 dark:bg-gray-700">
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay Placeholder */}

                {/* Back Button Placeholder */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-center">
                    <div className="absolute top-6 left-6 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 z-20">
                         <ArrowLeft className="h-4 w-4" />
                         <div className="h-4 w-20 bg-gray-500 rounded-md hidden sm:inline"></div>
                    </div>

                    {/* Title Placeholder in Center */}
                    <div className="text-center max-w-4xl space-y-4 text-white">
                        <div className="h-10 md:h-14 bg-gray-100/30 rounded-lg w-96 max-w-full mx-auto drop-shadow-xl"></div>
                        <div className="h-8 bg-gray-100/30 rounded-lg w-64 max-w-full mx-auto"></div>
                    </div>
                </div>
            </header>

            {/* 2. CONTENT AREA SKELETON */}
            <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">

                {/* Meta Bar Placeholder (Author, Date, Views, Reading Time) */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-4 w-28 bg-yellow-200 dark:bg-yellow-800 rounded-md"></div>
                </div>

                {/* 3. BLOG CONTENT (Body Text) Placeholder */}
                <div className="space-y-4">
                    {/* Multiple lines of text to represent the content body */}
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-10/12"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-7/12"></div>
                </div>
            </div>

            {/* Optional: Footer or Back Button Placeholder */}
            <div className="text-center py-12">
                <div className="h-6 w-40 mx-auto bg-blue-600/50 rounded-md"></div>
            </div>
        </article>
    );
}

export default BlogSingleSkeleton;