// /* eslint-disable @typescript-eslint/no-explicit-any */
// import Link from "next/link";
// import Image from "next/image";

// export default function BlogCard({ post }: { post: any }) {
//   return (
//     <Link
//       href={`/blogs/${post.id}`}
//       className="block group transform hover:-translate-y-1 transition-transform duration-300"
//     >
//       <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
//         {post.thumbnail ? (
//           <div className="relative h-56 w-full overflow-hidden">
//             <Image
//               src={post.thumbnail}
//               alt={post.title}
//               fill
//               className="object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         ) : (
//           <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
//             No Image
//           </div>
//         )}

//         <div className="p-6">
//           <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
//             {post.title}
//           </h3>

//           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
//             {post.content}
//           </p>

//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2">
//               <Image
//                 src={
//                   post.author.picture ||
//                   "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
//                 }
//                 alt={post.author.name}
//                 width={36}
//                 height={36}
//                 className="rounded-full border-2 border-gray-200 dark:border-gray-700"
//               />
//               <span className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
//                 {post.author.name}
//                 {post.author.isVerified && (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 text-blue-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={3}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 )}
//               </span>
//             </div>
//             <span className="text-gray-500 dark:text-gray-400 text-sm">
//               {post.views} views
//             </span>
//           </div>

//           <div className="text-right">
//             <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">
//               Read More →
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }


'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User, Calendar } from "lucide-react";
import { motion } from 'framer-motion';

// আপনার Blog ডেটা টাইপ
interface Blog {
  id: number | string;
  title: string;
  image: string | null; // Nullable হিসেবে ধরলাম
  content: string;
  author: { name: string };
  views: number;
  createdAt: string;
}

const formatReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const time = Math.ceil(wordCount / 200);
    return `${time} min read`;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const blogUrl = `/blogs/${blog.id}`;
  const description = blog.content.length > 120
    ? blog.content.substring(0, 120) + '...'
    : blog.content;
    
  // 🔥 ইমেজ URL ফিক্স
  const imageUrl = blog.image || 'https://placehold.co/800x450/374151/FFFFFF/png?text=BLOG+POST';

  // Framer Motion Variants for Hover Effect
  const cardVariants = {
    rest: { scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, rotate: 0.2, transition: { duration: 0.3 } }
  };
  
  const overlayVariants = {
      rest: { opacity: 0.3 },
      hover: { opacity: 0.7 }
  };

  return (
    <motion.div
        className="flex flex-col h-full rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white"
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        whileTap="rest"
    >
        {/* 1. ইমেজ এরিয়া (Visual Focus) */}
        <Link href={blogUrl} className="relative w-full aspect-video bg-gray-900 overflow-hidden group block">
            
            {/* Image */}
            <Image
                src={imageUrl}
                alt={blog.title}
                fill={true} 
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-110" 
            />
            
            {/* Overlay (For Text Readability) */}
            <motion.div 
                className="absolute inset-0 bg-black" 
                variants={overlayVariants} 
                initial="rest" 
                animate="rest"
            />

            {/* Title & Reading Time Overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                
                {/* Top: Reading Time Badge */}
                <span className="text-xs font-semibold px-3 py-1 bg-red-600/80 text-white rounded-full self-start backdrop-blur-sm">
                    {formatReadingTime(blog.content)}
                </span>

                {/* Bottom: Title */}
                <h3 className="text-2xl font-extrabold text-white drop-shadow-lg leading-snug line-clamp-2">
                    {blog.title}
                </h3>
            </div>
        </Link>

        {/* 2. কন্টেন্ট বডি (Details) */}
        <div className="p-5 flex flex-col justify-between flex-grow">
            
            <div className="space-y-3 flex-grow">
                {/* ডেসক্রিপশন */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {description}
                </p>
            </div>

            {/* মেটাডেটা ও CTA */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                {/* Author, Date, Views */}
                <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center mb-3">
                    <span className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300">
                        <User className="h-3 w-3 text-indigo-500" />
                        By: {blog.author?.name}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-red-500" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                </div>
                
                {/* Read More বাটন */}
                <Link href={blogUrl} className="mt-2 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors group">
                    Continue Reading
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    </motion.div>
  );
}