import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Check } from 'lucide-react';

export default function ProjectFormSkeleton() {
  
  const FEATURE_ROWS = 3; 
  const THUMBNAIL_ROWS = 2; 

  return (

    <div className="container mx-6 sm:mx-10 py-10 px-4 max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
      <div className="animate-pulse space-y-6"> {/* Main form container */}
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
          Edit Project
        </h1>
        {/* Sub-description line */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-3/4 h-5 mt-2" />
        </p>

        <form className="space-y-6"> {/* Form body */}
          {/* Project Title */}
          <div>
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-200">Project Title *</Label>
            <Skeleton className="w-full h-10 mt-2" />
          </div>

          {/* Live URL */}
          <div>
            <Label htmlFor="liveUrl" className="text-gray-700 dark:text-gray-200">Live URL</Label>
            <Skeleton className="w-full h-10 mt-2" />
          </div>

          {/* Project URL */}
          <div>
            <Label htmlFor="projectUrl" className="text-gray-700 dark:text-gray-200">Project URL</Label>
            <Skeleton className="w-full h-10 mt-2" />
          </div>

          {/* Detailed Description */}
          <div>
            <Label htmlFor="description" className="text-gray-700 dark:text-gray-200">Detailed Description *</Label>
            <Skeleton className="w-full h-24 mt-2" />
          </div>

          {/* Key Features Section */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <Check className="h-5 w-5 text-green-500 rounded" /> Key Features *
            </Label>
            {Array.from({ length: FEATURE_ROWS }).map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Skeleton className="w-full h-10" />
                {index < FEATURE_ROWS -1 && <Skeleton className="h-9 w-9" />} {/* Only show trash icon on some initial fields */}
              </div>
            ))}
            <Skeleton className="w-48 h-10 mt-2 rounded-md" /> {/* Add Another Feature button */}
          </div>

          <Separator className="my-6" />

          {/* Thumbnail URLs Section */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <ImageIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" /> Thumbnail URLs (Screenshots) *
            </Label>
            {Array.from({ length: THUMBNAIL_ROWS }).map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Skeleton className="w-full h-10" />
                {index < THUMBNAIL_ROWS -1 && <Skeleton className="h-9 w-9" />} {/* Only show trash icon on some initial fields */}
              </div>
            ))}
            <Skeleton className="w-48 h-10 mt-2 rounded-md" /> {/* Add Another Image button */}
          </div>

          {/* Update Project Button */}
          <Skeleton className="w-full h-12 mt-6 rounded-lg" />
        </form>
      </div>
    </div>
  );
}
