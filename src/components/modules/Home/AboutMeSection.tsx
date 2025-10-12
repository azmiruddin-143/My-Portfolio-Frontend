'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import myphoto from "../.././../assets/azmir-uddin.png";
const AboutMeSection = () => {
  const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: "easeInOut" as any, 
      delay: 0.3,
    },
  },
};
 const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: "easeOut" as any,
      delay: 0.4,
    },
  },
};

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About <span className="text-blue-600 dark:text-blue-400">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div 
            className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] rounded-xl overflow-hidden shadow-2xl border-4 border-indigo-200 dark:border-indigo-900"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >

            <Image
              src={myphoto} 
              alt="Your Profile Picture"
              fill={true}
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Text Content Section */}
          <motion.div 
            className="space-y-6 text-lg text-gray-700 dark:text-gray-300"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p>
              Hello! I&apos;M Azmir Uddin, a dedicated Full-Stack Developer with a passion for building innovative and efficient digital experiences. My journey into web development began with a curiosity for how websites work, which quickly evolved into a drive to create them.
            </p>
            <p>
              I thrive on solving complex problems and transforming ideas into tangible, user-friendly applications. With expertise in Next.js, React, Node.js, and databases like PostgreSQL, I enjoy working across the entire development stack to deliver high-quality products.
            </p>
            <p>
              Beyond coding, I&apos;M an avid learner, always exploring new technologies and best practices to keep my skills sharp. When I&apos;M not at the keyboard, you might find me exploring new hiking trails, reading sci-fi novels, or experimenting with new recipes.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button asChild className="h-12 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-md">
                <Link href="https://drive.google.com/file/d/1z_9FoZaonhO4h4UQ_28EjgyUG0oqDovA/view" target="_blank" rel="noopener noreferrer">Download My Resume</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-8 text-lg border-2 border-indigo-500 text-indigo-700 dark:text-indigo-300 dark:border-indigo-400 dark:hover:bg-indigo-900 hover:bg-indigo-50">
                <Link href="/contact">Let&apos;s Connect</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
