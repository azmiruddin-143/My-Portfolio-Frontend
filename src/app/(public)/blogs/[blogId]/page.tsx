/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Eye, ArrowLeft, Clock } from 'lucide-react'; // Clock আইকন যুক্ত করা হলো
import React from 'react';

// --- Types ---
interface Blog {
    id: number | string;
    title: string;
    image: string | null;
    content: string;
    author: { name: string };
    views: number;
    createdAt: string;
}

// --- Helper Functions ---
// Note: Client Component এ Hydration Mismatch এড়াতে এই ফাংশনগুলি এখানে থাকাই নিরাপদ।
const formatDateTime = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};


const formatReadingTime = (content: string) => {
    const time = Math.ceil(content.split(/\s+/).length / 200);
    return `${time} min read`;
};



export async function generateStaticParams() {
    try {

        const res = await fetch('https://developerazmir.vercel.app/api/v1/blog', {
    
        });
        
        if (!res.ok) {
            console.error("Failed to fetch all blog IDs for generateStaticParams:", res.status);
            return []; 
        }

        const result = await res.json();
        
        if (result?.data && Array.isArray(result.data)) {
            return result.data.map((blog: Blog) => ({
                blogId: blog.id.toString(), 
            }));
        }
    } catch (error) {
        console.error("Error in generateStaticParams:", error);
        return [];
    }

    return [];
}










// ----------------------------------------------------------------
// Server Component: Data Fetching and Layout
// ----------------------------------------------------------------
export default async function BlogSinglePage({ params }: { params: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogId: any; blogid: string 
} }) {

    // 🔥 রুট প্যারামিটার থেকে ID নেওয়া এবং await করা হলো
    const awaitedParams = await params;
    const blogId = awaitedParams.blogId;

    let blog: Blog;


    try {
        const res = await fetch(`https://developerazmir.vercel.app/api/v1/blog/${blogId}`, {
          next: {
                revalidate: 3600,
            },

        });

        if (res.status === 404) {
            notFound();
        }
        if (!res.ok) {
            throw new Error(`Failed to fetch blog (Status: ${res.status})`);
        }

        const result = await res.json();
        blog = result?.data || notFound();

    } catch (error) {
        return (
            <div className="text-center py-40 text-xl text-red-600 dark:text-red-400">
                Error: Could not load blog post. Check API connection or Blog ID.
            </div>
        );
    }

    // 🔥 Image URL ফিক্স: null বা undefined হলে ডিফল্ট ইমেজ
    const imageUrl = blog.image || 'https://placehold.co/1200x600/1F2937/FFFFFF/png?text=BLOG+POST';

    return (
        <article className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">

            {/* 1. TOP HEADER / COVER IMAGE */}
            <header className="relative w-full h-80 md:h-96 overflow-hidden shadow-xl">

                <Image
                    src={imageUrl}
                    alt={blog.title + " Cover"}
                    fill={true}
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    className="opacity-90"
                />
                <div className="absolute inset-0 bg-black/50" />

                {/* Back Button and Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-center">

                    {/* Back Link - Positioned Top Left */}
                    <Link href="/blogs" className="absolute top-6 left-6 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 transition-colors z-20">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm font-medium hidden sm:inline">All Blogs</span>
                    </Link>

                    {/* Title and Meta in Center */}
                    <div className="text-center max-w-4xl space-y-4 text-white">

                      

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl">
                            {blog.title.length > 30 ? blog.title.slice(0, 30) + "..." : blog.title}
                        </h1>

                    </div>
                </div>
            </header>

            {/* 2. CONTENT AREA (Centrally Focused) */}
            <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">

                {/* Meta Bar */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">

                    {/* Author */}
                    <span className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                        <User className="h-4 w-4 text-indigo-500" /> By: Azmir Uddin (Owner)
                    </span>

                    {/* Date */}
                    {/* <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-500" /> {formatDateTime(blog.createdAt)}
                    </span> */}

                    {/* Views */}
                    <span className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-red-500" /> {blog.views} Views
                    </span>

                    {/* 🔥🔥 Missing Field: Reading Time 🔥🔥 */}
                    <span className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                        <Clock className="h-4 w-4 text-yellow-500" /> {formatReadingTime(blog.content)}
                    </span>
                </div>

                {/* 3. BLOG CONTENT (The core reading experience) */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                       {blog.content.length > 150 ? blog.content.slice(0, 150) + "..." : blog.content}
                    </p>
                </div>
            </div>

            {/* Optional: Footer or Back Button */}
            <div className="text-center py-12">
                <Link href="/blogs" className="text-lg text-blue-600 hover:text-blue-700 font-semibold underline">
                    ← Back to All Blogs
                </Link>
            </div>
        </article>
    );
}

// Next.js required notFound handler for dynamic route
export async function generateMetadata({ params }: { params: { blogid: string } }) {
    const awaitedParams = await params;
    return {
        title: `Blog Post ${awaitedParams.blogid} | Portfolio`,
    };
}