"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll
 *
 * Globally enables slow, elastic, Orb-like scrolling using Lenis for wheel/touch scroll.
 * For in-page hash links (e.g., href="#features"), we intercept and call lenis.scrollTo
 * so the same inertia and sticky-offset logic applies.
 *
 * Implementation details:
 * - Delegated click listener on document to capture anchor clicks anywhere in the app.
 * - If the link href starts with '#', prevent default and smoothly scroll to the element ID.
 * - After scrolling, push the hash into the URL so back/forward works as expected.
 * - On initial page load with an existing hash, also smooth-scroll into position.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Default offset if element doesn't define a scroll-margin-top
    const DEFAULT_OFFSET = 96; // matches Tailwind scroll-mt-24 (6rem)

    // Initialize Lenis for inertia-based smooth scrolling across the entire page.
    // This creates the floaty, elastic feel similar to Orb.
    const lenis = new Lenis({
      // Duration is a baseline; actual motion is eased by the function below.
      duration: 1.25, // seconds; bump up for slower glide
      // Elastic/floaty ease-out curve (expo-ish) for satisfying settle.
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    });

    // Tie Lenis into the browser's RAF loop so it can smoothly control scroll.
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const smoothScrollTo = (el: HTMLElement) => {
      // Prefer the element's own scroll-margin-top for accuracy across breakpoints
      const styles = window.getComputedStyle(el);
      const smtStr = styles.getPropertyValue('scroll-margin-top');
      const smt = parseFloat(smtStr || '0');
      const offset = Number.isFinite(smt) && smt > 0 ? smt : DEFAULT_OFFSET;
      // Use Lenis to scroll to the element, applying a negative offset to account for sticky nav
      lenis.scrollTo(el, {
        offset: -offset,
        // Keep the timing consistent with our global feel
        duration: 1.2,
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      });
    };

    const handleClick = (e: MouseEvent) => {
      // Ignore modified clicks or non-left clicks (open in new tab, etc.)
      if ((e as MouseEvent).defaultPrevented) return;
      if ((e as MouseEvent).button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // Find nearest <a> ancestor that contains a hash in its href
      const anchor = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href*="#"]'
      );
      if (!anchor) return;

      // Use the absolute href (anchor.href) so we can parse reliably
      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return; // invalid URL, ignore
      }

      // Only intercept same-origin & same-path links (in-page anchors)
      if (url.origin !== location.origin) return;
      if (url.pathname !== location.pathname) return;

      const id = decodeURIComponent(url.hash.replace(/^#/, ""));
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      // Prevent default jump, perform smooth scroll instead
      e.preventDefault();
      smoothScrollTo(el);

      // Update URL hash without full navigation
      history.pushState(null, "", `#${id}`);
    };

    const scrollToCurrentHash = () => {
      if (!location.hash) return;
      const id = decodeURIComponent(location.hash.replace(/^#/, ""));
      const el = document.getElementById(id);
      if (!el) return;
      // Delay to ensure layout is ready (e.g., fonts, images, nav height)
      setTimeout(() => {
        smoothScrollTo(el);
      }, 0);
    };

    // Capture phase ensures we intercept before framework handlers (e.g., Next Link)
    document.addEventListener("click", handleClick, true);
    // Smooth scroll if the page was loaded with a hash
    scrollToCurrentHash();
    // Also smooth scroll whenever the hash changes (e.g., Next Link triggers pushState)
    window.addEventListener('hashchange', scrollToCurrentHash);
    window.addEventListener('popstate', scrollToCurrentHash);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener('hashchange', scrollToCurrentHash);
      window.removeEventListener('popstate', scrollToCurrentHash);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // This component renders nothing; it only installs global listeners.
  return null;
}
