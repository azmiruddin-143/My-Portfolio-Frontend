'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // shadcn Button


const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      
      {/* Background Effect Placeholder (Replace with Aceternity/Custom BG) */}
      <div className="absolute inset-0 opacity-10 bg-grid-black/5 dark:bg-grid-white/5" />
      
      <motion.div
        className="z-10 max-w-4xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title - Animated */}
        <motion.h1 
          className="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          variants={itemVariants}
        >
          Hi, I'm &nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Azmir Uddin
          </span>
        </motion.h1>

        {/* Subtitle - Animated */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          A Full-Stack Developer specializing in building high-performance web applications using Next.js, TypeScript, and robust backend systems.
        </motion.p>
        
        {/* Buttons - Animated */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          variants={itemVariants}
        >
          <Button 
            className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg"
            onClick={() => window.location.href='/projects'} // Assuming /projects is your management route for now
          >
            Explore My Work
          </Button>
          <Button 
            variant="outline" 
            className="h-12 px-8 text-lg border-gray-400 dark:border-gray-600 dark:hover:bg-gray-800"
            onClick={() => window.location.href='/contact'}
          >
            Get In Touch
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
