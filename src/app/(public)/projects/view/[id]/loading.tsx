// app/projects/[id]/loading.tsx

import React from 'react';
// import { ArrowLeft, Zap, Loader2 } from 'lucide-react';

const ProjectDetailsSkeleton: React.FC = () => {
    return (
        // রুট কন্টেইনার এবং অ্যানিমেশন
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
            
            {/* --- SECTION 1 SKELETON: HERO / IMAGE OVERVIEW --- */}
            <header className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden shadow-2xl bg-gray-300 dark:bg-gray-700">
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6">
                    <div className="text-center max-w-4xl space-y-4 text-white">
                        
                        {/* Title Placeholder */}
                        <div className="h-10 md:h-14 bg-gray-100/30 rounded-lg w-full max-w-2xl mx-auto drop-shadow-xl"></div>
                        <div className="h-8 bg-gray-100/30 rounded-lg w-3/4 max-w-xl mx-auto"></div>

                        {/* Meta Data Placeholder */}
                        <div className="flex justify-center gap-6 pt-2">
                            <div className="h-5 bg-gray-100/30 rounded-md w-32"></div>
                            <div className="h-5 bg-gray-100/30 rounded-md w-40"></div>
                        </div>
                        
                        {/* CTA Buttons Placeholder */}
                        <div className="flex justify-center gap-4 pt-6">
                            <div className="h-12 w-48 bg-green-500/70 rounded-lg shadow-lg"></div>
                            <div className="h-12 w-48 bg-gray-400/70 dark:bg-gray-700/70 rounded-lg border border-white/50"></div>
                        </div>
                    </div>
                </div>
            </header>


            {/* --- SECTION 2 SKELETON: DETAILED BREAKDOWN --- */}
            <div className="max-w-4xl mx-auto py-16 px-6 md:px-8">
                
                {/* Project Description Header Placeholder */}
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-64 mb-6 border-b pb-2"></div>
                
                {/* Project Description Text Placeholder (Multiple Lines) */}
                <div className="space-y-3 mb-10">
                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-11/12"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-9/12"></div>
                </div>

                {/* Key Features Header Placeholder */}
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-80 mb-6 border-b pb-2"></div>
                
                {/* Key Features Grid Placeholder */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Feature Item 1 */}
                    <div className="flex items-start gap-3 bg-indigo-50/70 dark:bg-indigo-900/50 p-4 rounded-lg h-16">
                        <div className="h-5 w-5 bg-indigo-300 dark:bg-indigo-600 mt-1 rounded-full flex-shrink-0"></div>
                        <div className="h-4 bg-indigo-300/50 dark:bg-indigo-600/50 rounded w-full mt-1"></div>
                    </div>
                    {/* Feature Item 2 */}
                    <div className="flex items-start gap-3 bg-indigo-50/70 dark:bg-indigo-900/50 p-4 rounded-lg h-16">
                        <div className="h-5 w-5 bg-indigo-300 dark:bg-indigo-600 mt-1 rounded-full flex-shrink-0"></div>
                        <div className="h-4 bg-indigo-300/50 dark:bg-indigo-600/50 rounded w-full mt-1"></div>
                    </div>
                    {/* Feature Item 3 (Mobile hidden or continues) */}
                </div>

                {/* Secondary Images/Gallery Header Placeholder */}
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-48 mt-12 mb-6 border-b pb-2"></div>
                
                {/* Secondary Images Grid Placeholder (2 items) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full aspect-video rounded-xl bg-gray-300 dark:bg-gray-700 shadow-lg"></div>
                    <div className="w-full aspect-video rounded-xl bg-gray-300 dark:bg-gray-700 shadow-lg"></div>
                </div>
            </div>
            
            {/* Footer Back Button Placeholder */}
            <div className="text-center py-12">
                <div className="h-6 w-56 mx-auto bg-blue-600/50 rounded-md"></div>
            </div>
        </div>
    );
}

export default ProjectDetailsSkeleton;