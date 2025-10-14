/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown,  Edit, Trash2, Search, Zap, Eye } from "lucide-react";
import toast from 'react-hot-toast'; // Using react-hot-toast as per your example
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge"; // Assuming Badge component exists

// --- A. DATA INTERFACE for Project ---
interface Project {
    id: number;
    title: string;
    description: string;
    features: string[]; // Array of strings
    thumbnail: string[]; // Array of string URLs
    liveUrl: string;
    projectUrl: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}

// --- AlertDialog Imports (assuming you have these configured in shadcn/ui) ---
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ProjectTableSkeleton from '@/components/skeletons/ProjectTableSkeleton';


// --- Helper for Date Formatting (e.g., standard format) ---
const formatDateTime = (isoDate: string | null | undefined) => { 
    if (!isoDate || typeof isoDate !== 'string' || isoDate.trim() === "") return "N/A";
    
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, 
    });
};


// --- C. MAIN COMPONENT ---
export default function ManageProjects() {
    const router = useRouter(); 
    const [data, setData] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState(''); 
    
    // AlertDialog States
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

    // Function to open the confirmation dialog
    const openConfirmDialog = (project: Project) => {
        setProjectToDelete(project);
        setIsDialogOpen(true);
    };

    // --- Delete Project Function ---
    const deleteProject = async () => {
        if (!projectToDelete) return;

        setIsDialogOpen(false);
        
        try {
            // !!! UPDATE URL to match your Project API endpoint !!!
            const response = await fetch(`https://developerazmir.vercel.app/api/v1/project/${projectToDelete.id}`, {
                method: 'DELETE',
                credentials: "include", 
            });

            if (response.status === 204 || response.ok) {
                // Update local state by removing the deleted project
                setData((prevData) => prevData.filter((p) => p.id !== projectToDelete.id));
                toast.success(`Project '${projectToDelete.title}' deleted successfully!`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Deletion failed.');
            }

        } catch (error) {
            toast.error(`Error: ${error instanceof Error ? error.message : 'Deletion failed.'}`);
        }
    };


    // --- Data Fetching Effect ---
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // !!! UPDATE URL to match your Project API endpoint !!!
                const response = await fetch(`https://developerazmir.vercel.app/api/v1/project`,
                    { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch projects.");
                const result = await response.json();
                console.log(result?.data?.data);
                setData(result?.data?.data || []); 

            } catch (error) {
                toast.error("Failed to load project data. Using mock data.");
                // Fallback to mock data if API fails
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);


    // --- B. TABLE COLUMNS DEFINITION ---
    const projectColumns: ColumnDef<Project>[] = useMemo(() => [
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="px-0 py-0 h-auto font-semibold text-left"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Project Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-semibold max-w-[250px] truncate">{row.getValue("title")}</div>,
        },
        {
            accessorKey: "liveUrl",
            header: "Live URL",
            cell: ({ row }) => (
                <a 
                    href={row.original.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                    {row.original.liveUrl ? new URL(row.original.liveUrl).hostname : 'N/A'}
                </a>
            ),
        },
        {
            accessorKey: "projectUrl",
            header: "Project URL",
            cell: ({ row }) => (
                <a 
                    href={row.original?.projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                    {row.original?.projectUrl ? new URL(row.original?.projectUrl).hostname : 'N/A'}
                </a>
            ),
        },
        {
            accessorKey: "features",
            header: "Features",
            cell: ({ row }) => {
                const count = row.original.features.length;
                return (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        <Zap className="h-3 w-3 mr-1" /> {count} Feature{count !== 1 ? 's' : ''}
                    </Badge>
                );
            }
        },
        {
            accessorKey: "authorId",
            header: "Author ID",
            cell: ({ row }) => <div className="text-gray-600 text-center">{row.getValue("authorId")}</div>,
        },
          {
            accessorKey: "CreateAt By",
            header: "Created By",
            cell: ({ row }) => (
              <h1>Azmir Uddin (Owner)</h1>
            ),
        },
        // Action Buttons (View, Edit, Delete)
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => { 
                const project = row.original;
                
                const handleAction = (action: 'View' | 'Edit' | 'Delete') => {
                    if (action === 'Delete') {
                        openConfirmDialog(project); 
                    } else if (action === 'Edit') {
                        // Navigate to the dynamic edit page
                         router.push(`/dashboard/project/edit/${project.id}`);
                    } else if (action === 'View') {
                        // Navigate to the dynamic view page (e.g., project detail)
                        router.push(`/projects/view/${project.id}`); 
                    }
                };

                return (
                    <div className="flex space-x-1 cursor-pointer">
                        <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => handleAction('View')} title="View Project">
                            <Eye className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => handleAction('Edit')} title="Edit Project">
                            <Edit className="h-4 w-4 text-yellow-500" />
                        </Button>
                        <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => handleAction('Delete')} title="Delete Project">
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                );
            },
        },
    ], [router, openConfirmDialog]);


    const table = useReactTable({
        data,
        columns: projectColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter, 
        state: {
            sorting,
            globalFilter,
        },
        initialState: {
            pagination: { pageSize: 7 } // Show more rows by default
        }
    });

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">Project Management</h1>

            {/* --- D. CONTROL BAR: Search Input and Actions --- */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                
                {/* Search Bar */}
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Search project titles..."
                        value={globalFilter ?? ''}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="w-full pl-10 h-10 border-gray-300 focus:border-blue-500 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>

                {/* Create Button */}
                <Button 
                    className="w-full cursor-pointer md:w-auto h-10 bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-md transition-all duration-200"
                    onClick={() => router.push('/dashboard/create-project')} // Navigate to the create page
                >
                    + Create New Project
                </Button>
            </div>
            
            {/* --- E. DATA TABLE --- */}
            <div className="rounded-xl border shadow-2xl bg-white dark:bg-gray-800 overflow-x-auto">
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <TableHeader className="bg-indigo-50/50 dark:bg-indigo-900/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="h-12 whitespace-nowrap">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={projectColumns.length} className="h-24 text-center text-gray-500 dark:text-gray-400">
                                    {loading ? 
                                    
                                    
                                    <ProjectTableSkeleton></ProjectTableSkeleton>
                                    
                                    : 
                                    
                                    
                                    "No projects found."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* --- F. PAGINATION CONTROLS --- */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 space-x-2 py-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {table.getRowModel().rows.length} of {data.length} total projects.
                </div>
                <div className="flex space-x-2 items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400 mr-2 flex items-center">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* --- G. DELETE CONFIRMATION DIALOG --- */}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-600">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the project titled: 
                            <span className="font-semibold italic block mt-1 text-gray-800 dark:text-white">{projectToDelete?.title}</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={deleteProject} 
                            className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                        >
                            Yes, Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
