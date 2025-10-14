

'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Link as ExternalLink, User, Eye, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
// import myphoto from "../.././../assets/azmir-uddin.png";


interface Project {
    id: number;
    title: string;
    description: string;
    projectUrl?: string;
    liveUrl?: string;
    features: string[];
    thumbnail: string[];
    user: { name: string };
    clickCount: number
}

export default function ProjectDetailsCard({ project }: { project: Project }) {
    // 🔥 Image URL Fix: non-empty URL খুঁজে বের করুন (truly robust)
    // const primaryThumbnail = project.thumbnail?.find(url => url && url.length > 0);
    // const imageUrl = primaryThumbnail || 'https://placehold.co/800x450/1F2937/FFFFFF/png?text=PROJECT+IMAGE'; // ফিক্সড ডিফল্ট URL
    // const authorName = project.user?.name || 'Admin';
    const projectDetailUrl = `/projects/view/${project.id}`;

    const visibleFeatures = project.features.slice(0, 3);

    // Framer Motion Variants for Hover Effect
    const cardVariants = {
        rest: { scale: 1, transition: { duration: 0.3 } },
        hover: { scale: 1.02, transition: { duration: 0.3 } } 
    };

    const overlayVariants = {
        rest: { opacity: 0.2 }, 
        hover: { opacity: 0.7 } 
    };


    const projectImage = project?.thumbnail[0]


    return (
        <motion.div
            className="flex flex-col h-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            whileTap="rest"
        >
            {/* ইমেজ এরিয়া */}
            <Link href={projectDetailUrl} className="relative w-full aspect-video bg-gray-400 overflow-hidden group block">
                {/* Image */}
                <Image
                    src={projectImage}
                    alt={"No Image Upload"}
                    fill={true}
                    loading="lazy"
                    className="opacity-100 z-0"
                    style={{ objectFit: 'fill' }}
                    sizes="(max-width: 768px) 100vw, 33vw" 
                />

                {/* Overlay (For Text Readability) */}
                <motion.div
                    className="absolute inset-0 bg-black"
                    variants={overlayVariants}
                    initial="rest"
                    animate="rest"
                />

                {/* Title Overlay and Meta */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
                    <h3 className="text-xl md:text-2xl font-extrabold text-white text-left drop-shadow-lg leading-snug line-clamp-2">
                        {project.title}
                    </h3>
                </div>
            </Link>

            {/* কন্টেন্ট বডি */}
            <div className="p-5 flex flex-col flex-grow">

                {/* বর্ণনা (Description) */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                    {project.description}
                </p>

                {/* টেকনোলজি ব্যাজ (Features) */}
                <div className="flex flex-wrap gap-2 mb-4 mt-auto border-t border-gray-100 dark:border-gray-700 pt-3">
                    {visibleFeatures.map((feature, index) => (
                        <span
                            key={index}
                            className="flex items-center text-xs font-medium bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full dark:bg-indigo-900/50 dark:text-indigo-300"
                        >
                            <Code className="h-3 w-3 mr-1" />
                            {feature}
                        </span>
                    ))}
                    {project.features.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-3 py-1">+{project.features.length - 3} more</span>
                    )}
                </div>


                {/* মেটাডেটা ও ভিউজ */}
                <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center pb-3">
                    <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        By: <span className="font-semibold text-gray-700 dark:text-gray-300">Azmir Uddin (Owner)</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Views: {project.clickCount}
                    </span>
                </div>

                {/* অ্যাকশন বাটনস */}
                <div className="mt-auto pt-4 border-t  border-gray-100 dark:border-gray-700 flex gap-3">

                    {/* View Details Button */}
                    <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                        <Link href={projectDetailUrl}>
                            <ArrowRight className="h-4 w-4 mr-2" /> View Details
                        </Link>
                    </Button>

                    
                    {project.projectUrl && (
                        <Button asChild variant="outline" className=" text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Link href={project?.projectUrl} target="_blank">
                                 <Github className="h-4 w-4" /> 
                            </Link>
                        </Button>
                    )}
                    {project.liveUrl && (
                        <Button asChild variant="outline" className=" text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Link href={project.liveUrl} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}