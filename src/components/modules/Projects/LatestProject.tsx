

import React from 'react';
import ProjectGridClient from '@/components/modules/Projects/ProjectGridClient'; // Client Component

interface Project {
    id: number;
    title: string;
    description: string;
    projectUrl?: string;
    liveUrl?: string;
    features: string[];
    thumbnail: string[];
    user: { name: string };
    clickCount: number;
}

const LatestProject = async () => {

    let projects: Project[] = [];

    // 1. API কল (Server-side fetching)
    try {
        const res = await fetch("https://developerazmir.vercel.app/api/v1/project", {
            next: {
                revalidate: 60
            }
        });

        if (!res.ok) {
            console.error("Failed to fetch projects data:", res.status);
            return <div className="text-center py-32 text-red-500 text-xl">Failed to load projects. Backend server error ({res.status}).</div>;
        }

        const result = await res.json();
        projects = result?.data?.data || [];

        projects = result?.data?.data || [];
        projects = projects.slice(-3).reverse();



    } catch (error) {
        console.error("Network or Fetch Error:", error);
        return <div className="text-center py-32 text-red-500 text-xl">Network error: Could not connect to the project API.</div>;
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-32">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">No Projects Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-3">Start creating new projects in the dashboard!</p>
            </div>
        );
    }

    // 2. Client Component-এ ডেটা পাস করা হলো
    return (
        <div className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 md:px-8">

                <h2 className="text-5xl md:text-6xl py-16 font-extrabold text-center mb-10 text-gray-900 dark:text-white">
                    Latest <span className="text-blue-600 dark:text-blue-400">Projects</span>
                </h2>

                <ProjectGridClient projects={projects} />

            </div>
        </div>
    );
};


export default LatestProject;