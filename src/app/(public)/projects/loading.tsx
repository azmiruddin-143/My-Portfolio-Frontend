// components/skeletons/BlogCardSkeleton.tsx

import React from 'react';

const BlogCardSkeleton: React.FC = () => {
    return (


        <div className='max-w-7xl mx-auto px-6 md:px-8 py-32 md:py-16 bg-gray-50 min-h-screen'>
            <h2 className="text-5xl md:text-6xl py-16 font-extrabold text-center mb-10 text-gray-900 dark:text-white">
                All Featured <span className="text-blue-600 dark:text-blue-400">Projects</span>
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

                <div className=" relative flex flex-col h-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ">

                    {/* 1. Image Placeholder Area (Top Grey Box) */}
                    <div className="w-full h-48 bg-gray-300  flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>

                    {/* Title Overlay Placeholder (White text on grey background) */}
                    <div className="absolute top-0 left-0 w-full h-48 p-4 flex items-end">
                        <div className="h-8 bg-gray-500 dark:bg-gray-600 rounded-md w-11/12"></div>
                    </div>

                    <div className="p-4 space-y-4">

                        {/* 2. Content Snippet Placeholder */}
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-11/12"></div>

                        {/* 3. Tags Placeholder (Similar to your tag design) */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <div className="h-7 w-24 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
                            <div className="h-7 w-32 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
                        </div>

                        {/* 4. Author & Views Placeholder */}
                        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-28"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-16"></div>
                            </div>
                        </div>

                        {/* 5. Buttons Placeholder */}
                        <div className="flex gap-4 pt-2">
                            <div className="h-10 bg-blue-500 rounded-lg w-full"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
                        </div>
                    </div>
                </div>

                <div className=" relative flex flex-col h-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ">

                    {/* 1. Image Placeholder Area (Top Grey Box) */}
                    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>

                    {/* Title Overlay Placeholder (White text on grey background) */}
                    <div className="absolute top-0 left-0 w-full h-48 p-4 flex items-end">
                        <div className="h-8 bg-gray-500 dark:bg-gray-600 rounded-md w-11/12"></div>
                    </div>

                    <div className="p-4 space-y-4">

                        {/* 2. Content Snippet Placeholder */}
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-11/12"></div>

                        {/* 3. Tags Placeholder (Similar to your tag design) */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <div className="h-7 w-24 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
                            <div className="h-7 w-32 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
                        </div>

                        {/* 4. Author & Views Placeholder */}
                        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-28"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-16"></div>
                            </div>
                        </div>

                        {/* 5. Buttons Placeholder */}
                        <div className="flex gap-4 pt-2">
                            <div className="h-10 bg-blue-500 rounded-lg w-full"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
                        </div>
                    </div>
                </div>
                <div className=" relative flex flex-col h-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ">

                    {/* 1. Image Placeholder Area (Top Grey Box) */}
                    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>

                    {/* Title Overlay Placeholder (White text on grey background) */}
                    <div className="absolute top-0 left-0 w-full h-48 p-4 flex items-end">
                        <div className="h-8 bg-gray-500 dark:bg-gray-600 rounded-md w-11/12"></div>
                    </div>

                    <div className="p-4 space-y-4">

                        {/* 2. Content Snippet Placeholder */}
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-11/12"></div>

                        {/* 3. Tags Placeholder (Similar to your tag design) */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <div className="h-7 w-24 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
                            <div className="h-7 w-32 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
                        </div>

                        {/* 4. Author & Views Placeholder */}
                        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-28"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-16"></div>
                            </div>
                        </div>

                        {/* 5. Buttons Placeholder */}
                        <div className="flex gap-4 pt-2">
                            <div className="h-10 bg-blue-500 rounded-lg w-full"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCardSkeleton;