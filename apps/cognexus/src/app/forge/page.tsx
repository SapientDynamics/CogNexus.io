'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Forge vertical overview page
export default function Forge() {
  // Core capabilities of Forge
  const capabilities = [
    {
      title: "Spec & Drawing Q&A",
      description: "Get answers grounded in source documents with full citation and provenance tracking."
    },
    {
      title: "Meeting Agents",
      description: "Record, summarize, and distribute meeting notes automatically with action item tracking."
    },
    {
      title: "T&M Tracking",
      description: "Track labor, materials, and expenses with photo validation and real-time reporting."
    },
    {
      title: "Pull Planning & Forecasting",
      description: "Align trades and prevent delays with AI-powered schedule optimization."
    },
    {
      title: "Lessons Learned Repository",
      description: "Carry knowledge forward to future projects with searchable insights database."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 bg-gradient-to-b from-orange-900 to-black">
      <motion.div
        className="max-w-6xl w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header section */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-center"
          variants={itemVariants}
        >
          Forge
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-center"
          variants={itemVariants}
        >
          The construction vertical of CogNexus.io, designed to bring clarity and confidence to construction teams.
        </motion.p>
        
        {/* Capabilities section */}
        <motion.h2 
          className="text-2xl md:text-3xl font-semibold mb-8 text-center"
          variants={itemVariants}
        >
          Core Capabilities
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
        >
          {capabilities.map((capability, index) => (
            <motion.div 
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold mb-3">{capability.title}</h3>
              <p>{capability.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <p className="text-lg mb-6">
            Ready to transform your construction projects with AI-powered intelligence?
          </p>
          <Link 
            href="https://forge.cognexus.io/auth?mode=signup" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 rounded-2xl font-medium transition focus:outline-none bg-orange-500 text-black hover:bg-orange-400">
              Sign Up for Forge
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

// This code creates a page for the Forge vertical with a description,
// a grid of core capabilities, and a call-to-action button that links to the Forge app.
// It uses Framer Motion for animations and Tailwind CSS for styling.
