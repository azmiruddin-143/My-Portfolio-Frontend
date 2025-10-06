/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from '@/components/modules/Blogs/BlogDetailsCard';
import AboutMeSection from '@/components/modules/Home/AboutMeSection';
import Hero from '@/components/modules/Home/Hero';
import SkillsSection from '@/components/modules/Home/SkillsSection';
import React from 'react';

const Homepage = async () => {
  // const res = await fetch("http://localhost:5000/api/v1/blog", {
  //   cache: "no-store"
  // })
  // const result = await res.json()
  // const blog = result?.data
  return (
    <div>
      <Hero />
      <SkillsSection></SkillsSection>
      <AboutMeSection></AboutMeSection>

      {/* <h2 className="text-center my-15 text-4xl">Featured Posts</h2>

      <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blog.slice(0,3).map((blog : any) => (<BlogDetailsCard key={blog?.id} blog={blog}></BlogDetailsCard>))}
      </div> */}
    </div>
  );
};

export default Homepage;