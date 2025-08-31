'use client';

import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { Button, Card, Chip } from '@cnx/ui';
import { Reveal } from '../components/Reveal';

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
       * - Matches Orb hero with a translucent orb + ripple background
       * - Centralized headline and CTA pair (black + white pills)
       */}
      <section id="hero" className="orb-hero px-6 scroll-mt-24">
        {/* Background visual effects: central sphere + subtle ripples */}
        <div className="orb-hero__bg" aria-hidden>
          <div className="orb-hero__sphere" />
          <div className="orb-hero__ripples" />
        </div>

        {/* Foreground content container (centered) */}
        <motion.div
          className="relative z-10 max-w-4xl w-full text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Pill tag chip above the title, matching Orb raised chip style via shared Chip */}
          <motion.div variants={itemVariants}>
            {/* Human-first positioning chip: signals the guiding principle succinctly */}
            <Chip leading={<span className="inline-block h-2 w-2 rounded-full bg-black" />}>
              Human‑First Intelligence
            </Chip>
          </motion.div>

          {/* Hero title: minimal, memorable statement that still reflects the credo. */}
          <motion.h1
            className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight text-black"
            variants={itemVariants}
          >
            Human intelligence, connected.
          </motion.h1>

          {/* Supporting copy: extremely concise promise, avoiding hype. */}
          <motion.p
            className="mt-5 text-base md:text-lg text-neutral-700 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Decision‑ready answers from what your teams know.
          </motion.p>

          {/* Primary and secondary calls to action: align to brand language */}
          <motion.div className="mt-8 flex items-center justify-center gap-3" variants={itemVariants}>
            {/* Primary: black pill button (tokens applied via variant="primary") */}
            <Link href="/forge">
              {/* Updated CTA copy to reflect login/account entry flow */}
              <Button variant="primary">Enter Your Nexus</Button>
            </Link>
            {/* Secondary: scroll to Features using hash for smooth scrolling */}
            <Link href="#how-it-works">
              <Button variant="secondary">See how it works</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/**
       * FOUNDER QUOTE SECTION
       * - Placed directly under the hero to mirror Orb's testimonial/quote band
       * - Uses large, center-aligned typography and a soft elevated avatar
       */}
      <section id="founder-quote" className="px-6 py-20 bg-neutral-50/60 scroll-mt-24">
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
