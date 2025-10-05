// src/components/modules/Blog/BlogCard.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

// ধরে নিলাম আপনার Blog ডেটা টাইপ এমন:
interface Blog {
  id: number | string;
  title: string;
  image: string;
  content: string;
  thumbnail: string; // ছবির URL
  author: { name: string };
  views: number;
  createdAt: string;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  const blogUrl = `/blogs/${blog.id}`;

  const description = blog.content.length > 100
    ? blog.content.substring(0, 100) + '...'
    : blog.content;


    console.log(blog.image);

  return (

    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 bg-white h-full">

      <Link href={blogUrl} className="relative w-full aspect-video">
        <div className="absolute inset-0 p-4 flex flex-col justify-between">

    
          <div className="flex justify-between items-center text-white text-xs">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="font-medium">{blog.views} views</span>
            </div>
            <span className="font-semibold">{blog.author?.name}</span>
          </div>
        </div>




       
          <Image
            src={blog?.image}
            alt={blog.title}
            fill={true} 
            className="opacity-100 z-0"
            style={{ objectFit: 'cover' }}

            sizes="(max-width: 768px) 100vw, 33vw"
          />

      



      </Link>

      {/* কন্টেন্ট বডি */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          {/* টাইটেল */}
          <h3 className="text-xl font-bold line-clamp-2 hover:text-blue-600">
            <Link href={blogUrl}>{blog.title}</Link>
          </h3>
          {/* ডেসক্রিপশন */}
          <p className="text-gray-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: description }} />
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