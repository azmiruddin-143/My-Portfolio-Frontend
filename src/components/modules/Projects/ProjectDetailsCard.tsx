// src/components/modules/Projects/ProjectDetailsCard.tsx

import React from 'react';
import Link from 'next/link';
import { Code, Link as ExternalLink, GitBranch, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// আপনার Project মডেল অনুযায়ী একটি টাইপ তৈরি করা হলো
interface Project {
    id: number;
    title: string;
    description: string;
    projectUrl?: string; // GitHub Link
    liveUrl?: string;    // Live Site Link
    features: string[]; // String[]
    thumbnail: string[]; // String[]
    user: { name: string }; // User রিলেশনশিপ থেকে লেখকের নাম
    clickCount: number
}

export default function ProjectDetailsCard({ project }: { project: Project }) {
    // প্রথম থাম্বনেইল বা একটি ডিফল্ট ইমেজ ব্যবহার করা হলো
    const imageUrl = project.thumbnail?.[0] || 'https://www.pcworld.com/wp-content/uploads/2024/12/bf-laptop-deals-pcw-15.jpg?quality=50&strip=all';
    const authorName = project.user?.name || 'Admin';



    return (
        // মূল কার্ড কন্টেইনার: Shadow এবং hover ইফেক্ট সহ সম্পূর্ণ h-full
        <div className="flex flex-col h-full rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200">

            {/* ইমেজ বা থাম্বনেইল এরিয়া */}
            <div className="relative w-full aspect-video bg-gray-900/90 overflow-hidden">
                {/* যদি একাধিক thumbnail থাকে, তবে প্রথমটি দেখানো হলো */}
                <Image
                    src={imageUrl}
                    alt={"No Image"}
                    width={400}
                    height={400}
                    className="object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-3xl font-extrabold text-white text-center drop-shadow-md">
                        {project.title}
                    </h3>
                </div>
            </div>

            {/* কন্টেন্ট বডি */}
            <div className="p-5 flex flex-col flex-grow">

                {/* বর্ণনা (Description) */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-3 flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {

                        Array.isArray(project?.features) && project.features.length > 0 ? (

                            project.features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="flex items-center text-xs font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                                >
                                    {/* ধরে নিলাম Code কম্পোনেন্টটি lucide-react থেকে import করা হয়েছে */}
                                    <Code className="h-3 w-3 mr-1" />
                                    {feature}
                                </span>
                            ))
                        ) : (
                            // যদি features না থাকে
                            <span className="text-sm text-gray-400">No features listed.</span>
                        )
                    }


                    {Array.isArray(project.features) && project.features.length > 3 && (
                        <span className="text-xs text-gray-500">+{project.features.length - 3} more</span>
                    )}
                </div>



 

                {/* মেটাডেটা (Author) */}
                <div className="text-xs text-gray-500 border-t pt-3 flex justify-between items-center">
                    <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Authored by: <span className="font-semibold text-gray-700">{authorName}</span>
                    </span>
                    {/* Click Count (যদি দেখাতে চান) */}
                    <span className="flex items-center gap-1">
                        <ArrowRight className="h-3 w-3" />
                        Views: {project.clickCount}
                    </span>

                </div>

                {/* অ্যাকশন বাটনস */}
                <div className="mt-4 flex gap-3">
                    {/* Live Site Link */}
                    {project.liveUrl && (
                        <Link href={project.liveUrl} target="_blank" className="flex-1">
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                <ExternalLink className="h-4 w-4 mr-2" /> Live Site
                            </Button>
                        </Link>
                    )}

                    {/* Project Link (Source Code) */}
                    {project.projectUrl && (
                        <Link href={project.projectUrl} target="_blank" className="flex-1">
                            <Button variant="outline" className="w-full text-gray-800 border-gray-300 hover:bg-gray-100">
                                <GitBranch className="h-4 w-4 mr-2" /> Source Code
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}