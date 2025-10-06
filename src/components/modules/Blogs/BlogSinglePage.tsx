// import { notFound } from 'next/navigation';
// import { headers } from 'next/headers';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';

// // --- Types ---
// interface Blog {
//     id: number | string;
//     title: string;
//     image: string | null;
//     content: string;
//     author: { name: string };
//     views: number;
//     createdAt: string;
// }

// // --- Helper Functions ---
// const formatDateTime = (isoDate: string) => {
//     return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
// };

// // আনুমানিক রিডিং টাইম গণনা
// const formatReadingTime = (content: string) => {
//     const wordCount = content.split(/\s+/).length;
//     const time = Math.ceil(wordCount / 200);
//     return `${time} min read`;
// };


// // ----------------------------------------------------------------
// // Server Component: Data Fetching and Layout
// // ----------------------------------------------------------------
// export default async function BlogSinglePage({ params }: { params: { id: string } }) {
//    const awaitedParams = await params;
//     const blogId = awaitedParams;
//     console.log("blogId",blogId);
    
//     let blog: Blog;

//     // 1. API কল (Single Blog Fetch)
//     try {
//         const res = await fetch(`http://localhost:5000/api/v1/blog/${blogId}`, {
//             cache: 'no-store',
          
//         });

//         if (res.status === 404) {
//              notFound();
//         }
//         if (!res.ok) {
//             throw new Error(`Failed to fetch blog (Status: ${res.status})`);
//         }

//         const result = await res.json();
//         blog = result?.data || notFound();
        
//     } catch (error) {
//         return (
//             <div className="text-center py-40 text-xl text-red-600 dark:text-red-400">
//                 Error: Could not load blog post. Check API connection.
//             </div>
//         );
//     }
    
//     const imageUrl = blog.image || 'https://placehold.co/1200x600/1F2937/FFFFFF/png?text=BLOG+POST';

//     return (
//         <article className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            
//             {/* 1. TOP HEADER / COVER IMAGE */}
//             <header className="relative w-full h-80 md:h-96 overflow-hidden shadow-xl">
//                 <Image
//                     src={imageUrl}
//                     alt={blog.title + " Cover"}
//                     fill={true}
//                     sizes="100vw"
//                     style={{ objectFit: 'cover' }}
//                     className="opacity-90"
//                 />
//                 <div className="absolute inset-0 bg-black/50" /> 
                
//                 {/* Back Button */}
//                 <Link href="/blogs" className="absolute top-6 left-6 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
//                     <ArrowLeft className="h-4 w-4" />
//                     <span className="text-sm font-medium hidden sm:inline">All Blogs</span>
//                 </Link>
//             </header>

//             {/* 2. CONTENT AREA (Centrally Focused) */}
//             <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">
                
//                 {/* Title */}
//                 <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white">
//                     {blog.title}
//                 </h1>

//                 {/* Meta Bar */}
//                 <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">
                    
//                     {/* Author */}
//                     <span className="flex items-center gap-2 font-semibold">
//                         <User className="h-4 w-4 text-indigo-500" /> {blog?.author?.name}
//                     </span>
                    
//                     {/* Date */}
//                     <span className="flex items-center gap-2">
//                         <Calendar className="h-4 w-4 text-green-500" /> {formatDateTime(blog.createdAt)}
//                     </span>
                    
//                     {/* Views */}
//                     <span className="flex items-center gap-2">
//                         <Eye className="h-4 w-4 text-red-500" /> {blog.views} Views
//                     </span>
                    
//                     {/* Reading Time */}
//                     <span className="font-semibold text-gray-700 dark:text-gray-300">
//                         {formatReadingTime(blog.content)}
//                     </span>
//                 </div>

//                 {/* 3. BLOG CONTENT (The core reading experience) */}
//                 <div className="prose prose-lg dark:prose-invert max-w-none">
//                     {/* Note: যেহেতু আপনার ব্যাকএন্ড থেকে এটি একটি সাধারণ স্ট্রিং হিসেবে আসছে, 
//                       তাই এটি একটি <p> ট্যাগের ভেতর থাকবে। 
//                       যদি আপনি Rich Text (HTML/Markdown) ব্যবহার করেন, তবে dangerouslySetInnerHTML ব্যবহার করতে পারেন।
//                     */}
//                     <p className="text-lg leading-relaxed whitespace-pre-wrap">
//                         {blog.content}
//                     </p>
//                 </div>
//             </div>

//             {/* Optional: Related Posts / Footer */}
//             <div className="w-full h-12 bg-gray-100 dark:bg-gray-900"></div>
            
//         </article>
//     );
// }



// export async function generateMetadata({ params }: { params: { id: string } }) {
    
//     const awaitedParams = await params;

//     return {
//         // awaitedParams.id ব্যবহার করা হলো
//         title: `Blog Post ${awaitedParams.id} | Case Study`, 
//     };
// }