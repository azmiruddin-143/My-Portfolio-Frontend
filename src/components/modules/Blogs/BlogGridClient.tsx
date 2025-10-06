'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard'; // আপনার গর্জিয়াস কার্ড

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

// Framer Motion Variants for Grid Entry
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, 
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


export default function BlogGridClient({ blogs }: { blogs: Blog[] }) {
    
    // (এখানে আপনি চাইলে client-side state এবং সার্চ ফিল্টারিং লজিক যোগ করতে পারেন)

    return (
        <section className="py-8 bg-gray-50 ">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                
                {/* Title Section */}
                <motion.h1 
                    className="text-5xl md:text-6xl font-extrabold text-center mb-10 text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-red-600 dark:text-red-400">Latest</span> Blog Posts
                </motion.h1>
                
                {/* Grid Container with Animation */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {blogs.map((blogItem) => (
                        <motion.div 
                            key={blogItem.id} 
                            variants={itemVariants}
                            className="h-full"
                        >
                            <BlogCard blog={blogItem} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}