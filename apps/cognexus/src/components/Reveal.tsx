"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Reveal
 * A small utility component that animates its children when they enter the viewport.
 *
 * This mirrors the subtle, tasteful scroll-based reveals seen in Orb.
 * It uses Framer Motion "whileInView" so no manual IntersectionObserver is needed.
 *
 * Props allow tuning direction, distance, delay, and duration per instance.
 * The viewport option is set to `{ once: true }` so each element animates only the first time.
 */
export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Direction from which the element enters. */
  direction?: "up" | "down" | "left" | "right";
  /** Pixel distance for the initial offset. */
  distance?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay in seconds before the animation starts. */
  delay?: number;
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  direction = "up",
  distance = 24,
  // Increase default duration for a slower, more luxurious slide (Orb-like)
  duration = 0.85,
  delay = 0,
}) => {
  // Compute initial offset based on direction for a gentle slide + fade.
  const initial = {
    opacity: 0,
    // For horizontal motion, make "left" originate from the left side (negative x)
    // and "right" originate from the right side (positive x).
    x: direction === "left" ? -distance : direction === "right" ? distance : 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
  } as const;

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1], // smooth cubic bezier like Orb
    },
  } as const;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      // Trigger later in the scroll so items wait until they're more in view.
      // amount: 0.65 means ~65% of the element must be visible before animating.
      viewport={{ once: true, amount: 0.65 }}
    >
      {children}
    </motion.div>
  );
};
