'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Home page component for CogNexus.io
export default function Home() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      {/* Hero section */}
      <motion.div 
        className="max-w-5xl w-full text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          variants={itemVariants}
        >
          CogNexus<span className="text-teal-400">.io</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          A unified intelligence layer that turns what teams already know into connected, decision-ready answers.
        </motion.p>
        
        {/* Feature cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          variants={itemVariants}
        >
          {/* Platform Vision Card */}
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Platform Vision</h2>
            <p className="mb-6">
              CogNexus ingests drawings, specs, schedules, RFIs, and field recordings; links them with provenance; 
              and delivers cited responses, trends, and foresight.
            </p>
            <button className="px-5 py-3 rounded-2xl font-medium transition focus:outline-none bg-white/10 text-white hover:bg-white/20">
              Learn More
            </button>
          </motion.div>
          
          {/* Forge Card */}
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Forge</h2>
            <p className="mb-6">
              Our construction vertical that provides clarity, prevents delays, and builds confidence for field teams.
            </p>
            <Link href="/forge">
              <button className="px-5 py-3 rounded-2xl font-medium transition focus:outline-none bg-orange-500 text-black hover:bg-orange-400">
                Explore Forge
              </button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div variants={itemVariants}>
          <p className="text-lg mb-6">
            Ready to transform how your team makes decisions?
          </p>
          <button className="px-6 py-3 rounded-2xl font-medium transition focus:outline-none bg-white text-black hover:bg-white/90">
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}

// This code creates a modern, animated home page for CogNexus.io with a hero section,
// feature cards for Platform Vision and Forge, and a call to action button.
// It uses Framer Motion for animations and Tailwind CSS for styling.
