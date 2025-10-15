
import BlogGridClient from '@/components/modules/Blogs/BlogGridClient';
import React from 'react';

interface Blog {
    id: number | string;
    title: string;
    image: string | null;
    content: string;
    author: { name: string };
    views: number;
    createdAt: string;
}

const AllBlogsPage = async () => {
    
    let blogs: Blog[] = [];

    try {
        const res = await fetch("https://developerazmir.vercel.app/api/v1/blog", {
             next: { 
            revalidate: 3
        }
        });
        
        if (!res.ok) {
            console.error("Failed to fetch blog data:", res.status);
            return <div className="text-center py-32 text-red-500 text-xl">Failed to load blogs. Backend server error ({res.status}).</div>;
        }

        const result = await res.json();
        
        blogs = result?.data || []; 

    } catch (error) {
        console.error("Network or Fetch Error:", error);
        return <div className="text-center py-32 text-red-500 text-xl">Network error: Could not connect to the blog API.</div>;
    }
    
    if (blogs.length === 0) {
        return (
            <div className="text-center py-32">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">No Blogs Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-3">Time to write your first post!</p>
            </div>
        );
    }
    

    return (
        <BlogGridClient blogs={blogs} />
    );
};

export default AllBlogsPage;
