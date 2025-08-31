'use client';

import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { Button, Card, Chip } from '@cnx/ui';
import { Reveal } from '../components/Reveal';
import AnimatedInfinityBackground from '@/components/backgrounds/AnimatedInfinityBackground';

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

  // Wrap the entire page in MotionConfig to control global motion behavior.
  // Setting reducedMotion="never" ensures animations run even when the OS has
  // "Reduce motion" enabled. This avoids animations being disabled on systems
  // with accessibility preferences that would otherwise short-circuit transitions.
  return (
    <MotionConfig reducedMotion="never">
    <main>
      {/**
       * HERO SECTION
       * - Replaces the old orb/ripple background with AnimatedInfinityBackground
       * - Keeps centralized headline and CTA pair (black + white pills)
       * - Maintains full-viewport height and centered content
       */}
      <section
        id="hero"
        className="relative px-6 scroll-mt-24 min-h-screen flex items-start justify-center overflow-hidden"
      >
        {/* Background visual: replacing orb with AnimatedInfinityBackground */}
        <AnimatedInfinityBackground />
        {/* Logo and chip moved into the centered content container so the logo sits directly above the headline */}

        {/* Foreground content container (centered). Absolutely center the headline block in the viewport */}
        <motion.div
          className="absolute z-10 inset-x-0 top-1/2 -translate-y-1/2 max-w-4xl mx-auto w-full text-center px-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Removed chip per request */}

          {/* Logo: now directly above the headline to match requested visual hierarchy */}
          <motion.img
            src="/brand/CXCogNexus_crop_trans.png"
            alt="CogNexus logo"
            className="block mx-auto h-24 md:h-36 lg:h-[10.5rem] w-auto select-none mb-4"
            loading="eager"
            decoding="async"
            variants={itemVariants}
          />

          {/* Headline below the logo */}
          <motion.h1
            // Make headline ~50% smaller across breakpoints and use dark gray instead of black
            className="mt-4 text-xl md:text-2xl lg:text-3xl font-semibold md:font-bold tracking-tight text-neutral-800 whitespace-nowrap"
            variants={itemVariants}
          >
            Built for brains that build the word
          </motion.h1>
          {/* Supporting copy removed per request */}

          {/* Primary and secondary calls to action: align to brand language */}
          <motion.div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3" variants={itemVariants}>
            {/* Primary: black pill button (tokens applied via variant="primary") */}
            <Link href="/forge">
              {/* Match reference: solid black pill, white text, semibold font, layered soft shadow */}
              <Button
                variant="primary"
                // Override token variables locally to guarantee exact radius + shadow match
                // Using Tailwind arbitrary properties to set CSS variables on this instance
                className="group rounded-[14px] font-semibold !bg-black !text-white [--cnx-btn-radius:14px]
                           [--cnx-btn-shadow:0_2px_4px_rgba(0,0,0,.25),_0_10px_20px_rgba(0,0,0,.20),_0_30px_60px_rgba(0,0,0,.18)]
                           [--cnx-btn-shadow-hover:0_3px_6px_rgba(0,0,0,.28),_0_12px_24px_rgba(0,0,0,.22),_0_36px_64px_rgba(0,0,0,.20)]"
              >
                {/* Label text updated per request */}
                <span>Create Your Nexus</span>
                {/* Trailing arrow icon: up-right external style; hidden from SR to avoid altering spoken label */}
                <svg
                  aria-hidden="true"
                  className="ml-2 h-[18px] w-[18px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Arrow Up Right icon */}
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </Button>
            </Link>
            {/* Secondary: scroll to Features using hash for smooth scrolling */}
            <Link href="#how-it-works">
              {/* Match reference: white pill, subtle gray border, semibold font, soft shadow */}
              <Button
                variant="secondary"
                // Match reference radius + soft layered shadow for the white pill
                className="rounded-[14px] font-semibold !bg-white !text-neutral-900 [--cnx-btn-radius:14px]
                           border border-[#e9e9e7]
                           shadow-[0_2px_10px_rgba(0,0,0,.08),0_20px_40px_rgba(0,0,0,.06)]
                           hover:shadow-[0_3px_12px_rgba(0,0,0,.10),0_24px_48px_rgba(0,0,0,.08)]"
              >
                See Why It Works
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/**
       * FOUNDER QUOTE SECTION
       * - Placed directly under the hero to mirror Orb's testimonial/quote band
       * - Uses large, center-aligned typography and a soft elevated avatar
       */}
      {/* About section background: set to solid light gray to match reference screenshot */}
      <section id="founder-quote" className="px-6 py-20 bg-[#f5f5f5] scroll-mt-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* The quote text with subtle emphasis on key phrases */}
          {/* Reveal the quote as it enters the viewport for a refined, Orb-like scroll animation */}
          <Reveal>
            <blockquote className="text-2xl md:text-4xl font-medium leading-relaxed text-neutral-700">
              {/* Founder quote (concise): uses one of the supporting lines */}
              &ldquo;AI is leverage for human intelligence.&rdquo;
            </blockquote>
          </Reveal>

          {/* Founder identity with soft, Orb-like depth below the quote */}
          <Reveal delay={0.05}>
          <div className="mt-6 flex flex-col items-center gap-1">
            {/* Avatar placeholder; replace with a real image later if desired */}
            <div
              className="h-12 w-12 rounded-full ring-4 ring-white bg-gradient-to-b from-neutral-200 to-neutral-300 shadow-[0_2px_14px_rgba(0,0,0,0.12),0_20px_40px_rgba(0,0,0,0.08)]"
              aria-hidden
            />
            <p className="mt-2 text-sm font-medium text-neutral-900">— Justin K. Schaad</p>
            <p className="text-xs text-neutral-500">CEO & Founder, Sapient Dynamics</p>
          </div>
          </Reveal>
        </div>
      </section>

      {/**
       * TRUST/LOGOS SECTION
       * - Simple subdued row to establish credibility without stealing focus
       */}
      <section id="trust-logos" className="px-6 py-16 scroll-mt-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-neutral-500">Trusted foundations & integrations</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 items-center opacity-70">
            {/* Placeholder logo blocks; replace with real logos later */}
            <div className="h-10 bg-neutral-100 rounded-md" />
            <div className="h-10 bg-neutral-100 rounded-md" />
            <div className="h-10 bg-neutral-100 rounded-md" />
            <div className="h-10 bg-neutral-100 rounded-md" />
          </div>
        </div>
      </section>

      {/**
       * PRINCIPLES BAND (ultra-concise)
       * - Replace cards with three short chips for minimal copy and fast scanning
       */}
      <section id="principles" className="px-6 py-16 scroll-mt-24">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black">Principles</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {/* Three terse principles as chips */}
              <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />}>Human‑First</Chip>
              <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />}>Provenance</Chip>
              <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />}>Clarity → Execution</Chip>
            </div>
          </Reveal>
        </div>
      </section>

      {/**
       * FEATURE GRID
       * - Highlights core capabilities from product memory: Q&A, Meeting Agents, T&M, Pull Planning, Lessons Learned
       */}
      <section id="features" className="px-6 py-24 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            {/* Section heading reveals */}
            <Reveal>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-black">A unified layer for connected answers</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 text-neutral-700">Grounded responses, provenance, and operational foresight across your org.</p>
            </Reveal>
            {/* Thread the credo in the briefest form */}
            <Reveal delay={0.08}>
              <p className="mt-2 text-sm text-neutral-600">Intelligence, not AI.</p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card: Spec & Drawing Q&A */}
            <Reveal delay={0.15} direction="left" distance={20}>
              <Card hoverable variant="raised">
                <h3 className="text-lg font-semibold">Spec & Drawing Q&A</h3>
                <p className="mt-2 text-sm text-neutral-700">Ask questions across PDFs, drawings, and schedules with cited passages and linked sources.</p>
              </Card>
            </Reveal>

            {/* Card: Meeting Agents */}
            <Reveal delay={0.3} direction="up" distance={16}>
              <Card hoverable variant="raised">
                <h3 className="text-lg font-semibold">Meeting Agents</h3>
                <p className="mt-2 text-sm text-neutral-700">Record, summarize, and distribute decisions with ownership and next steps.</p>
              </Card>
            </Reveal>

            {/* Card: T&M Tracking */}
            <Reveal delay={0.45} direction="right" distance={20}>
              <Card hoverable variant="raised">
                <h3 className="text-lg font-semibold">T&M Tracking</h3>
                <p className="mt-2 text-sm text-neutral-700">Capture labor, materials, and expenses with photo validation and chain-of-custody.</p>
              </Card>
            </Reveal>

            {/* Card: Pull Planning & Forecasting */}
            <Reveal delay={0.15} direction="left" distance={20}>
              <Card hoverable variant="raised">
                <h3 className="text-lg font-semibold">Pull Planning & Forecasting</h3>
                <p className="mt-2 text-sm text-neutral-700">Align trades, uncover risks early, and simulate scenarios to maintain schedule.</p>
              </Card>
            </Reveal>

            {/* Card: Lessons Learned */}
            <Reveal delay={0.3} direction="up" distance={16}>
              <Card hoverable variant="raised">
                <h3 className="text-lg font-semibold">Lessons Learned Repository</h3>
                <p className="mt-2 text-sm text-neutral-700">Institutionalize knowledge with tagged insights and cross-project search.</p>
              </Card>
            </Reveal>

            {/* Card: Provenance Engine */}
            <Reveal delay={0.45} direction="right" distance={20}>
              <Card hoverable variant="raised">
                <h3 className="text-lg font-semibold">Provenance Engine</h3>
                <p className="mt-2 text-sm text-neutral-700">Every answer is cited and traceable back to sources for compliance and trust.</p>
              </Card>
            </Reveal>
          </div>

          {/* Benefits/Tags chip row inspired by Orb screenshot */}
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-3 items-center overflow-x-auto">
              <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />}>Personalized Experiences</Chip>
              <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />}>Cost Effective</Chip>
              <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />}>Real-Time Insights</Chip>
              <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />}>Automation</Chip>
              <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />}>Provenance</Chip>
              <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-neutral-900" />}>Data Privacy</Chip>
            </div>
          </Reveal>
        </div>
      </section>

      {/**
       * HOW IT WORKS
       * - Simple 3-step flow to explain ingestion → linking → answers
       */}
      <section id="how-it-works" className="px-6 py-24 bg-neutral-50/60 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-black">How it works</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 text-neutral-700">Plug in your docs, connect your teams, and get decision-ready answers.</p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.15} direction="left" distance={20}>
              <Card hoverable variant="raised">
                <h3 className="text-lg font-semibold">1. Ingest</h3>
                <p className="mt-2 text-sm text-neutral-700">Bring drawings, specs, schedules, RFIs, and field recordings into a single layer.</p>
              </Card>
            </Reveal>
            <Reveal delay={0.3} direction="up" distance={16}>
              <Card hoverable variant="raised">
                <h3 className="text-lg font-semibold">2. Link</h3>
                <p className="mt-2 text-sm text-neutral-700">CogNexus builds connections with provenance, aligning context across sources.</p>
              </Card>
            </Reveal>
            <Reveal delay={0.45} direction="right" distance={20}>
              <Card hoverable variant="raised">
                <h3 className="text-lg font-semibold">3. Answer</h3>
                <p className="mt-2 text-sm text-neutral-700">Ask questions and receive cited, actionable responses with next steps.</p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/**
       * FORGE HIGHLIGHT
       * - First vertical: construction. CTA routes to /forge.
       */}
      <section id="forge" className="px-6 py-24 scroll-mt-24">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Reveal delay={0.15} direction="left" distance={20}>
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-black">Forge for Construction</h2>
              <p className="mt-3 text-neutral-700">Purpose-built for field teams. Get clarity on specs and drawings, align meetings, and track T&M with confidence.</p>
              <div className="mt-6 flex gap-3">
                <Link href="/forge">
                  <Button variant="primary">Explore Forge</Button>
                </Link>
                <Link href="/forge">
                  <Button variant="secondary">View Capabilities</Button>
                </Link>
              </div>
            </div>
          </Reveal>
          {/* Visual placeholder card that can be replaced with a screenshot */}
          <Reveal delay={0.3} direction="right" distance={20}>
            <Card hoverable variant="raised">
              <div className="aspect-[16/10] w-full bg-neutral-100 rounded-xl" />
              <p className="mt-3 text-sm text-neutral-600">Preview of Forge workflows (placeholder)</p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/**
       * TRUST & SECURITY
       * - Short section about privacy, access control, and audit trail
       */}
      <section id="trust" className="px-6 py-24 bg-neutral-50/60 scroll-mt-24">
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal delay={0.15} direction="left" distance={20}>
            <Card hoverable variant="raised">
              <h3 className="text-lg font-semibold">Privacy-first</h3>
              <p className="mt-2 text-sm text-neutral-700">Your data remains your own. Fine-grained access controls maintain least privilege.</p>
            </Card>
          </Reveal>
          <Reveal delay={0.3} direction="up" distance={16}>
            <Card hoverable variant="raised">
              <h3 className="text-lg font-semibold">Provenance & Audit</h3>
              <p className="mt-2 text-sm text-neutral-700">Every answer is cited and auditable to satisfy compliance and stakeholder trust.</p>
            </Card>
          </Reveal>
          <Reveal delay={0.45} direction={"right"} distance={20}>
            <Card hoverable variant="raised">
              <h3 className="text-lg font-semibold">Enterprise-ready</h3>
              <p className="mt-2 text-sm text-neutral-700">SSO, role-based controls, and deployment options aligned to your security posture.</p>
            </Card>
          </Reveal>
          </div>
      </section>

      {/**
       * FINAL CTA
       */}
      <section id="cta" className="px-6 py-24 scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-black">Bring decision-ready answers to your team</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 text-neutral-700">Start with Forge for construction, then expand to the rest of your organization.</p>
          </Reveal>
          {/* Removed extra supporting line to keep the CTA section lean */}
          <Reveal delay={0.1}>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/forge">
                <Button variant="primary">Get Started</Button>
              </Link>
              <Link href="/forge">
                <Button variant="secondary">Talk to Us</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
    </MotionConfig>
  );
}

// This code creates a modern, animated home page for CogNexus.io with a hero section,
// feature cards for Platform Vision and Forge, and primary/secondary call to action buttons.
// It uses Framer Motion for animations and Tailwind CSS for styling.
