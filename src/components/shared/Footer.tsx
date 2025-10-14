// import Link from "next/link";

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative w-full overflow-hidden pt-12 pb-10 ">
//       {/* Background Layer */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           background:
//             "radial-gradient(125% 125% at 50% 60%, #000000 40%, #010133 100%)",
//         }}
//       />

//       {/* Content Layer */}
//       <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28 text-white">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
//           {/* Left */}
//           <div>
//             <h2 className="text-white text-xl font-semibold mb-1">
//               Next level™
//             </h2>
//             <p className="text-sm text-gray-400">Smart blog System</p>
//           </div>

//           {/* Center Nav */}
//           <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
//             <Link href="/" className="hover:text-white transition-colors">
//               Home
//             </Link>
//             <Link href="/events" className="hover:text-white transition-colors">
//               Events
//             </Link>
//             <Link href="/about" className="hover:text-white transition-colors">
//               About
//             </Link>
//             <Link
//               href="/contact"
//               className="hover:text-white transition-colors"
//             >
//               Contact
//             </Link>
//           </div>

//           {/* Right */}
//           <div className="text-sm text-gray-400">
//             © {currentYear} next level team. All rights reserved.
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


import Link from "next/link";
import { Github, Linkedin } from "lucide-react"; // Social icons এর জন্য

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-16 pb-10 border-t border-gray-800">
      {/* Background Layer: Deep Blue/Black Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 60%, #080808 40%, #1A214D 100%)",
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-white">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          
          {/* 1. Brand/Mission Statement (Left) */}
          <div className="max-w-xs space-y-2 text-left">
            <h2 className="text-white text-3xl font-extrabold mb-1 tracking-wider">
              Azmir Uddin
            </h2>
            <p className="text-sm text-indigo-300">
              Building next-generation digital experiences with full-stack proficiency. Let&apos;s create something meaningful.
            </p>
          </div>

          {/* 2. Quick Links (Center) */}
          <div className="flex flex-col space-y-3 text-left">
            <h3 className="text-lg font-semibold text-indigo-200 mb-2">Quick Links</h3>
            
            {/* Internal Links (Uses next/link) */}
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/projects" className="hover:text-white transition-colors text-gray-400">
              Projects
            </Link>
            <Link href="/blogs" className="hover:text-white transition-colors text-gray-400">
              Blog
            </Link>
            <Link href="/about" className="hover:text-white transition-colors text-gray-400">
              About Me
            </Link>
          </div>

          {/* 3. Social & Legal (Right) */}
          <div className="flex flex-col space-y-3 text-left">
            <h3 className="text-lg font-semibold text-indigo-200 mb-2">Connect</h3>
            <div className="flex space-x-4">
              
              {/* 🔥 FIX: GitHub Link - Changed to <a> tag for external URL 🔥 */}
              <a 
                href="https://github.com/azmiruddin-143" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              
              {/* 🔥 FIX: LinkedIn Link - Changed to <a> tag for external URL 🔥 */}
              <a 
                href="https://www.linkedin.com/in/azmiruddin05/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              {/* Add more social links here */}
            </div>
          </div>

        </div>
        
        {/* Separator Line */}
        <div className="mt-12 mb-6 border-t border-gray-700 opacity-50" />

        {/* Copyright */}
        <div className="text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center text-center">
            <p className="mb-2 sm:mb-0">
                Crafted with Next.js 14 and Tailwind CSS.
            </p>
            <p>
                © {currentYear} Developer Azmir Uddin. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}