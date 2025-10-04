import React from 'react';
import BlogDetailsCard from '@/components/modules/Blogs/BlogDetailsCard';
const singlePage = async ({params} : {params: Promise <{blogId : string}>}) => {
    const {blogId} = await params

const res = await fetch(`http://localhost:5000/api/v1/blog/${blogId}`, {
    cache: "no-store"
  })

   const result = await res.json()
  const blog = result?.data
  console.log(blog);


      
    return (
        <div className='py-30 px-4 max-w-7xl mx-auto'> 
            <BlogDetailsCard blog={blog}></BlogDetailsCard>
        </div>
    );
};

export default singlePage;