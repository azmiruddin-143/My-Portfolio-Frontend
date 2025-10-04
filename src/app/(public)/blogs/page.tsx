/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from '@/components/modules/Blogs/BlogDetailsCard';
const AllBlogsPage = async () => {
  const res = await fetch("http://localhost:5000/api/v1/blog", {
    cache: "no-store"
  })
  const result = await res.json()
  const blog = result?.data
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl">All Blogs</h2>
      <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blog.map((blog: any) => (<BlogDetailsCard key={blog?.id} blog={blog}></BlogDetailsCard>))}
      </div>
    </div>
  );
};

export default AllBlogsPage;
