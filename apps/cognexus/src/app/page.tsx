'use client';

import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { Button, Card } from '@cnx/ui';
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
      {/* Parallax hero: fixed full-viewport layer. Other sections scroll over this. */}
      <section
        id="hero"
        className="fixed inset-0 z-0 px-6 min-h-screen flex items-start justify-center overflow-hidden"
      >
        {/* Background visual: initialize at ~19s baseline visual state (added +9s earlier).
            Note: To slow the overall animation by ~50% uniformly, we only halve evolveRate and leave other
            speed parameters at their defaults so every motion tied to time is reduced evenly.
            Because evolveRate is halved, startAtSeconds is doubled to 38 to preserve the exact visual starting pose. */}
        <AnimatedInfinityBackground
          startAtSeconds={38}       // doubled to compensate for evolveRate halved
          evolveRate={0.00025}      // 50% slowdown (default was 0.0005)
        />
        {/* Logo and chip moved into the centered content container so the logo sits directly above the headline */}

        {/* Foreground content container (centered). Absolutely center the headline block in the viewport */}
        <motion.div
          className="absolute z-10 inset-x-0 top-1/2 -translate-y-1/2 max-w-4xl mx-auto w-full text-center px-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Removed chip per request */}

          {/* Logo: now directly above the headline to match requested visual hierarchy.
              Add soft alpha-aware drop shadows using CSS filter-based drop-shadow so the shadow follows the PNG's transparency.
              We layer two dark soft shadows for depth and a faint white micro-glow to lift against mixed backgrounds. */}
          <motion.img
            src="/brand/CXCogNexus_crop_trans.png"
            alt="CogNexus logo"
            className="block mx-auto h-24 md:h-36 lg:h-[10.5rem] w-auto select-none mb-[-24px]
                       [filter:drop-shadow(0_2px_3px_rgba(0,0,0,0.40))_drop-shadow(0_14px_36px_rgba(0,0,0,0.24))_drop-shadow(0_0_2px_rgba(255,255,255,0.85))]
                       [will-change:filter]"
            loading="eager"
            decoding="async"
            variants={itemVariants}
          />

          {/* Headline below the logo */}
          <motion.h1
            // Keep headline ~50% smaller, lighter gray, and reduce font weight to medium for a softer look
            className="mt-4 pb-10 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-neutral-600 whitespace-nowrap"
            variants={itemVariants}
          >
            AI for the teams who build the world
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
                           /* Heavier shadows are supplied via CSS variables using inline style for reliability */
                           transition-shadow duration-300 ease-out active:translate-y-px"
                /* Provide heavier shadows via token vars so hover still works */
                style={{
                  ['--cnx-btn-shadow' as any]: '0 12px 28px rgba(0,0,0,.58), 0 32px 64px rgba(0,0,0,.40), 0 96px 160px rgba(0,0,0,.32)',
                  ['--cnx-btn-shadow-hover' as any]: '0 16px 36px rgba(0,0,0,.62), 0 44px 88px rgba(0,0,0,.44), 0 120px 200px rgba(0,0,0,.34)'
                }}
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
                           /* Heavier, wider soft shadow while keeping a clean white surface */
                           shadow-[0_6px_18px_rgba(0,0,0,.12),_0_28px_56px_rgba(0,0,0,.10),_0_1px_0_rgba(0,0,0,.04)]
                           hover:shadow-[0_12px_28px_rgba(0,0,0,.14),_0_36px_72px_rgba(0,0,0,.12)]
                           transition-shadow duration-300 ease-out active:translate-y-px"
              >
                See How It Works
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Spacer: creates initial scrollable height so that fixed hero is visible before content overlaps.
          We use exactly one viewport height so the next sections start just below the fold and slide over the hero. */}
      <div className="h-screen" aria-hidden />

      {/**
       * FOUNDER QUOTE SECTION
       * - Placed directly under the hero to mirror Orb's testimonial/quote band
       * - Uses large, center-aligned typography and a soft elevated avatar
       */}
      {/* About section background: set to solid light gray to match reference screenshot */}
      {/* Scroll content wrapper sits above the fixed hero so sections slide over it */}
      <div className="relative z-10">
      <section id="founder-quote" className="relative px-6 py-40 scroll-mt-24 bg-[#f5f5f5]">
        {/* Subtle separators to visually anchor the band */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <div className="mx-auto max-w-5xl text-center">
          {/* Reference-style presentation: flat light band, centered quote, subtle emphasis on key phrases */}
          <Reveal>
            <blockquote className="mx-auto max-w-[60ch] text-[22px] md:text-[34px] lg:text-[40px] font-medium
                                       leading-[1.35] tracking-tight text-neutral-700 [text-wrap:balance]">
              {/* Match reference-like rhythm with intentional line breaks using block spans */}
              {/* 2025-08-31: Updated quote per request */}
              <span className="block">&ldquo;Individual brilliance built the past.</span>
              <span className="block">Collective intelligence is building the future.</span>
              <span className="block">This is CogNexus&rdquo;</span>
            </blockquote>
          </Reveal>

          {/* Avatar and attribution below the quote, matching the minimal reference style */}
          <Reveal delay={0.05}>
            <div className="relative mt-10 flex flex-col items-center gap-3">
              {/* Soft radial glow behind the avatar to match the reference's subtle focal halo.
                  Scale the halo up to match the larger avatar size. */}
              <span aria-hidden className="pointer-events-none absolute top-1 h-36 w-36 md:h-48 md:w-48 -z-10 rounded-full
                                         bg-[radial-gradient(closest-side,rgba(0,0,0,0.08),rgba(0,0,0,0)_70%)]" />
              {/* Avatar orb (CEO photo): increase size for better visual balance with the quote.
                  Uses responsive sizing so it remains proportional across breakpoints. */}
              <div
                className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full ring-4 ring-white bg-center bg-cover
                           shadow-[0_2px_8px_rgba(0,0,0,0.10),_0_14px_28px_rgba(0,0,0,0.08)] mb-[30px]"
                /* Use multiple backgrounds: first existing image wins, then a linear-gradient as visual fallback */
                /* Add an extra 30px of space below the avatar per request (2025-08-31) */
                style={{ backgroundImage: "url('/ceo/Justin_K_Schaad.jpeg'), url('/ceo/portrait.jpg'), linear-gradient(to bottom, #ffffff, #e5e5e5)" }}
                aria-hidden
              />
              {/* Updated attribution company name per request (2025-08-31) */}
              <p className="text-xs md:text-sm text-neutral-600">Justin K. Schaad, CEO & Founder, CogNexus</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust logos section removed per request (2025-08-31). Keeping this note for traceability. */}

      {/**
       * PRINCIPLES BAND (ultra-concise)
       * - Replace cards with three short chips for minimal copy and fast scanning
       */}
      {/* Principles band styled to match reference (soft gray background, pill label, large title,
          subtle supporting line, and elevated cards). */}
      {/* 2025-08-31: Lightened section background once more (#fafafa → white) for maximum lightness while retaining card depth via gradients. */}
      <section id="principles" className="px-6 py-24 scroll-mt-24 bg-white">
        <div className="mx-auto max-w-6xl text-center">
          {/* Small pill label above the section title to echo the reference screenshot. */}
          <Reveal>
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e9e9e7] bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-700 shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_6px_14px_rgba(0,0,0,.06)]">
              <span aria-hidden className="text-[12px]">★</span>
              <span>PRINCIPLES</span>
            </div>
          </Reveal>

          {/* Large, elegant title + subtle subtitle. Keep copy concise to avoid clutter. */}
          <Reveal delay={0.05}>
            {/* Match reference heading style: oversized, tight tracking, and dark vertical gradient fill.
                Per request, use a lighter weight (font-medium). */}
            <h2 className="mt-4 text-[36px] md:text-[56px] lg:text-[72px] font-medium tracking-tight leading-none bg-gradient-to-b from-neutral-800 to-black text-transparent bg-clip-text">Principles</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-2 text-sm md:text-base text-neutral-500">The rules and promises that guide CogNexus.</p>
          </Reveal>

          {/* Update (2025-08-31): Replace terse chips with detailed cards per new copy.
              Card styling mirrors the reference: white surface, soft border, large radius,
              layered shadows, and a small embossed orb as a visual anchor. */}
          <Reveal delay={0.12}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/*
                Spacing note:
                The shared `Card` from `@cnx/ui` applies its own internal padding.
                Avoid adding outer `p-*` classes on these Cards to prevent double padding
                and ensure consistent spacing across all three principles cards.
              */}
              {/* Card 1: Human-First */}
              <Card
                hoverable
                variant="raised"
                className="relative rounded-[18px] border transition-shadow duration-300
                           [--cnx-card-bg:#ffffff]
                           [--cnx-card-border:#e9e9e7]
                           [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)] /* Further reduced base (2025-08-31) */
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)] /* Slightly above base, still subtle */
                           hover:[--cnx-card-shadow-raised:0_6px_16px_rgba(0,0,0,.09),_0_20px_36px_rgba(0,0,0,.07)] /* Softer hover after reduction */">
                {/* Embossed icon orb (decorative) to echo reference visuals. */}
                <div className="mb-5">
                  <div className="h-14 w-14 rounded-full bg-white border border-[#ececec]
                                  shadow-[0_1px_0_rgba(255,255,255,.85)_inset,0_8px_18px_rgba(0,0,0,.10),_0_1px_0_rgba(0,0,0,.04)] grid place-items-center">
                    <span aria-hidden className="text-neutral-800">⚙️</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black">Human-First</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  <span className="font-semibold">Rule:</span> AI assists; people decide.
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  <span className="font-semibold">Promise:</span> CogNexus explains its reasoning, lets you scope sources and permissions, and pauses when confidence is low—so judgment stays in human hands.
                </p>
              </Card>

              {/* Card 2: Provenance */}
              <Card
                hoverable
                variant="raised"
                className="relative rounded-[18px] border transition-shadow duration-300
                           [--cnx-card-bg:#ffffff] /* Match section bg */
                           [--cnx-card-border:#e9e9e7] /* Soft border like reference */
                           [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)] /* Further reduced base (2025-08-31) */
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)] /* Slightly above base, still subtle */
                           hover:[--cnx-card-shadow-raised:0_6px_16px_rgba(0,0,0,.09),_0_20px_36px_rgba(0,0,0,.07)] /* Softer hover after reduction */">
                <div className="mb-5">
                  <div className="h-14 w-14 rounded-full bg-white border border-[#ececec]
                                  shadow-[0_1px_0_rgba(255,255,255,.85)_inset,0_8px_18px_rgba(0,0,0,.10),_0_1px_0_rgba(0,0,0,.04)] grid place-items-center">
                    <span aria-hidden className="text-neutral-800">🧾</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black">Provenance</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  <span className="font-semibold">Rule:</span> Answers come with receipts.
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  <span className="font-semibold">Promise:</span> Every claim links to the exact page, version, and timestamp. If a source changes, CogNexus flags the delta and shows what moved.
                </p>
              </Card>

              {/* Card 3: Clarity → Execution */}
              <Card
                hoverable
                variant="raised"
                className="relative rounded-[18px] border transition-shadow duration-300
                           [--cnx-card-bg:#ffffff] /* Match section bg (lightened to white 2025-08-31) */
                           [--cnx-card-border:#e9e9e7] /* Soft border like reference */
                           [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)] /* Further reduced base (2025-08-31) */
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)] /* Slightly above base, still subtle */
                           hover:[--cnx-card-shadow-raised:0_6px_16px_rgba(0,0,0,.09),_0_20px_36px_rgba(0,0,0,.07)] /* Softer hover after reduction */">
                <div className="mb-5">
                  <div className="h-14 w-14 rounded-full bg-white border border-[#ececec]
                                  shadow-[0_1px_0_rgba(255,255,255,.85)_inset,0_8px_18px_rgba(0,0,0,.10),_0_1px_0_rgba(0,0,0,.04)] grid place-items-center">
                    <span aria-hidden className="text-neutral-800">✅</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black">Clarity → Execution</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  <span className="font-semibold">Rule:</span> Answers should become action.
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  <span className="font-semibold">Promise:</span> Turn a response into a task, checklist, or workflow in one click—citations and context travel with it, so work doesn’t get re-explained.
                </p>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature grid removed per request (2025-08-31) */}

      {/**
       * HOW IT WORKS
       * - Simple 3-step flow to explain ingestion → linking → answers
       */}
      {/* 2025-08-31: Increased vertical padding for more breathing room (taller section) */}
      <section id="how-it-works" className="px-6 py-36 md:py-40 bg-neutral-50 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              {/* Match Principles heading style (gradient, large sizes, font-medium) */}
              <h2 className="mt-4 text-[36px] md:text-[56px] lg:text-[72px] font-medium tracking-tight leading-none bg-gradient-to-b from-neutral-800 to-black text-transparent bg-clip-text">How it works</h2>
            </Reveal>
            <Reveal delay={0.05}>
              {/* Updated subtitle copy (2025-08-31) */}
              <p className="mt-3 text-neutral-700">CogNexus links human intelligence with AI—so your organization can think, decide, and act at scale.</p>
            </Reveal>
          </div>

          {/* Slightly larger top margin and gap for a calmer layout rhythm */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.15} direction="left" distance={20}>
              <Card
                hoverable
                variant="raised"
                className="relative w-full h-full rounded-[18px] border cursor-pointer transition-all duration-300 hover:-translate-y-0.5
                           [--cnx-card-bg:#ffffff]
                           [--cnx-card-border:#e9e9e7]
                           [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]
                           hover:[--cnx-card-shadow-raised:0_6px_16px_rgba(0,0,0,.09),_0_20px_36px_rgba(0,0,0,.07)]">
                {/* Step 1 copy updated to "Codify" (2025-08-31) */}
                <div className="p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">1) Codify</h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-700">Capture how your organization thinks. Principles, constraints, priorities, and expert judgment become explicit. CogNexus learns from decisions and corrections—not just content—so your intelligence is teachable and repeatable.</p>
                </div>
              </Card>
            </Reveal>
            <Reveal delay={0.3} direction="up" distance={16}>
              <Card
                hoverable
                variant="raised"
                className="relative h-full rounded-[18px] border transition-all duration-300 hover:-translate-y-0.5
                           [--cnx-card-bg:#ffffff]
                           [--cnx-card-border:#e9e9e7]
                           [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]
                           hover:[--cnx-card-shadow-raised:0_6px_16px_rgba(0,0,0,.09),_0_20px_36px_rgba(0,0,0,.07)]">
                {/* Step 2 copy updated to "Connect" (2025-08-31) */}
                <div className="p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">2) Connect</h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-700">AI structures your intelligence into a living model. Concepts, roles, and context are linked with provenance. Ambiguity is resolved, trade-offs are surfaced, and reasoning stays traceable.</p>
                </div>
              </Card>
            </Reveal>
            <Reveal delay={0.45} direction="right" distance={20}>
              <Card
                hoverable
                variant="raised"
                className="relative h-full rounded-[18px] border transition-all duration-300 hover:-translate-y-0.5
                           [--cnx-card-bg:#ffffff]
                           [--cnx-card-border:#e9e9e7]
                           [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]
                           hover:[--cnx-card-shadow-raised:0_6px_16px_rgba(0,0,0,.09),_0_20px_36px_rgba(0,0,0,.07)]">
                {/* Step 3 copy updated to "Decide & Operate" (2025-08-31) */}
                <div className="p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">3) Decide &amp; Operate</h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-700">From clarity to action. Ask in plain language to get options, rationale, and next steps you can execute. Every answer cites its sources and supports an I don’t know when confidence is low.</p>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/**
       * OUR PLATFORMS
       * - Replaces the single Forge highlight with a platforms grid
       * - Uses Cards for visual consistency with Principles/How it works
       */}
      {/* Elevate Platforms section prominence with taller vertical padding */}
      <section id="platforms" className="px-6 py-36 md:py-40 scroll-mt-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            {/* Small pill label to elevate section importance (matches Principles pill) */}
            <Reveal>
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e9e9e7] bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-700 shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_6px_14px_rgba(0,0,0,.06)]">
                <span aria-hidden className="text-[12px]">🚀</span>
                <span>PLATFORMS</span>
              </div>
            </Reveal>
            <Reveal>
              {/* Match Principles heading style (gradient, large sizes, font-medium) */}
              <h2 className="mt-4 text-[36px] md:text-[56px] lg:text-[72px] font-medium tracking-tight leading-none bg-gradient-to-b from-neutral-800 to-black text-transparent bg-clip-text">Our Platforms</h2>
            </Reveal>
            <Reveal delay={0.05}>
              {/* Stronger value-prop to drive exploration */}
              <p className="mt-3 text-neutral-700">Build decision-ready workflows on day one. Explore Forge to reduce rework, speed approvals, and make crews unstoppable.</p>
            </Reveal>
            {/* Benefit chips provide quick scannable reasons to click */}
            <Reveal delay={0.1}>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e9e9e7] bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-700 shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_6px_14px_rgba(0,0,0,.06)]">2‑min tour</span>
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e9e9e7] bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-700 shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_6px_14px_rgba(0,0,0,.06)]">Cited answers</span>
                {/* Highlight that Forge is chat-first */}
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e9e9e7] bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-700 shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_6px_14px_rgba(0,0,0,.06)]">Chat‑first</span>
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e9e9e7] bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-700 shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_6px_14px_rgba(0,0,0,.06)]">Built for crews</span>
              </div>
            </Reveal>
          </div>

          {/* Platforms grid: single column so each card is full width inside the container */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:gap-8">
            {/* Forge platform card */}
            <Reveal delay={0.15} direction="left" distance={20}>
              <Card
                hoverable
                variant="raised"
                className="relative w-full h-full rounded-[18px] border transition-all duration-300 hover:-translate-y-0.5
                           [--cnx-card-bg:#ffffff]
                           [--cnx-card-border:#e9e9e7]
                           [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]
                           hover:[--cnx-card-shadow-raised:0_6px_16px_rgba(0,0,0,.09),_0_20px_36px_rgba(0,0,0,.07)]">
                {/* Decorative top accent bar to draw attention without breaking the white aesthetic */}
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,.12)_30%,rgba(0,0,0,.12)_70%,rgba(0,0,0,0)_100%)]" />

                <div className="p-6 md:p-7">
                  {/* Two-column layout on md+ to introduce a visual screenshot placeholder while keeping text first for accessibility */}
                  <div className="grid gap-6 lg:gap-8 md:grid-cols-2 items-start">
                    {/* LEFT: Textual content block */}
                    <div>
                      {/* Icon orb for quick visual identity (echoes Principles orb style) */}
                      <div className="mb-5">
                        <div className="h-12 w-12 rounded-full bg-white border border-[#ececec]
                                    shadow-[0_1px_0_rgba(255,255,255,.85)_inset,0_8px_18px_rgba(0,0,0,.10),_0_1px_0_rgba(0,0,0,.04)] grid place-items-center">
                          <span aria-hidden className="text-neutral-800">🛠️</span>
                        </div>
                      </div>
                      {/* Stronger, specific title with a small status pill */}
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                        Forge — for Construction
                        <span className="ml-2 align-middle inline-flex items-center gap-1 rounded-full border border-[#e9e9e7] bg-white/90 px-2 py-0.5 text-[11px] font-medium text-neutral-700">
                          <span aria-hidden className="text-emerald-600">●</span>
                          Live
                        </span>
                      </h3>
                      {/* Punchier value-prop paragraph */}
                      <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-800">Put submittals, drawings, and T&amp;M on rails. Get precise answers with citations, keep meetings aligned, and move field work forward—fast.</p>

                      {/* Skimmable bullets emphasize chat-first workflows */}
                      <ul className="mt-4 space-y-2 text-sm md:text-base text-neutral-800">
                        <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">✓</span><span>Speak to drawings and specs — ask questions, get cited answers</span></li>
                        <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">✓</span><span>Submittal review — extract, validate, and flag issues fast</span></li>
                        <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">✓</span><span>Scope identification — surface gaps and change impacts</span></li>
                      </ul>

                      {/* Primary and secondary CTAs; stack on mobile for easier tapping */}
                      <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-3">
                        <Link href="/forge" aria-label="Get the 2-minute Forge tour">
                          <Button variant="primary">Get the 2‑min tour</Button>
                        </Link>
                        <Link href="/forge" aria-label="See Forge capabilities">
                          <Button variant="secondary">See capabilities →</Button>
                        </Link>
                      </div>
                      {/* Micro-trust copy to reduce friction */}
                      <p className="mt-2 text-xs text-neutral-500">2‑min tour. No sales call.</p>
                    </div>

                    {/* RIGHT: Screenshot placeholder block (keeps white surface, subtle border, and soft shadow for consistency) */}
                    <div className="relative">
                      {/* Frame: white rounded container with soft border/shadow to echo card tokens */}
                      <div className="rounded-[14px] border border-[#e9e9e7] bg-white overflow-hidden
                                  shadow-[0_1px_0_rgba(255,255,255,.92)_inset,0_10px_22px_rgba(0,0,0,.08),_0_1px_0_rgba(0,0,0,.03)]">
                        {/* Aspect box for consistent preview sizing; swap with real image later */}
                        <div className="relative aspect-[16/10] bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.04))]">
                          {/* Top-left chip to label the area as a preview */}
                          <div className="absolute left-3 top-3 inline-flex items-center justify-center gap-2 rounded-full border border-[#e9e9e7] bg-white/90 px-2 py-0.5 text-[11px] font-medium text-neutral-700 shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_6px_14px_rgba(0,0,0,.06)]">
                            Preview
                          </div>
                          {/* Chat UI mock: alternating bubbles and an input bar to communicate chat-first UX */}
                          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col">
                            <div className="flex-1 overflow-hidden">
                              <div className="flex flex-col gap-2 text-[11px] sm:text-[12px]">
                                {/* User bubble */}
                                <div className="max-w-[85%] self-start rounded-2xl border border-[#e9e9e7] bg-white px-3 py-2 text-neutral-800 shadow-sm">Which spec covers intake dampers?</div>
                                {/* Assistant bubble */}
                                <div className="max-w-[85%] self-end rounded-2xl bg-neutral-900 text-white px-3 py-2 shadow-sm">Section 23 33 00 — Duct Accessories. See p.12. <span className="opacity-80">[cited]</span></div>
                                {/* User bubble */}
                                <div className="max-w-[85%] self-start rounded-2xl border border-[#e9e9e7] bg-white px-3 py-2 text-neutral-800 shadow-sm">Review Submittal 042. Any issues?</div>
                                {/* Assistant bubble */}
                                <div className="max-w-[85%] self-end rounded-2xl bg-neutral-900 text-white px-3 py-2 shadow-sm">2 items flagged: missing cut‑sheet refs; out‑of‑spec fasteners.</div>
                                {/* User bubble */}
                                <div className="max-w-[85%] self-start rounded-2xl border border-[#e9e9e7] bg-white px-3 py-2 text-neutral-800 shadow-sm">Identify scope gaps for Level 3.</div>
                                {/* Assistant bubble */}
                                <div className="max-w-[85%] self-end rounded-2xl bg-neutral-900 text-white px-3 py-2 shadow-sm">Potential gap: demo of existing dampers not included.</div>
                              </div>
                            </div>
                            {/* Input bar mock */}
                            <div className="mt-3 rounded-full border border-[#e9e9e7] bg-white px-3 py-2 text-[11px] text-neutral-500 flex items-center gap-2 shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_6px_14px_rgba(0,0,0,.06)]">
                              <span className="text-neutral-400">Ask Forge about your drawing, spec, or submittal…</span>
                              <span aria-hidden>🎤</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>

            {/* Placeholder platform card A */}
            <Reveal delay={0.25} direction="up" distance={16}>
              <Card
                hoverable
                variant="raised"
                className="relative w-full h-full rounded-[18px] border transition-all duration-300 hover:-translate-y-0.5
                           [--cnx-card-bg:#ffffff]
                           [--cnx-card-border:#e9e9e7]
                           [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]
                           hover:[--cnx-card-shadow-raised:0_6px_16px_rgba(0,0,0,.09),_0_20px_36px_rgba(0,0,0,.07)]">
                <div className="p-6 md:p-7">
                  {/* De-emphasized placeholder with an explicit Coming soon pill */}
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                    Platform
                    <span className="ml-2 align-middle inline-flex items-center gap-1 rounded-full border border-[#e9e9e7] bg-white/90 px-2 py-0.5 text-[11px] font-medium text-neutral-700">Coming soon</span>
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-700">Additional purpose-built experiences are on the way. Stay tuned.</p>
                  <div className="mt-5">
                    <a className="inline-flex" href="mailto:hello@cognexus.io?subject=Platforms%20Waitlist" aria-label="Join the platforms waitlist via email">
                      <Button variant="secondary">Join waitlist</Button>
                    </a>
                  </div>
                </div>
              </Card>
            </Reveal>

            {/* Placeholder platform card B */}
            <Reveal delay={0.35} direction="right" distance={20}>
              <Card
                hoverable
                variant="raised"
                className="relative w-full h-full rounded-[18px] border transition-all duration-300 hover:-translate-y-0.5
                           [--cnx-card-bg:#ffffff]
                           [--cnx-card-border:#e9e9e7]
                           [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]
                           hover:[--cnx-card-shadow-raised:0_6px_16px_rgba(0,0,0,.09),_0_20px_36px_rgba(0,0,0,.07)]">
                <div className="p-6 md:p-7">
                  {/* De-emphasized placeholder with an explicit Coming soon pill */}
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                    Platform
                    <span className="ml-2 align-middle inline-flex items-center gap-1 rounded-full border border-[#e9e9e7] bg-white/90 px-2 py-0.5 text-[11px] font-medium text-neutral-700">Coming soon</span>
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-700">We are expanding the suite to new verticals and workflows.</p>
                  <div className="mt-5">
                    <a className="inline-flex" href="mailto:hello@cognexus.io?subject=Platforms%20Waitlist" aria-label="Join the platforms waitlist via email">
                      <Button variant="secondary">Join waitlist</Button>
                    </a>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/**
       * TRUST
       * - Security/privacy positioning with explicit promises and specifics
       * - Matches section title styling used across the page (gradient heading)
       * - Cards keep the simplified white aesthetic (white bg, subtle borders/shadows)
       */}
      <section id="trust" className="px-6 py-24 scroll-mt-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              {/* Match Principles heading style (gradient, large sizes, font-medium) */}
              <h2 className="mt-4 text-[36px] md:text-[56px] lg:text-[72px] font-medium tracking-tight leading-none bg-gradient-to-b from-neutral-800 to-black text-transparent bg-clip-text">Trust</h2>
            </Reveal>
            <Reveal delay={0.05}>
              {/* Subhead communicates private-by-default and no-training promise */}
              <p className="mt-3 text-neutral-700">Your data stays yours. Private by default. Never used to train our models—unlike many competitors.</p>
            </Reveal>
          </div>

          {/* Grid of trust cards: 1 col on mobile, 2 on md, 3 on lg to accommodate 6 items cleanly */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Privacy-first */}
            <Reveal delay={0.1} direction="left" distance={20}>
              <Card
                hoverable
                variant="raised"
                className="rounded-[18px] border [--cnx-card-bg:#ffffff] [--cnx-card-border:#e9e9e7] [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]">
                <div className="p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">Privacy-first</h3>
                  <p className="mt-2 text-sm md:text-base text-neutral-800">Your data. Your rules.</p>
                  <ul className="mt-3 space-y-2 text-sm md:text-base text-neutral-700">
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Workspace isolation with role-based access.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Granular source scoping per question.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>No data selling, no sharing, no “improve our model” toggle.</span></li>
                  </ul>
                </div>
              </Card>
            </Reveal>

            {/* Provenance & Audit */}
            <Reveal delay={0.2} direction="up" distance={16}>
              <Card
                hoverable
                variant="raised"
                className="rounded-[18px] border [--cnx-card-bg:#ffffff] [--cnx-card-border:#e9e9e7] [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]">
                <div className="p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">Provenance &amp; Audit</h3>
                  <p className="mt-2 text-sm md:text-base text-neutral-800">Answers with receipts.</p>
                  <ul className="mt-3 space-y-2 text-sm md:text-base text-neutral-700">
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Every response cites the exact source (page/section/version).</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Immutable answer logs with timestamps; inputs/outputs redacted for privacy.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Reproducible mode: same inputs → same answer signature.</span></li>
                  </ul>
                </div>
              </Card>
            </Reveal>

            {/* Enterprise-ready */}
            <Reveal delay={0.3} direction="right" distance={20}>
              <Card
                hoverable
                variant="raised"
                className="rounded-[18px] border [--cnx-card-bg:#ffffff] [--cnx-card-border:#e9e9e7] [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]">
                <div className="p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">Enterprise-ready</h3>
                  <p className="mt-2 text-sm md:text-base text-neutral-800">Built for security-critical teams.</p>
                  <ul className="mt-3 space-y-2 text-sm md:text-base text-neutral-700">
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>SSO/OIDC, role-based permissions, least-privilege by default.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Fine-grained API keys and event logging.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Flexible deployment options to align with your security posture.</span></li>
                  </ul>
                </div>
              </Card>
            </Reveal>

            {/* No Training on Your Data */}
            <Reveal delay={0.4} direction="left" distance={20}>
              <Card
                hoverable
                variant="raised"
                className="rounded-[18px] border [--cnx-card-bg:#ffffff] [--cnx-card-border:#e9e9e7] [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]">
                <div className="p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">No Training on Your Data</h3>
                  <p className="mt-2 text-sm md:text-base text-neutral-800">We don’t learn from your data. We answer with it.</p>
                  <ul className="mt-3 space-y-2 text-sm md:text-base text-neutral-700">
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Your content is never used to train foundation models or shared to improve third-party systems.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Processing is purpose-bound to your queries and features you enable.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Opt-out isn’t required—this is the default.</span></li>
                  </ul>
                </div>
              </Card>
            </Reveal>

            {/* Encryption & Key Management (optional) */}
            <Reveal delay={0.5} direction="up" distance={16}>
              <Card
                hoverable
                variant="raised"
                className="rounded-[18px] border [--cnx-card-bg:#ffffff] [--cnx-card-border:#e9e9e7] [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]">
                <div className="p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">Encryption &amp; Key Management</h3>
                  <p className="mt-2 text-sm md:text-base text-neutral-800">Locked in transit and at rest.</p>
                  <ul className="mt-3 space-y-2 text-sm md:text-base text-neutral-700">
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>TLS in transit; encrypted storage at rest.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Customer-controlled retention windows.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Bring-your-own-keys or provider-managed keys (configure per workspace).</span></li>
                  </ul>
                </div>
              </Card>
            </Reveal>

            {/* Data Ownership & Portability */}
            <Reveal delay={0.6} direction="right" distance={20}>
              <Card
                hoverable
                variant="raised"
                className="rounded-[18px] border [--cnx-card-bg:#ffffff] [--cnx-card-border:#e9e9e7] [--cnx-card-radius:18px]
                           [--cnx-card-shadow:0_3px_10px_rgba(0,0,0,.07),_0_12px_24px_rgba(0,0,0,.05),_0_1px_0_rgba(0,0,0,.02)]
                           [--cnx-card-shadow-raised:0_5px_14px_rgba(0,0,0,.08),_0_18px_32px_rgba(0,0,0,.06),_0_1px_0_rgba(0,0,0,.02)]">
                <div className="p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">Data Ownership &amp; Portability</h3>
                  <p className="mt-2 text-sm md:text-base text-neutral-800">You own it. You can take it with you.</p>
                  <ul className="mt-3 space-y-2 text-sm md:text-base text-neutral-700">
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Full export of your corpus, connections/graph, and answer logs on request.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Retention controls and hard-delete (cryptographic erasure) with deletion receipts.</span></li>
                    <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5">•</span><span>Clear DPA and subprocessors list; portability if you ever leave CogNexus.</span></li>
                  </ul>
                </div>
              </Card>
            </Reveal>
          </div>

          {/* Micro-trust line reinforces core promises beneath the grid */}
          <div className="mt-6 text-center">
            <p className="text-xs md:text-sm text-neutral-500">Private by default • Answers cite sources • Your data is never used to train our models</p>
          </div>
        </div>
      </section>

      {/**
       * FINAL CTA
       * - Solid white background per request for clarity and separation
       */}
      <section id="cta" className="px-6 py-24 scroll-mt-24 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            {/* Match Principles heading style (gradient, large sizes, font-medium) */}
            <h2 className="mt-4 text-[36px] md:text-[56px] lg:text-[72px] font-medium tracking-tight leading-none bg-gradient-to-b from-neutral-800 to-black text-transparent bg-clip-text">Bring decision-ready answers to your team</h2>
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
      </div>
    </main>
    </MotionConfig>
  );
}

// This code creates a modern, animated home page for CogNexus.io with a hero section,
// feature cards for Platform Vision and Forge, and primary/secondary call to action buttons.
// It uses Framer Motion for animations and Tailwind CSS for styling.
