'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Laptop, Database, Code, GitBranch, Terminal } from 'lucide-react'; 

const skills = [
  { name: 'Next.js', icon: <Laptop className="w-8 h-8 text-blue-500" />, category: 'Framework' },
  { name: 'React', icon: <Code className="w-8 h-8 text-cyan-500" />, category: 'Library' },
  { name: 'TypeScript', icon: <Code className="w-8 h-8 text-blue-600" />, category: 'Language' },
  { name: 'Tailwind CSS', icon: <Code className="w-8 h-8 text-teal-500" />, category: 'Styling' },
  { name: 'Node.js/Express', icon: <Terminal className="w-8 h-8 text-green-600" />, category: 'Backend' },
  { name: 'PostgreSQL', icon: <Database className="w-8 h-8 text-indigo-600" />, category: 'Database' },
  { name: 'Prisma ORM', icon: <Database className="w-8 h-8 text-purple-600" />, category: 'ORM' },
  { name: 'Git/GitHub', icon: <GitBranch className="w-8 h-8 text-red-500" />, category: 'Tools' },
];

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          My <span className="text-blue-600 dark:text-blue-400">Skills</span> & Technologies
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 h-full dark:bg-gray-800 dark:border-gray-700">
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{skill.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{skill.category}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
