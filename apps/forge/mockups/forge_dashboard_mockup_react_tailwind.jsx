import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Workflow,
  FileText,
  ClipboardList,
  HardHat,
  BookOpen,
  Lightbulb,
  MessageSquare,
  FileSearch,
  ChevronDown,
  Plus,
  Filter,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";

// ------------------------------------------------------------
// Forge – Industrial Command Deck (Enhanced)
// - Thin orange progress rail under top bar
// - Improved top bar style + interactive project dropdown
// - Collapsible sidebar button
// - Modular panels (Documents, Planning, Requests, Knowledge & Safety)
// ------------------------------------------------------------

export default function ForgeDashboardCommandDeck() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);

  const projects = useMemo(
    () => [
      { id: "p1", name: "North Ridge Apartments", status: "on track" as const, progress: 62, lastActivity: "2h ago" },
      { id: "p2", name: "Harborview Office Tower", status: "delayed" as const, progress: 44, lastActivity: "yesterday" },
      { id: "p3", name: "Riverside STEM Center", status: "at risk" as const, progress: 31, lastActivity: "3 days ago" },
      { id: "p4", name: "Skyline Logistics Hub", status: "on track" as const, progress: 78, lastActivity: "5h ago" },
      { id: "p5", name: "Eastline Modernization", status: "on track" as const, progress: 54, lastActivity: "today" },
    ],
    []
  );

  const selectedProject = useMemo(() => projects.find((p) => p.id === selectedProjectId) || null, [projects, selectedProjectId]);

  useEffect(() => {
    if (!projectMenuOpen) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setProjectMenuOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [projectMenuOpen]);

  const statusColor = (status: "on track" | "delayed" | "at risk") => {
    switch (status) {
      case "on track": return "bg-emerald-500";
      case "delayed": return "bg-orange-400";
      case "at risk": return "bg-rose-500";
      default: return "bg-slate-500";
    }
  };

  const chatPlaceholder = selectedProject ? `Ask Forge in ${selectedProject.name}…` : "Ask Forge across all projects…";

  const pickProject = (id: string | null) => {
    setProjectMenuOpen(false);
    setLoading(true);
    setSelectedProjectId(id);
    // Simulate fetch/load
    setTimeout(() => setLoading(false), 900);
  };

  return (
    <div className="relative min-h-screen bg-[#111315] text-slate-100">
      {/* Blueprint grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(70,80,90,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(70,80,90,0.22) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-[#111315]/95">
        <div className="mx-auto grid h-16 max-w-screen-2xl grid-cols-12 items-center px-4 md:px-6">
          {/* Left: Brand + Sidebar Toggle */}
          <div className="col-span-4 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="border border-neutral-700 bg-neutral-900 p-2 text-slate-400 hover:bg-neutral-800"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
            </button>
            <div className="text-xl font-extrabold tracking-wide">
              <span className="text-slate-200">FORGE</span>
              <span className="ml-2 text-xs font-medium text-slate-500">by CogNexus</span>
            </div>
          </div>

          {/* Center: Project Switcher */}
          <div className="relative col-span-4 hidden items-center justify-center md:flex">
            <button
              onClick={() => setProjectMenuOpen((v) => !v)}
              className="flex items-center gap-2 border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-slate-200 hover:bg-neutral-800"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${selectedProject ? statusColor(selectedProject.status) : "bg-slate-500"}`} />
              <span className="truncate max-w-[16rem]">{selectedProject ? selectedProject.name : "All Projects"}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {projectMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute top-12 z-50 w-[26rem] border border-neutral-800 bg-neutral-900 p-3"
                >
                  <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">Switch Project</div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="relative w-full">
                      <input
                        className="w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder:text-slate-500 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                        placeholder="Search projects"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <FileSearch className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto pr-1">
                    <button onClick={() => pickProject(null)} className="mb-2 w-full border border-neutral-800 bg-[#111315] px-3 py-2 text-left hover:border-neutral-700 hover:bg-neutral-800">All Projects</button>
                    {projects
                      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
                      .map((p) => (
                        <button
                          key={p.id}
                          onClick={() => pickProject(p.id)}
                          className="mb-2 flex w-full items-center justify-between border border-neutral-800 bg-[#111315] px-3 py-2 text-left hover:border-neutral-700 hover:bg-neutral-800"
                        >
                          <span className="flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${statusColor(p.status)}`} />
                            <span className="text-sm text-slate-200">{p.name}</span>
                          </span>
                          <span className="text-[10px] text-slate-500">{p.lastActivity}</span>
                        </button>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Utilities */}
          <div className="col-span-8 flex items-center justify-end gap-3 md:col-span-4">
            <button className="inline-flex items-center gap-2 border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-slate-300 hover:bg-neutral-800">
              <Filter className="h-4 w-4" />
              <span>Quick Filters</span>
            </button>
            <div className="h-9 w-9 bg-neutral-700" />
          </div>
        </div>
        {/* Thin orange progress rail */}
        <div className="h-0.5 w-full bg-neutral-900">
          <div className={`h-0.5 w-1/3 bg-orange-500 ${loading ? "animate-rail" : ""}`} />
        </div>
      </header>

      {/* Body Layout */}
      <div className="relative z-10 mx-auto grid max-w-screen-2xl grid-cols-12 gap-0">
        {/* Sidebar Rail */}
        {sidebarOpen && (
          <aside className="col-span-12 border-neutral-800 bg-[#0d0f10] md:sticky md:top-16 md:col-span-3 md:h-[calc(100vh-4rem)] md:border-r">
            <div className="flex h-full flex-col px-3 py-4 md:px-5">
              {/* Search + New */}
              <div className="mb-3 flex items-center gap-2">
                <div className="relative w-full">
                  <input
                    className="w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder:text-slate-500 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                    placeholder="Search projects"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <FileSearch className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-slate-500" />
                </div>
                <button className="inline-flex items-center gap-2 bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-500">
                  <Plus className="h-3.5 w-3.5" /> New
                </button>
              </div>

              {/* Project List */}
              <div className="custom-scrollbar grow space-y-2 overflow-y-auto pr-1">
                {projects
                  .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProjectId(p.id)}
                      className={`w-full border px-3 py-3 text-left transition-colors ${
                        selectedProjectId === p.id
                          ? "border-orange-500/40 bg-neutral-900 ring-1 ring-orange-500/30"
                          : "border-neutral-800 bg-[#111315] hover:border-neutral-700 hover:bg-neutral-900"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${statusColor(p.status)}`} />
                          <span className="text-sm font-medium text-slate-200">{p.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{p.lastActivity}</span>
                      </div>
                      <div className="mt-2 h-1 w-full overflow-hidden bg-neutral-800">
                        <div className={`h-full ${p.status === "on track" ? "bg-emerald-500" : p.status === "delayed" ? "bg-orange-400" : "bg-rose-500"}`} style={{ width: `${p.progress}%` }} />
                      </div>
                    </button>
                  ))}
              </div>

              {/* Bottom Quick Links */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                <button className="border border-neutral-800 bg-[#111315] px-3 py-2 text-left hover:border-neutral-700 hover:bg-neutral-900">Calendar</button>
                <button className="border border-neutral-800 bg-[#111315] px-3 py-2 text-left hover:border-neutral-700 hover:bg-neutral-900">Settings</button>
              </div>
            </div>
          </aside>
        )}

        {/* Main Deck */}
        <main className={`relative min-h-[calc(100vh-4rem)] bg-[#111315] ${sidebarOpen ? "col-span-12 md:col-span-9" : "col-span-12"}`}>
          <div className="px-4 py-6 md:px-8">
            {/* Welcome + Status Bar */}
            <div className="mb-6 flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <div className="text-sm uppercase tracking-wider text-slate-500">Welcome back</div>
                <h1 className="mt-1 text-2xl font-semibold text-slate-100">Justin</h1>
                <div className="mt-1 text-xs text-slate-500">
                  {selectedProject ? (
                    <>Project selected: <span className="text-slate-300">{selectedProject.name}</span></>
                  ) : (
                    <>No project selected · Global operations enabled</>
                  )}
                </div>
              </div>
            </div>

            {/* Modular Panels Grid */}
            <div className="grid grid-cols-12 gap-4">
              {/* Centerpiece: Documents & Specs */}
              <Panel className="col-span-12 lg:col-span-8 border-orange-500/40" title="Documents & Specs" subtitle="Chat with plans and specifications">
                <div className="flex flex-wrap gap-2">
                  <CTA icon={ClipboardList} label="Open Documents" primary />
                  <CTA icon={FileText} label="Start RFI" />
                  <CTA icon={ClipboardList} label="Log T&M" />
                </div>
                <div className="mt-4 text-xs text-slate-500">Tip: Type in the chat dock to ask about sheets, specs sections, or RFIs.</div>
              </Panel>

              {/* Planning & Scheduling */}
              <Panel className="col-span-12 lg:col-span-4" title="Planning & Scheduling" subtitle="Lookaheads and pull plans">
                <div className="flex flex-wrap gap-2">
                  <CTA icon={CalendarDays} label="Review Schedule" />
                  <CTA icon={Workflow} label="Create Pull Plan" />
                </div>
              </Panel>

              {/* Requests */}
              <Panel className="col-span-12 lg:col-span-6" title="Requests" subtitle="Field and design coordination">
                <div className="flex flex-wrap gap-2">
                  <CTA icon={FileText} label="New RFI" />
                  <CTA icon={ClipboardList} label="New T&M" />
                </div>
              </Panel>

              {/* Knowledge & Safety */}
              <Panel className="col-span-12 lg:col-span-6" title="Knowledge & Safety" subtitle="Insights and observations">
                <div className="flex flex-wrap gap-2">
                  <CTA icon={BookOpen} label="Lessons Learned" />
                  <CTA icon={Lightbulb} label={selectedProject ? "Project Insights" : "Company Insights"} />
                  <CTA icon={HardHat} label="Safety Reports" />
                </div>
              </Panel>
            </div>

            <div className="h-28" />
          </div>

          {/* Chat Dock */}
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-2 pb-2">
            <motion.div layout className="pointer-events-auto w-full max-w-screen-2xl border border-neutral-800 bg-[#111315]/95 p-3 ring-1 ring-orange-500/20">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MessageSquare className="h-4 w-4 text-orange-400" />
                  <span>{selectedProject ? <>Dock · <span className="text-orange-400">{selectedProject.name}</span></> : <>Dock · Global context</>}</span>
                </div>
                <button onClick={() => setChatExpanded((v) => !v)} className="border border-neutral-700 bg-neutral-900 px-2 py-1 text-xs text-slate-300 hover:bg-neutral-800">
                  {chatExpanded ? "Collapse" : "Expand"}
                </button>
              </div>
              <AnimatePresence initial={false}>
                {chatExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 overflow-hidden border border-neutral-800 bg-neutral-900">
                    <div className="max-h-56 space-y-3 overflow-y-auto p-3 text-sm">
                      <div className="text-slate-500">Forge is ready. Ask about sheets, specs, or RFIs.</div>
                      <div className="bg-neutral-800 p-2 text-slate-300">Show me the latest changes in Spec 07 21 00 (Thermal Insulation).</div>
                      <div className="ml-auto max-w-[75%] bg-orange-500/15 p-2 text-orange-100 ring-1 ring-orange-500/30">Spec 07 21 00 revision B adds mineral wool at Level 3. Want linked citations?</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-3 flex items-center gap-2">
                <input placeholder={chatPlaceholder} className="h-11 w-full border border-neutral-700 bg-neutral-900 px-4 text-sm placeholder:text-slate-500 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
                <button className="inline-flex h-11 items-center justify-center gap-2 bg-orange-500 px-4 font-medium text-black hover:bg-orange-400">
                  <MessageSquare className="h-4 w-4" />
                  Send
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(120,120,120,0.35); }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .animate-rail { animation: rail-move 1.1s linear infinite; }
        @keyframes rail-move { 0% { transform: translateX(-33%); } 100% { transform: translateX(300%); } }
      `}</style>
    </div>
  );
}

// --------------------------
// Subcomponents (Panels/CTAs)
// --------------------------
function Panel({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children?: React.ReactNode; className?: string }) {
  return (
    <section className={`border border-neutral-800 bg-neutral-900 p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function CTA({ label, icon: Icon, primary = false }: { label: string; icon: React.ComponentType<{ className?: string }>; primary?: boolean }) {
  return (
    <button
      className={`inline-flex items-center gap-2 border px-3 py-2 text-sm ${
        primary ? "border-orange-500/60 bg-[#151719] text-slate-100 hover:bg-[#191b1e]" : "border-neutral-700 bg-[#151719] text-slate-200 hover:bg-[#191b1e]"
      }`}
    >
      <Icon className={`h-4 w-4 ${primary ? "text-orange-400" : "text-slate-400"}`} />
      <span>{label}</span>
    </button>
  );
}
