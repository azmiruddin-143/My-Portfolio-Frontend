'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProjectDetailsCard from './ProjectDetailsCard'; 

// Project interface (Server Component থেকে আসা ডেটার সাথে মিলিয়ে নিন)
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

// Framer Motion Variants
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


export default function ProjectGridClient({ projects }: { projects: Project[] }) {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {projects.map((projectItem: Project) => (
                <motion.div 
                    key={projectItem.id} 
                    variants={itemVariants}
                    className="h-full"
                >
                    <ProjectDetailsCard project={projectItem} />
                </motion.div>
            ))}
        </motion.div>
    );
}