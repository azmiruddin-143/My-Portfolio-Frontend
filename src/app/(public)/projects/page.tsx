/* eslint-disable @typescript-eslint/no-explicit-any */

import ProjectDetailsCard from '@/components/modules/Projects/ProjectDetailsCard';
import React from 'react';

const ProjectPage = async () => {

      const res = await fetch("http://localhost:5000/api/v1/project", {
    cache: "no-store"
  })
  const result = await res.json()
  const project = result?.data?.data
  console.log(project);
    return (
        <div className="py-30 px-4 max-w-7xl mx-auto">
            <h2 className="text-center text-4xl">All Projects</h2>
            <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.map((blog: any) => (<ProjectDetailsCard key={blog?.id} project={project}></ProjectDetailsCard>))}
            </div>
        </div>
    );
};

export default ProjectPage;