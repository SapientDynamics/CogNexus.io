"use client";

import React from "react";

/**
 * Forge Auth Page (Sign In / Create Account)
 *
 * Design goals from spec:
 * - Background: gunmetal #1C1E22 with a subtle blueprint grid in muted #2D6AA0 (low opacity)
 *   plus a soft radial vignette. Implemented via layered CSS gradients.
 * - Form card: cool concrete #EEEFF1 with 1px steel border #D7DADF and soft outer shadow.
 * - Text colors: primary body text #1C1E22; labels/helper/placeholder #5B636D for clarity.
 * - Inputs: white background, #D7DADF borders, placeholders #5B636D, strong focus outlines preserved.
 * - Password toggle icon and helper text: #5B636D for consistency.
 * - SSO buttons: neutral white background, #D7DADF border, hover to #F7F8F9.
 * - Segmented control (Sign In / Create Account): sits on a white base. The active tab appears
 *   “pressed” with #EEEFF1 background, #1C1E22 text, and a light shadow; inactive uses #5B636D
 *   text that shifts to #1C1E22 on hover.
 * - Divider chip: centered over divider with #EEEFF1 background, #5B636D text, and #D7DADF border.
 * - Primary CTA: safety orange #FF6B35 (hover #E65A28) across both modes.
 * - Right-panel content: maintain feature pills on dark #0F1418 with a light border and white text.
 * - Mobile: center the card and hide the right panel on small screens.
 * - Accessibility: ensure AA contrast on labels/placeholders and keep visible focus outlines.
 */

