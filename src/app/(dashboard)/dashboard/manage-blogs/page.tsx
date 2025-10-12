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
import { ArrowUpDown, Eye, Edit, Trash2, Search } from "lucide-react";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// ✅ AlertDialog Imports
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


// --- A. DATA INTERFACE ---
interface Blog {
  id: number;
  title: string;
  content: string; 
  views: number;
  author: { name: string };
  createdAt: string;
  updatedAt: string;
}

// --- Helper for Date Formatting (GMT+6 - Bangladesh Time) ---
const formatDateTimeBD = (isoDate: string | null | undefined) => { 
    if (!isoDate || typeof isoDate !== 'string' || isoDate.trim() === "") return "N/A";
    
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Dhaka', 
        hour12: true, 
    });
};


// --- C. MAIN COMPONENT ---
export default function ManageBlog() {
  const router = useRouter(); // ✅ useRouter হুকটি এখানে কল করা হলো
  const [data, setData] = useState<Blog[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState(''); 
  
  // AlertDialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  // Function to open the confirmation dialog
  const openConfirmDialog = (blog: Blog) => {
    setBlogToDelete(blog);
    setIsDialogOpen(true);
  };

  // ✅ ডেটা ডিলিট করার ফাংশন
  const deleteBlog = async () => {
    if (!blogToDelete) return;

    setIsDialogOpen(false);
    
    try {
      const response = await fetch(`https://developerazmir.vercel.app/api/v1/blog/${blogToDelete.id}`, {
        method: 'DELETE',
        credentials: "include", 
      });

      if (response.status === 204 || response.ok) {
        setData((prevData) => prevData.filter((blog) => blog.id !== blogToDelete.id));
        toast.success(`Blog post '${blogToDelete.title}' deleted successfully!`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Deletion failed.');
      }

    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Deletion failed.'}`);
    }
  };



  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`https://developerazmir.vercel.app/api/v1/blog`,
           { credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch blogs.");
        const result = await response.json();
        setData(result.data || []); 
      } catch (error) {
        toast.error("Failed to load blog data.");
      } 
    };
    fetchBlogs();
  }, []);


  // ✅ B. TABLE COLUMNS DEFINITION (useMemo ব্যবহার করে)
  const blogColumns: ColumnDef<Blog>[] = useMemo(() => [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 py-0 h-auto font-semibold text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium max-w-[200px] truncate">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "content",
      header: "Content Snippet",
      cell: ({ row }) => <div className="text-gray-600 max-w-[200px] truncate">{row.getValue("content")}</div>,
    },
    {
      accessorKey: "author.name",
      header: "Author",
      cell: ({ row }) => <div className="text-gray-600 capitalize">{row.original.author.name}</div>,
    },
    {
      accessorKey: "views",
      header: ({ column }) => (
        <div className="text-right">
          <Button
            variant="ghost"
            className="px-0 py-0 h-auto font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Views
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div className="text-right font-mono text-sm">{row.getValue("views")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At (BD)",
      cell: ({ row }) => {
        const isoDate: string = row.original.createdAt; 
        return <div className="text-sm">{formatDateTimeBD(isoDate)}</div>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated (BD)",
      cell: ({ row }) => {
        const isoDate: string = row.original.updatedAt;
        return <div className="text-sm">{formatDateTimeBD(isoDate)}</div>;
      },
    },
    // Action Buttons (View, Edit, Delete)
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => { 
        const blog = row.original;
        
        // Access the openConfirmDialog function (no longer passed via table meta)
        const handleAction = (action: 'View' | 'Edit' | 'Delete') => {
          if (action === 'Delete') {
            openConfirmDialog(blog); // ✅ Delete Dialog ওপেন
          } else if (action === 'Edit') {
            router.push(`/dashboard/blog/edit/${blog.id}`);
          } else if (action === 'View') {
            router.push(`/blogs/${blog.id}`); // ✅ View Navigation
          }
        };

        return (
          <div className="flex justify-end space-x-1">
            <Button variant="ghost" size="icon" onClick={() => handleAction('View')} title="View Post">
              <Eye className="h-4 w-4 text-blue-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleAction('Edit')} title="Edit Post">
              <Edit className="h-4 w-4 text-yellow-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleAction('Delete')} title="Delete Post">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ], [router, openConfirmDialog]); // ✅ [router] Dependency ঠিক করা হয়েছে


  const table = useReactTable({
    data,
    columns: blogColumns,
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
        pagination: { pageSize: 5 } 
    }
  });


 

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Manage Blog Posts</h1>

      {/* --- D. CONTROL BAR: Search Input and Actions --- */}
      <div  className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
        
        {/* Search Bar */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search titles..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full pl-10 h-10 border-gray-300 focus:border-blue-500 rounded-lg shadow-sm"
          />
        </div>

        {/* Create Button */}
        <Button 
            className="w-full md:w-auto h-10 bg-green-600 hover:bg-green-700 font-semibold"
            onClick={() => router.push('/dashboard/create-blog')}
        >
            + Create New Post
        </Button>
      </div>
      
      {/* --- E. DATA TABLE --- */}
      <div className="rounded-xl border shadow-2xl bg-white overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-blue-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-gray-700 font-bold uppercase tracking-wider">
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
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={blogColumns.length} className="h-24 text-center text-gray-500">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- F. PAGINATION CONTROLS --- */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 space-x-2 py-4">
        <div className="text-sm text-gray-600">
            Showing {table.getRowModel().rows.length} of {data.length} total rows.
        </div>
        <div className="flex space-x-2">
            <span className="text-sm text-gray-600 mr-2 flex items-center">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
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
              This action cannot be undone. This will permanently delete the blog post titled: 
              <span className="font-semibold italic block mt-1">{blogToDelete?.title}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
                onClick={deleteBlog} 
                className="bg-red-600 hover:bg-red-700"
            >
                Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}