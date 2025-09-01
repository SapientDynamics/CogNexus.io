import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Hammer, ShieldCheck, LineChart, Workflow, Building2, ChevronRight, Eye, EyeOff, Lock } from "lucide-react";

// Forge Auth – Steel/Construction Palette
// Palette
// - Gunmetal background: #1C1E22
// - Steel gray: #6E7681
// - Concrete card: #F4F4F2
// - Blueprint blue: #2D6AA0
// - Safety orange (primary CTA): #FF6B35 (hover #E65A28)
// - Charcoal text: #1C1E22

export default function ForgeAuthElevated() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const companyHint = useMemo(() => {
    const at = email.indexOf("@");
    if (at === -1) return "Use your work email";
    const domain = email.slice(at + 1).trim();
    if (!domain) return "Use your work email";
    return `We’ll connect you to ${domain} if it’s already on CogNexus`;
  }, [email]);

  const passwordScore = useMemo(() => strength(password), [password]);

  return (
    <div className="min-h-screen bg-[#1C1E22] text-white relative overflow-hidden">
      <Header />
      <BackgroundFX />

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Auth Card */}
        <Card className="rounded-2xl shadow-2xl border border-white/10 bg-[#F4F4F2] text-[#1C1E22]">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{mode === "signin" ? "Enter Forge" : "Create Access"}</h1>
                <p className="text-sm text-[#6E7681]">Unified Intelligence for Construction</p>
              </div>
              <Badge className="bg-[#E8E8E6] text-[#1C1E22] text-xs border border-[#D8D8D6]">Beta</Badge>
            </div>

            {/* Segmented control */}
            <div className="grid grid-cols-2 rounded-xl p-1 mb-5 border border-[#D8D8D6] bg-[#EDEDEA]">
              <button
                onClick={() => setMode("signin")}
                className={`text-sm rounded-lg py-2 transition ${mode === "signin" ? "bg-white text-[#1C1E22] shadow" : "text-[#6E7681] hover:text-[#1C1E22]"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`text-sm rounded-lg py-2 transition ${mode === "signup" ? "bg-white text-[#1C1E22] shadow" : "text-[#6E7681] hover:text-[#1C1E22]"}`}
              >
                Create Account
              </button>
            </div>

            {/* SSO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              <Button type="button" variant="secondary" className="w-full bg-white text-[#1C1E22] border border-[#D8D8D6] hover:bg-[#F7F7F6]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" aria-hidden>
                  <path d="M0 12a12 12 0 1 1 12 12V12H0Z" fill="#F25022"/>
                  <path d="M12 0a12 12 0 0 1 12 12H12V0Z" fill="#7FBA00"/>
                  <path d="M24 12a12 12 0 0 1-12 12V12h12Z" fill="#FFB900"/>
                  <path d="M12 24A12 12 0 0 1 0 12h12v12Z" fill="#00A4EF"/>
                </svg>
                Continue with Microsoft
              </Button>
              <Button type="button" variant="secondary" className="w-full bg-white text-[#1C1E22] border border-[#D8D8D6] hover:bg-[#F7F7F6]">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3" aria-hidden>
                  <path d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272v95.2h146.9c-6.3 34-25.3 62.7-54 82v68h86.9c50.8-46.8 81.7-115.8 81.7-194.9z"/>
                  <path d="M272 544.3c73.9 0 136.1-24.5 181.5-66.6l-86.9-68c-24.1 16.1-55 25.7-94.6 25.7-72.7 0-134.3-49.1-156.3-115.1H25.5v72.2C71 493.7 165.2 544.3 272 544.3z"/>
                  <path d="M115.7 320.3c-10.5-31.4-10.5-65.5 0-96.9V151.2H25.5c-42.1 83.5-42.1 182.6 0 266.1l90.2-96.9z"/>
                  <path d="M272 107.7c40.2-.6 78.8 14.7 108.3 42.7l81.3-81.3C404.4-6.2 332.2-17.5 272 17.5 165.2 17.5 71 68.1 25.5 178.4l90.2 72.2C137.7 156.8 199.3 107.7 272 107.7z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            {/* Divider chip */}
            <div className="relative my-5">
              <Separator className="bg-[#D8D8D6]" />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 text-xs text-[#6E7681] bg-[#F4F4F2] border border-[#D8D8D6] rounded-full">
                or continue with email
              </span>
            </div>

            {/* Email form */}
            <form className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-sm text-[#495059]">Full name</label>
                  <Input placeholder="Jane Doe" className="bg-white border border-[#D8D8D6] text-[#1C1E22] placeholder:text-[#8A8F95]" />
                </div>
              )}
              <div>
                <label className="text-sm text-[#495059]">Work email</label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-[#D8D8D6] text-[#1C1E22] placeholder:text-[#8A8F95]"
                />
                <p className="text-[11px] text-[#6E7681] mt-1">{companyHint}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-[#495059]">Password</label>
                  {mode === "signin" ? (
                    <a className="text-xs text-[#6E7681] hover:text-[#1C1E22]" href="#">Forgot?</a>
                  ) : null}
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={mode === "signup" ? "Create a strong password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 bg-white border border-[#D8D8D6] text-[#1C1E22] placeholder:text-[#8A8F95]"
                  />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-[#6E7681] hover:text-[#1C1E22]">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === "signup" && <PasswordMeter score={passwordScore} />}
              </div>

              {mode === "signup" && (
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" className="border-[#A7ACB1] data-[state=checked]:bg-[#1C1E22] data-[state=checked]:text-white" />
                  <label htmlFor="terms" className="text-xs text-[#495059]">
                    I agree to the <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
                  </label>
                </div>
              )}

              <Button className="w-full group bg-[#FF6B35] text-white hover:bg-[#E65A28]">
                {mode === "signin" ? (
                  <span className="inline-flex items-center">
                    <Lock className="w-4 h-4 mr-2" /> Enter Forge <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </span>
                ) : (
                  <span className="inline-flex items-center">Create Access <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" /></span>
                )}
              </Button>

              <p className="text-center text-sm text-[#495059]">
                {mode === "signin" ? (
                  <>New here? <button type="button" className="underline" onClick={() => setMode("signup")}>Create account</button></>
                ) : (
                  <>Already have access? <button type="button" className="underline" onClick={() => setMode("signin")}>Sign in</button></>
                )}
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Brand Pillars / Right Panel */}
        <aside className="hidden lg:flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F1418] text-white border border-white/10 text-xs tracking-wide">
                <span className="font-semibold">FORGE</span>
                <span className="opacity-70">with the power of CogNexus</span>
              </span>
            </div>
            <h2 className="text-3xl font-semibold leading-tight mb-2">Clarity. Foresight. Confidence.</h2>
            <p className="text-white/80 mb-6 max-w-md">One system that turns drawings, specs, and field chatter into decision-ready intelligence for builders.</p>

            <ul className="grid grid-cols-2 gap-3 max-w-xl">
              <Feature icon={<Hammer className="w-4 h-4" />} title="T&M Tracking" caption="Log labor, materials, and photos." />
              <Feature icon={<Workflow className="w-4 h-4" />} title="Pull Planning" caption="Forecast work & risks." />
              <Feature icon={<LineChart className="w-4 h-4" />} title="Trends" caption="Spot delays before they bite." />
              <Feature icon={<Building2 className="w-4 h-4" />} title="Meetings" caption="Record, summarize, distribute." />
            </ul>
          </div>

          <div className="flex items-center gap-3 text-white/70 mt-10">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs">Secure by default. SSO-ready. Encrypted in transit.</span>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="relative z-10 bg-[#1C1E22]/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-wide">FORGE</span>
          <span className="text-xs text-white/70 border border-white/20 rounded-full px-2 py-0.5">With the power of CogNexus</span>
        </div>
        <nav className="hidden sm:flex items-center gap-5 text-sm text-white/80">
          <a href="#" className="hover:text-white">UI Demo</a>
          <a href="#" className="hover:text-white inline-flex items-center gap-1">Main Platform</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 py-8 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} CogNexus</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Status</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Help</a>
        </div>
      </div>
    </footer>
  );
}

function Feature({ icon, title, caption }: { icon: React.ReactNode; title: string; caption: string }) {
  return (
    <li className="flex items-start gap-3 p-3 rounded-xl bg-[#0F1418] text-white border border-white/10">
      <div className="p-2 rounded-lg bg-white/10">{icon}</div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-white/70">{caption}</div>
      </div>
    </li>
  );
}

function PasswordMeter({ score }: { score: number }) {
  const labels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];
  const widths = ["w-1/12","w-3/12","w-6/12","w-9/12","w-full"];
  return (
    <div className="mt-2">
      <div className="h-1.5 w-full bg-[#E0E0DE] rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${widths[Math.max(0, Math.min(score, 4))]} bg-gradient-to-r from-[#2D6AA0] via-[#5C8FBE] to-[#9DB9D6]`}
        />
      </div>
      <div className="text-[11px] text-[#6E7681] mt-1">{labels[Math.max(0, Math.min(score, 4))]}</div>
    </div>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Brushed steel vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.00) 60%)"
      }} />

      {/* Blueprint grid in muted blue */}
      <motion.div
        className="absolute inset-0 opacity-25"
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "120px 60px", "0px 0px"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(45,106,160,0.25) 24px)," +
            "repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(45,106,160,0.25) 24px)",
        }}
      />

      {/* Soft blueprint-blue auras */}
      <div className="absolute -top-32 -left-24 w-[40rem] h-[40rem] rounded-full" style={{background:"radial-gradient(circle, rgba(45,106,160,0.18) 0%, rgba(45,106,160,0) 60%)"}} />
      <div className="absolute top-1/3 -right-32 w-[46rem] h-[46rem] rounded-full" style={{background:"radial-gradient(circle, rgba(158,170,180,0.16) 0%, rgba(158,170,180,0) 60%)"}} />
    </div>
  );
}

function strength(pw: string) {
  let s = 0;
  if (!pw) return 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(4, Math.max(0, s - 1));
}
