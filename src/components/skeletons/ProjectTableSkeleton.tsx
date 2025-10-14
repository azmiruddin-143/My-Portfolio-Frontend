import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton component
import { Table, TableBody, TableCell, TableRow,  } from '@/components/ui/table';
import { Zap,  } from 'lucide-react';

// TableHeader, TableHead
// টেবিলের রো সংখ্যা
const SKELETON_ROWS = 7;
// টেবিলের কলাম শিরোনাম (আপনার স্ক্রিনশট অনুযায়ী)
// const headers = [
//     'Title', 
//     'Live URL', 
//     'Repo URL',
//     'Features', 
//     'ID', 
//     'Author', 
//     'Actions'
// ];

export default function ProjectTableSkeleton() {
  return (
    // মূল টেবিল কনটেইনারের ডিজাইন আসল টেবিলের মতোই রাখুন
    <div className=" border shadow-2xl bg-white dark:bg-gray-800 overflow-x-auto">
        
        {/* টেম্পোরারি কন্ট্রোল বার স্কেলিটন (ঐচ্ছিক) */}
        <div className="flex justify-between items-center  bg-gray-50 dark:bg-gray-800 rounded-t-xl border-b border-gray-100 dark:border-gray-700">
             <Skeleton className="h-10 w-64 rounded-lg" />
             <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            
            {/* টেবিল হেডার: আসল ডিজাইনের মতোই থাকবে */}
            {/* <TableHeader className="bg-blue-50/50 dark:bg-gray-900/50">
                 <TableRow className="text-gray-700 font-bold uppercase tracking-wider">
                    {headers.map((header) => (
                        <TableHead key={header} className="h-12 whitespace-nowrap">
                            {header}
                        </TableHead>
                    ))}
                 </TableRow>
            </TableHeader> */}

            <TableBody>
                {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
                    <TableRow key={rowIndex} className="animate-pulse border-b border-gray-100 dark:border-gray-700">
                        
                        {/* 1. Title Column */}
                        <TableCell className="py-3">
                            <Skeleton className="h-4 w-40" />
                        </TableCell>
                        
                        {/* 2. Live URL */}
                        <TableCell className="py-3">
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        
                        {/* 3. Repo URL (or 2nd URL) */}
                        <TableCell className="py-3">
                            <Skeleton className="h-4 w-20" />
                        </TableCell>

                        {/* 4. Features (Badge) */}
                        <TableCell className="py-3">
                            <div className="flex items-center">
                                <Zap className="h-4 w-4 mr-2 text-blue-300" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                        </TableCell>

                        {/* 5. ID */}
                        <TableCell className="py-3">
                            <Skeleton className="h-4 w-4 mx-auto" />
                        </TableCell>

                        {/* 6. Author */}
                        <TableCell className="py-3">
                            <Skeleton className="h-4 w-28" />
                        </TableCell>

                        {/* 7. Actions */}
                        <TableCell className="py-3">
                            <div className="flex justify-end space-x-2">
                                <Skeleton className="h-8 w-8 rounded-md" /> 
                                <Skeleton className="h-8 w-8 rounded-md" /> 
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}