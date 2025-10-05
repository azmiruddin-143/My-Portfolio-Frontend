import React from 'react';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import BlogForm from '@/components/modules/Blogs/BlogForm';

interface BlogEditPageProps {
    params: {
        id: string; // ডাইনামিক ব্লগ ID
    };
}

// API থেকে আসা ডেটার জন্য টাইপ
interface BlogData {
    id: number;
    title: string;
    content: string; 
    // ... অন্যান্য ফিল্ড
}


export default async function BlogEditPage({ params }: BlogEditPageProps) {
    const blogId = params.id;
    
    // 1. API কল (Server-Side Data Fetching)
    const res = await fetch(`http://localhost:5000/api/v1/blog/${blogId}`, {
        cache: 'no-store',
        // সুরক্ষিত রুটে কুকি পাঠানো আবশ্যিক
        headers: {
            'Cookie': headers().get('cookie') || '', 
        }
    });

    if (!res.ok) {
        if (res.status === 404) {
             notFound();
        }
        return <div className="text-center py-20 text-red-500">Failed to load blog data for ID: {blogId}</div>;
    }

    const result = await res.json();
    const blogData: BlogData = result.data; 

    // 2. Client Component এ ডেটা পাঠান
    return (
        <BlogForm
            initialData={blogData} 
            type="edit" // ✅ টাইপ: EDIT
            blogId={blogId} 
        />
    );
}
