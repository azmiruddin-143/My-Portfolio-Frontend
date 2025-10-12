import React from 'react';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import BlogForm from '@/components/modules/Blogs/BlogForm';

interface BlogEditPageProps {
    params: {
        id: string; 
    };
}

interface BlogData {
    id: number;
    title: string;
    content: string;
    image: string | null; 
}


export default async function BlogEditPage({ params }: BlogEditPageProps) {
    const blogId = params.id;

    const res = await fetch(`https://developerazmir.vercel.app/api/v1/blog/${blogId}`, {
        cache: 'no-store',
        headers: {
            'Cookie': (await headers()).get('cookie') || '',
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


    return (
        <BlogForm
            initialData={blogData}
            type="edit"
            blogId={blogId}
        />
    );
}
