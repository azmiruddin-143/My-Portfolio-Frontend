// src/components/modules/Blog/BlogCard.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

// ধরে নিলাম আপনার Blog ডেটা টাইপ এমন:
interface Blog {
  id: number | string;
  title: string;
  content: string;
  thumbnail: string; // ছবির URL
  author: { name: string };
  views: number;
  createdAt: string;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  // আপনার স্কিমাতে slug না থাকায়, আমরা id ব্যবহার করছি
  const blogUrl = `/blogs/${blog.id}`; 
  
  // কন্টেন্ট থেকে প্রথম কিছু অংশ নিয়ে ডেসক্রিপশন তৈরি করা
  const description = blog.content.length > 100 
    ? blog.content.substring(0, 100) + '...'
    : blog.content;


  return (
    // কার্ডের মূল কন্টেইনার
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 bg-white h-full">
        
      {/* থাম্বনেইল এবং টাইটেল ইমেজ */}
      <Link href={blogUrl} className="relative w-full aspect-video bg-gray-900">
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          
          {/* ব্লগ টাইটেল/ক্যাটাগরি ইমেজ - স্ক্রিনশটের NEXT.JS বা Tailwind CSS লেখাটি */}
          {/* এখানে আমরা thumbnail এর URL ব্যবহার করছি, কিন্তু স্ক্রিনশট অনুযায়ী টেক্সটও রেন্ডার করা যেতে পারে */}
          <div className="text-white text-3xl font-extrabold p-2 bg-black/40 rounded-lg backdrop-blur-sm">
            {blog.title.split(' ')[0]} {/* শুধু প্রথম শব্দটি দেখানো হলো */}
          </div>
          
          {/* Views এবং Author (স্ক্রিনশটের নিচের বাম কোণ) */}
          <div className="flex justify-between items-center text-white text-xs">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="font-medium">{blog.views} views</span>
            </div>
            <span className="font-semibold">{blog.author?.name}</span>
          </div>
        </div>
        
        {/* যদি আপনার থাম্বনেইল ডার্ক ব্যাকগ্রাউন্ড ইমেজ হয়, তবে এটি ব্যবহার করতে পারেন: */}
        {/*
        <Image 
            src={blog.thumbnail} 
            alt={blog.title} 
            layout="fill" 
            objectFit="cover" 
            className="opacity-40" // ডার্ক ফিল্টার
        />
        */}
      </Link>

      {/* কন্টেন্ট বডি */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          {/* টাইটেল */}
          <h3 className="text-xl font-bold line-clamp-2 hover:text-blue-600">
            <Link href={blogUrl}>{blog.title}</Link>
          </h3>
          {/* ডেসক্রিপশন */}
          <p className="text-gray-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{__html: description}} />
        </div>
        
        {/* Read More বাটন */}
        <Link href={blogUrl} className="mt-4 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
          Read More
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}