// Small utility icon for password visibility, intentionally simple and tinted via className.
function IconEye({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Feature pill used in the right panel. Kept minimal for scannability.
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-[#0F1418] px-3 py-1 text-sm text-white/90">
      {children}
    </span>
  );
}

export default function AuthPage() {
  // Initialize the active tab from the URL query string for deep-linking.
  // Accepts ?mode=signup or ?mode=signin (default). This enables external CTAs
  // like "Create Your Nexus" to land directly on the Create Account view.
  // We avoid useSearchParams() to keep types compatible and instead read from
  // window.location in a guarded helper (so SSR/hydration doesn't break).
  const getInitialMode = (): "signin" | "signup" => {
    // During SSR, window is undefined; default to signin. After mount, we sync.
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("mode") === "signup" ? "signup" : "signin";
    }
    return "signin";
  };

  // Use a lazy initializer so we only compute once on mount.
  const [mode, setMode] = React.useState<"signin" | "signup">(getInitialMode);
  const [showPassword, setShowPassword] = React.useState(false);

  // After mount, sync mode with the current URL to handle hydration and future
  // client-side navigations that might change the query string.
  React.useEffect(() => {
    const next = getInitialMode();
    if (next !== mode) setMode(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Layered background: solid gunmetal + blueprint grid (muted blue lines) + soft radial vignette.
  // Using inline styles keeps this page self-contained and avoids global CSS changes.
  const backgroundStyle: React.CSSProperties = {
    backgroundColor: "#1C1E22",
    backgroundImage: [
      // Blueprint grid: both axes, thin 1px lines every 40px, low opacity.
      "repeating-linear-gradient(0deg, rgba(45,106,160,0.12), rgba(45,106,160,0.12) 1px, transparent 1px, transparent 40px)",
      "repeating-linear-gradient(90deg, rgba(45,106,160,0.12), rgba(45,106,160,0.12) 1px, transparent 1px, transparent 40px)",
      // Soft radial vignette: darkens the edges slightly for depth.
      "radial-gradient(1200px 800px at 50% 40%, rgba(0,0,0,0.0), rgba(0,0,0,0.35))",
    ].join(", "),
    backgroundBlendMode: "normal, normal, multiply",
  };

  return (
    <main className="relative min-h-screen" style={backgroundStyle}>
      {/* Centered two-column layout. Left = auth card; Right = feature/context panel.
          On small screens we hide the right panel and center the card for focus. */}
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* LEFT: Auth Card */}
        <section className="mx-auto w-full max-w-md">
          {/* Segmented control container on white base per spec. */}
          <div className="mb-4 rounded-md bg-white p-1 shadow-sm">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={
                  "rounded px-3 py-2 text-sm font-semibold transition-colors " +
                  (mode === "signin"
                    ? "bg-[#EEEFF1] text-[#1C1E22] shadow-sm"
                    : "text-[#5B636D] hover:text-[#1C1E22]")
                }
                aria-pressed={mode === "signin"}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={
                  "rounded px-3 py-2 text-sm font-semibold transition-colors " +
                  (mode === "signup"
                    ? "bg-[#EEEFF1] text-[#1C1E22] shadow-sm"
                    : "text-[#5B636D] hover:text-[#1C1E22]")
                }
                aria-pressed={mode === "signup"}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Concrete card with steel border and soft shadow */}
          <div className="rounded-xl border border-[#D7DADF] bg-[#EEEFF1] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.20)]">
            {/* Header text uses body color per spec */}
            <h1 className="mb-1 text-2xl font-semibold leading-tight text-[#1C1E22]">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mb-6 text-sm text-[#5B636D]">
              {mode === "signin"
                ? "Access your projects and keep work moving."
                : "A few details to get you started."}
            </p>

            {/* SSO buttons: white bg, steel border, hover to near-white */}
            <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#D7DADF] bg-white px-3 py-2 text-sm font-medium text-[#1C1E22] transition-colors hover:bg-[#F7F8F9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6AA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEEFF1]"
              >
                {/* Placeholder icon circle for vendor mark */}
                <span className="h-4 w-4 rounded-full border border-[#D7DADF] bg-white" aria-hidden />
                Continue with Google
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#D7DADF] bg-white px-3 py-2 text-sm font-medium text-[#1C1E22] transition-colors hover:bg-[#F7F8F9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6AA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEEFF1]"
              >
                <span className="h-4 w-4 rounded-full border border-[#D7DADF] bg-white" aria-hidden />
                Continue with Microsoft
              </button>
            </div>

            {/* Divider with centered chip */}
            <div className="relative my-6">
              <div className="h-px w-full bg-[#D7DADF]" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#D7DADF] bg-[#EEEFF1] px-3 py-0.5 text-xs font-medium text-[#5B636D]">
                or continue with email
              </span>
            </div>

            {/* Form fields; inputs remain white with steel borders and accessible focus outlines. */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Email field */}
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#5B636D]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-[#D7DADF] bg-white px-3 py-2 text-[15px] text-[#1C1E22] placeholder-[#5B636D] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#2D6AA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEEFF1]"
                />
              </div>

              {/* Conditionally render Name for signup */}
              {mode === "signup" && (
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#5B636D]">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Builder"
                    className="w-full rounded-md border border-[#D7DADF] bg-white px-3 py-2 text-[15px] text-[#1C1E22] placeholder-[#5B636D] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#2D6AA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEEFF1]"
                  />
                </div>
              )}

              {/* Password with visibility toggle */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-[#5B636D]">
                    Password
                  </label>
                  {mode === "signin" && (
                    <a href="#" className="text-xs font-medium text-[#5B636D] hover:text-[#1C1E22]">
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder={mode === "signin" ? "Your password" : "Create a strong password"}
                    className="w-full rounded-md border border-[#D7DADF] bg-white px-3 py-2 pr-10 text-[15px] text-[#1C1E22] placeholder-[#5B636D] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#2D6AA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEEFF1]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v: boolean) => !v)}
                    className="absolute inset-y-0 right-2 inline-flex items-center justify-center rounded p-1 text-[#5B636D] hover:text-[#1C1E22] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6AA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEEFF1]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <IconEye className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-[#5B636D]">
                  {mode === "signin"
                    ? "Use your work email to sign in."
                    : "Password must be at least 8 characters."}
                </p>
              </div>

              {/* Primary CTA with safety orange */}
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#FF6B35] px-4 py-2.5 text-[15px] font-semibold text-white shadow hover:bg-[#E65A28] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6AA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEEFF1]"
              >
                {mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>
          </div>
        </section>

        {/* RIGHT: Feature/context panel (hidden on small screens). */}
        <aside className="hidden lg:flex">
          <div className="w-full">
            {/* Keep content light and supportive. */}
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white">
              Built for the field.
            </h2>
            <p className="mb-6 max-w-md text-white/80">
              Keep teams aligned and documents moving. Forge brings decision-ready answers to your jobsite.
            </p>
            <div className="flex flex-wrap gap-2">
              <Pill>Pull Planning</Pill>
              <Pill>Submittals</Pill>
              <Pill>RFIs</Pill>
              <Pill>Field Notes</Pill>
              <Pill>Transmittals</Pill>
              <Pill>Document Control</Pill>
              <Pill>Closeout</Pill>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
