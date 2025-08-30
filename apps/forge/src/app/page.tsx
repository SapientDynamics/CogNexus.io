'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Home page component for Forge app
export default function Home() {
  // Construction project phases for feature showcase
  const projectPhases = [
    {
      title: "Pre-Construction",
      description: "Analyze specs and drawings to identify potential issues before they become RFIs."
    },
    {
      title: "Active Construction",
      description: "Track progress, document T&M, and keep all trades aligned with pull planning."
    },
    {
      title: "Project Completion",
      description: "Capture lessons learned and create a searchable knowledge base for future projects."
    }
  ];

  // Animation variants
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
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
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
          Forge
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Construction intelligence that brings clarity, prevents delays, and builds confidence for field teams.
        </motion.p>
        
        {/* Feature showcase */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
        >
          {projectPhases.map((phase, index) => (
            <motion.div 
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-2xl font-semibold mb-4">{phase.title}</h2>
              <p>{phase.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Core capabilities section */}
        <motion.h2 
          className="text-2xl md:text-3xl font-semibold mb-8"
          variants={itemVariants}
        >
          Core Capabilities
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
        >
          {/* Spec & Drawing Q&A */}
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition text-left"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-3">Spec & Drawing Q&A</h3>
            <p className="mb-4">
              Ask questions about your project documents and get answers grounded in your source materials with full citation tracking.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Instant answers from project specs and drawings</li>
              <li>Full citation and provenance tracking</li>
              <li>Reduce RFIs and clarification requests</li>
            </ul>
          </motion.div>
          
          {/* Meeting Agents */}
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition text-left"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-3">Meeting Agents</h3>
            <p className="mb-4">
              Record, summarize, and distribute meeting notes automatically with action item tracking and follow-up.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Automated meeting transcription and summarization</li>
              <li>Action item extraction and assignment</li>
              <li>Follow-up reminders and status tracking</li>
            </ul>
          </motion.div>
          
          {/* T&M Tracking */}
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition text-left"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-3">T&M Tracking</h3>
            <p className="mb-4">
              Track labor, materials, and expenses with photo validation and real-time reporting for accurate billing.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Mobile-friendly time and material entry</li>
              <li>Photo documentation with automatic tagging</li>
              <li>Real-time cost tracking and reporting</li>
            </ul>
          </motion.div>
          
          {/* Pull Planning & Forecasting */}
          <motion.div 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition text-left"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-3">Pull Planning & Forecasting</h3>
            <p className="mb-4">
              Align trades and prevent delays with AI-powered schedule optimization and constraint analysis.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Collaborative digital pull planning board</li>
              <li>Constraint identification and resolution</li>
              <li>AI-powered schedule optimization</li>
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div variants={itemVariants}>
          <p className="text-lg mb-6">
            Ready to bring intelligence to your construction projects?
          </p>
          <button className="px-6 py-3 rounded-2xl font-medium transition focus:outline-none bg-white text-black hover:bg-white/90">
            Request Demo
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}

// This code creates a modern, animated home page for the Forge app with a hero section,
// project phase cards, detailed capability descriptions, and a call to action button.
// It uses Framer Motion for animations and Tailwind CSS for styling.
