

'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { motion } from 'framer-motion';

interface Blog {
  id: number | string;
  title: string;
  image: string | null;
  content: string;
  author: { name: string };
  views: number;
  createdAt: string;
}


export default function BlogCard({ blog }: { blog: Blog }) {
  const blogUrl = `/blogs/${blog.id}`;
  const description = blog.content.length > 120
    ? blog.content.substring(0, 120) + '...'
    : blog.content;
    
  // 🔥 ইমেজ URL ফিক্স
  const imageUrl = blog?.image as string
  console.log("imm",imageUrl);
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
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{objectFit:'cover' }}
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
                {/* <span className="text-xs font-semibold px-3 py-1 bg-red-600/80 text-white rounded-full self-start backdrop-blur-sm">
                    {formatReadingTime(blog.content)}
                </span> */}

                {/* Bottom: Title */}
                
            </div>
        </Link>

        {/* 2. কন্টেন্ট বডি (Details) */}
        <div className="p-5 flex flex-col justify-between flex-grow">

            <h3 className="text-2xl font-extrabold text-black py-2 drop-shadow-lg leading-snug line-clamp-2">
                    {blog.title}
                </h3>
            
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
                    {/* <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-red-500" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span> */}
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