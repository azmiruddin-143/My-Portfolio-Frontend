



import React from 'react';
import { notFound } from 'next/navigation';
import { Link as ExternalLink, Code, User, Calendar, Zap, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

// API থেকে আসা ডেটার জন্য টাইপ
interface Project {
    id: number;
    title: string;
    description: string;
    projectUrl?: string; // GitHub Link
    liveUrl?: string; 
    features: string[]; 
    thumbnail: string[]; // একাধিক Image URLs
    user: { name: string }; 
    clickCount: number;
    createdAt: string; // ডেট ডিসপ্লে করার জন্য
}

// --- Helper Functions ---
const formatDateTime = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};


export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
     const awaitedParams = await params;
    const projectId = awaitedParams.id;

    console.log("projectId",projectId);
    

    
    let project: Project;

    try {
        const res = await fetch(`http://localhost:5000/api/v1/project/${projectId}`,
            { cache: 'no-store' }
           
        );

        if (res.status === 404) {
             notFound();
        }
        if (!res.ok) {
            throw new Error(`Failed to fetch project (Status: ${res.status})`);
        }

        const result = await res.json();

        console.log("result",result);
        project = result?.data || notFound(); // যদি ডেটা না থাকে
        
    } catch (error) {
        return (
            <div className="text-center py-40 text-xl text-red-600">
                Error: Could not load project details. Check API status.
            </div>
        );
    }
    
    const primaryImage = project.thumbnail?.[0] || 'https://placehold.co/1200x600/1F2937/FFFFFF/png?text=Case+Study';
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            
            {/* --- SECTION 1: UNIQUE HERO / IMAGE OVERVIEW --- */}
            <header className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden shadow-2xl">
                
                {/* Background Image (Large Banner) */}
                <Image
                    src={primaryImage}
                    alt={project.title + " Cover"}
                    fill={true}
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    className="opacity-80"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6">
                    <div className="text-center max-w-4xl space-y-4 text-white">
                        
                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl">
                            {project.title}
                        </h1>

                        {/* Meta Data */}
                        <div className="flex justify-center gap-6 text-sm md:text-base text-gray-300">
                            <span className="flex items-center gap-2">
                                <User className="h-4 w-4" /> By: {project?.user?.name}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Date: {formatDateTime(project.createdAt)}
                            </span>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="flex justify-center gap-4 pt-6">
                            {project.liveUrl && (
                                <Button asChild className="bg-green-500 hover:bg-green-600 shadow-lg text-lg h-12">
                                    <Link href={project.liveUrl} target="_blank">
                                        <ExternalLink className="h-5 w-5 mr-2" /> View Live Site
                                    </Link>
                                </Button>
                            )}
                            {project.projectUrl && (
                                <Button asChild variant="secondary" className="text-lg h-12 border border-white/50 dark:bg-gray-700 dark:hover:bg-gray-600">
                                    <Link href={project.projectUrl} target="_blank">
                                        <GitBranch className="h-5 w-5 mr-2" /> Source Code
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>


            {/* --- SECTION 2: DETAILED BREAKDOWN & FEATURES --- */}
            <div className="max-w-4xl mx-auto py-16 px-6 md:px-8">
                
                {/* Project Description (The Core Story) */}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2 border-indigo-200 dark:border-indigo-800">
                    Project Overview
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
                    {project.description}
                </p>

                {/* Key Features / Tech Stack Used */}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2 border-indigo-200 dark:border-indigo-800">
                    Key Features & Tech Stack
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-900/50 p-4 rounded-lg shadow-sm">
                            <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-300 mt-1 flex-shrink-0" />
                            <p className="font-medium text-gray-800 dark:text-gray-100">{feature}</p>
                        </div>
                    ))}
                </div>

                {/* Secondary Images/Gallery (If multiple images exist) */}
                {project.thumbnail && project.thumbnail.length > 1 && (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-12 mb-6 border-b pb-2 border-indigo-200 dark:border-indigo-800">
                            Screenshots
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.thumbnail.slice(1).map((imgUrl, index) => (
                                <div key={index} className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                    <Image
                                        src={imgUrl}
                                        alt={`Screenshot ${index + 2}`}
                                        fill={true}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            
            {/* Optional: Footer or Back Button */}
            <div className="text-center py-12">
                <Link href="/projects" className="text-lg text-blue-600 hover:text-blue-700 font-semibold underline">
                    ← Back to All Projects
                </Link>
            </div>
        </div>
    );
}

// Next.js required notFound handler
export async function generateMetadata({ params }: { params: { id: string } }) {
    
    const awaitedParams = await params;

    return {
        // awaitedParams.id ব্যবহার করা হলো
        title: `Project ${awaitedParams.id} | Case Study`, 
    };
}