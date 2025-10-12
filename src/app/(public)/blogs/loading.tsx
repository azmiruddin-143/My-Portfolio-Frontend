
// app/blogs/loading.tsx

import BlogCardSkeleton from '@/components/skeletons/BlogCardSkeleton';
import React from 'react';

const Loading: React.FC = () => {

    const numberOfSkeletons = 3; 
    const skeletonCards = Array(numberOfSkeletons).fill(null); 
    
    return (
        <div className='max-w-7xl text-5xl font-bold text-center md:text-6xl py-32 mx-auto px-6 md:px-8  bg-gray-50 dark:bg-gray-900 min-h-screen'>
          
             <span className="text-red-600  dark:text-red-400">All</span> Blog Posts
       
            <div className="grid grid-cols-1 my-8 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skeletonCards.map((_, index) => (
               
                    <BlogCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default Loading;