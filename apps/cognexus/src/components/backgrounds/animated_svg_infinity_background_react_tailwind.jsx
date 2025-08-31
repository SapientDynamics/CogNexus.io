"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * AnimatedInfinityBackground (slower, expressive version)
 *
 * Motion slowed for a calmer, more elegant feel.
 */
export default function AnimatedInfinityBackground({
  className = "",
  lineColor = "#000000",
  opacity = 0.18,
  density = 7,
  morph = true,
  modeCycleSeconds = 16, // longer linger on each shape
}: {
  className?: string;
  lineColor?: string;
  opacity?: number;
  density?: number;
  morph?: boolean;
  modeCycleSeconds?: number;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [time, setTime] = useState(0);
  const [reduced, setReduced] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Respect reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Drive the animation
  useEffect(() => {
    if (reduced) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setTime((t) => t + dt * 0.0005); // slower evolution
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  const vb = { w: 1400, h: 900, cx: 700, cy: 450 };

  const MODES = [
    { fx: 1, fy: 2, sx: 0.34, sy: 0.24 },
    { fx: 1, fy: 3, sx: 0.36, sy: 0.22 },
    { fx: 2, fy: 3, sx: 0.32, sy: 0.26 },
    { fx: 3, fy: 5, sx: 0.30, sy: 0.28 },
  ];

  const smoothstep = (t: number) => t * t * (3 - 2 * t);

  const getBlendParams = (t: number) => {
    const T = modeCycleSeconds;
    const total = MODES.length;
    const s = t / T;
    const idx = Math.floor(s) % total;
    const next = (idx + 1) % total;
    const frac = smoothstep((s % 1));
    const a = MODES[idx];
    const b = MODES[next];
    return {
      fx: a.fx * (1 - frac) + b.fx * frac,
      fy: a.fy * (1 - frac) + b.fy * frac,
      sx: a.sx * (1 - frac) + b.sx * frac,
      sy: a.sy * (1 - frac) + b.sy * frac,
      rot: 0.05 * Math.sin(t * 0.15), // slower rotation
    };
  };

  const makePath = (phase = 0, amp = 1, speed = 1) => {
    const N = 380;
    const pts: [number, number][] = [];
    const p = getBlendParams(time);
    const ax = vb.w * p.sx * amp;
    const ay = vb.h * p.sy * amp;

    for (let i = 0; i <= N; i++) {
      const u = (i / N) * Math.PI * 2;
      let x = Math.sin(p.fx * (u + phase + time * 0.12 * speed));
      let y = Math.sin(p.fy * (u + phase + time * 0.13 * speed) + Math.PI / 2);

      if (morph) {
        x += 0.028 * Math.sin(3 * u + time * 0.6 + phase * 1.3);
        y += 0.024 * Math.cos(4 * u + time * 0.55 + phase * 1.1);
      }

      const cosr = Math.cos(p.rot);
      const sinr = Math.sin(p.rot);
      const rx = x * cosr - y * sinr;
      const ry = x * sinr + y * cosr;

      pts.push([vb.cx + rx * ax, vb.cy + ry * ay]);
    }

    const [x0, y0] = pts[0];
    let d = `M ${x0.toFixed(2)} ${y0.toFixed(2)}`;
    for (let i = 1; i < pts.length; i++) {
      const [x, y] = pts[i];
      d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  };

  const layers = useMemo(() => {
    return new Array(density).fill(0).map((_, i) => {
      const tPhase = (i / Math.max(1, density - 1)) * Math.PI * 0.8;
      const amp = 1 + (i - (density - 1) / 2) * 0.035;
      const speed = 0.7 + i * 0.12; // slower parallax speeds
      return { d: makePath(tPhase, amp, speed), i, speed };
    });
  }, [density, time, morph, modeCycleSeconds]);

  const dashBase = 22;

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        role="img"
        aria-label="Animated network lines forming an evolving figure"
      >
        <defs>
          <radialGradient id="fade" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
          </radialGradient>
          <mask id="edgeMask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill="#ffffff" />

        <g mask="url(#edgeMask)">
          <circle cx={vb.cx} cy={vb.cy} r={vb.w * 0.22} fill="url(#fade)" />

          {layers.map(({ d }, idx) => (
            <path
              key={idx}
              d={d}
              fill="none"
              stroke={lineColor}
              strokeOpacity={Math.max(0.1, opacity - idx * 0.012)}
              strokeWidth={1.4 + idx * 0.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: `${dashBase + idx * 6} ${(dashBase + idx * 6) * 1.5}`,
                strokeDashoffset: (time * 240 * (1 + idx * 0.12)) % 4000,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
