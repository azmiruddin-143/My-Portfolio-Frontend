/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useState, useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import {
  ColumnDef, flexRender, getCoreRowModel, useReactTable,
  getPaginationRowModel, getSortedRowModel, SortingState, getFilteredRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Eye, Edit, Trash2, Search, } from "lucide-react";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// import { Badge } from "@/components/ui/badge";
import ProjectTableSkeleton from '@/components/skeletons/ProjectTableSkeleton';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";


interface Blog {
  id: number;
  title: string;
  content: string;
  image: string | null;
  views: number;
  author: { name: string };
  createdAt: string;
  updatedAt: string;
}

const API_URL = `https://developerazmir.vercel.app/api/v1/blog`;

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: "include", cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch blog data from API.');
  return response.json();
};



export default function ManageBlog() {
  const router = useRouter();

  const {
    data: result,
    error,
    isLoading
  } = useSWR(API_URL, fetcher, {
    revalidateOnFocus: true, 
    initialData: null,
  });

  const data: Blog[] = result?.data || []; 

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  const openConfirmDialog = (blog: Blog) => {
    setBlogToDelete(blog);
    setIsDialogOpen(true);
  };

  const deleteBlog = async () => {
    if (!blogToDelete) return;

    setIsDialogOpen(false);

    try {
      const response = await fetch(`https://developerazmir.vercel.app/api/v1/blog/${blogToDelete.id}`, {
        method: 'DELETE',
        credentials: "include",
      });

      if (response.status === 204 || response.ok) {
        toast.success(`Blog pos deleted successfully!`);
        mutate(API_URL);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Deletion failed.');
      }

    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Deletion failed.'}`);
    }
  };




  const blogColumns: ColumnDef<Blog>[] = useMemo(() => [
    { accessorKey: "title", header: ({ column }) => (<Button variant="ghost" className="px-0 py-0 h-auto font-semibold text-left" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Title <ArrowUpDown className="ml-2 h-4 w-4" /> </Button>), cell: ({ row }) => <div className="font-medium max-w-[200px] truncate">{row.getValue("title")}</div>, },
    { accessorKey: "content", header: "Content Snippet", cell: ({ row }) => <div className="text-gray-600 max-w-[200px] truncate">{row.getValue("content")}</div>, },
    { accessorKey: "author.name", header: "Author", cell: ({ row }) => <div className="text-gray-600 capitalize">{row.original.author.name}</div>, },
    { accessorKey: "views", header: ({ column }) => (<div className="text-center"> <Button variant="ghost" className="px-0 py-0 h-auto font-semibold" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Views <ArrowUpDown className="ml-2 h-4 w-4" /> </Button> </div>), cell: ({ row }) => <div className="text-center font-mono text-sm">{row.getValue("views")}</div>, },
    { accessorKey: "CreateAt By", header: "Created By", cell: ({ row }) => (<h1>Azmir Uddin (Owner)</h1>), },
    { id: "actions", header: "Actions", enableHiding: false, cell: ({ row }) => { const blog = row.original; return (<div className="flex justify-start space-x-1"> <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => router.push(`/blogs/${blog.id}`)} title="View Post"> <Eye className="h-4 w-4 text-blue-500" /> </Button> <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => router.push(`/dashboard/blog/edit/${blog.id}`)} title="Edit Post"> <Edit className="h-4 w-4 text-yellow-500" /> </Button> <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => openConfirmDialog(blog)} title="Delete Post"> <Trash2 className="h-4 w-4 text-red-500" /> </Button> </div>); }, },
  ], [router, openConfirmDialog]);


  const table = useReactTable({
    data,
    columns: blogColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, globalFilter, },
    initialState: { pagination: { pageSize: 5 } }
  });


  if (error) {
    return <div className="text-red-500 text-center py-10 text-xl">Error loading data: Failed to connect to API.</div>;
  }

  const showSkeleton = isLoading && data.length === 0;


  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Manage Blog Posts</h1>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">

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
          className="w-full cursor-pointer md:w-auto h-10 bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-md transition-all duration-200"
          onClick={() => router.push('/dashboard/create-blog')}
        >
          + Create New Post
        </Button>
      </div>

      <div className="rounded-xl border shadow-2xl bg-white overflow-x-auto">
        {showSkeleton ? (
          <ProjectTableSkeleton />
        ) : (
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-blue-50/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="text-gray-700 font-bold uppercase tracking-wider">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="h-12 whitespace-nowrap">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={blogColumns.length} className="h-24 text-center text-gray-500 dark:text-gray-400">
                    No blog posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* --- F. PAGINATION CONTROLS --- */}
      {/* শুধুমাত্র ডেটা থাকলে Pagination দেখাবে */}
      {data.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 space-x-2 py-4">
          <div className="text-sm text-gray-600">
            Showing {table.getRowModel().rows.length} of {data.length} total rows.
          </div>
          <div className="flex space-x-2">
            <span className="text-sm text-gray-600 mr-2 flex items-center">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}> Previous </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}> Next </Button>
          </div>
        </div>
      )}
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
            <AlertDialogAction onClick={deleteBlog} className="bg-red-600 hover:bg-red-700"> Yes, Delete </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}