// /* eslint-disable @typescript-eslint/no-explicit-any */
// import BlogDetailsCard from '@/components/modules/Blogs/BlogDetailsCard';
// const AllBlogsPage = async () => {
//   const res = await fetch("http://localhost:5000/api/v1/blog", {
//     cache: "no-store"
//   })
//   const result = await res.json()
//   const blog = result?.data
//   return (
//     <div className="py-30 px-4 max-w-7xl mx-auto">
//       <h2 className="text-center text-4xl">All Blogs</h2>
//       <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {blog.map((blog: any) => (<BlogDetailsCard key={blog?.id} blog={blog}></BlogDetailsCard>))}
//       </div>
//     </div>
//   );
// };

// export default AllBlogsPage;


/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogGridClient from '@/components/modules/Blogs/BlogGridClient';
import React from 'react'; // ✅ ক্লায়েন্ট কম্পোনেন্ট ইম্পোর্ট

// API থেকে আসা ডেটার জন্য টাইপ
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
        const res = await fetch("http://localhost:5000/api/v1/blog", {
            cache: "no-store"
        });
        
        if (!res.ok) {
            console.error("Failed to fetch blog data:", res.status);
            return <div className="text-center py-32 text-red-500 text-xl">Failed to load blogs. Backend server error ({res.status}).</div>;
        }

        const result = await res.json();
        // আপনার API রেসপন্স স্ট্রাকচার অনুযায়ী ডেটা বের করা
        blogs = result?.data || []; // ধরে নিলাম result.data এর ভেতরে Array আছে

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
    
    // 🔥 Client Component এ ডেটা পাস করা হলো
    return (
        <BlogGridClient blogs={blogs} />
    );
};

export default AllBlogsPage;
