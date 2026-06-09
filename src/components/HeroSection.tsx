import { useState, useEffect } from "react";
import {
  Terminal,
  ChevronRight,
  Sparkles,
  MapPin,
  ArrowRight,
  Globe
} from "lucide-react";
import HeroBackground from "./HeroBackground";
import arryzPhoto from "../assets/images/arryz.webp";
import arryzLightPhoto from "../assets/images/arryz_light.webp";
import { scrollTo } from "../utils/scroll";

export default function HeroSection() {
  // Interactive developer terminal state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System initialized. Type a query or click automated prompts below.",
    "ArryZ kernel v1.0.0-production loaded.",
    "Based in Sri Lanka. Running telemetry..."
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const hour = new Date().getHours();
      // Offline between 10:00 PM (22) and 6:00 AM (6)
      setIsOnline(hour >= 6 && hour < 22);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Run terminal command
  const runTerminalCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response = "";
    if (cleanCmd === "whoami") {
      response = "ArryZ: 23-year-old self-taught full-stack developer & landing page specialist. High conversion obsession.";
    } else if (cleanCmd === "skills") {
      response = "Python, Next.js, React, Node.js, Technical SEO, PostgreSQL, Auth & Security.";
    } else if (cleanCmd === "alphago") {
      response = "DeepMind AlphaGo defeated Lee Sedol in 2016. Move 37 sparked my obsession with tech and the ambition to become an AI engineer.";
    } else if (cleanCmd === "contact") {
      response = "Email arryz.buzinezz@gmail.com or submit the form below. Secret discount activated: 'BUILTDIFFERENT2026AZ' for 10% off design work.";
    } else if (cleanCmd === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else if (cleanCmd) {
      response = `Command '${cleanCmd}' not found. Try: whoami, skills, alphago, contact, clear`;
    } else {
      return;
    }

    setTerminalLogs((prev) => [...prev, `> ${cmd}`, response]);
    setTerminalInput("");
  };

  return (
    <section
      id="hero"
      aria-label="Hero — ArryZ introduction"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 z-10"
    >
      {/* Dual-layered interactive neural background */}
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Heading and Taglines */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 text-left">

          {/* Story Hook Tag */}
          <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full self-start">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">· High Conversion Landing Page Specialist</span>
          </div>

          {/* Giant display text: "ArryZ" */}
          <div className="relative group">
            {/* Clipping container to prevent horizontal scrollbars on mobile */}
            <div className="absolute inset-0 pointer-events-none select-none z-0">
              {/* Opacity watermark glow */}
              <div className="absolute -top-12 sm:-top-16 -left-6 sm:-left-12 text-[80px] sm:text-[120px] md:text-[180px] font-display font-extrabold text-sky-400/10 dark:text-[#00F0FF]/5">
                BUILD
              </div>

              {/* Ambient moving light sweep behind name */}
              <div className="name-ambient-glow"></div>
            </div>

            {/* Animated split characters */}
            <h1 aria-label="ArryZ — Full-Stack Developer" className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter select-none font-display flex flex-nowrap gap-1.5 sm:gap-2 text-left leading-none relative z-10">
              {["A", "r", "r", "y", "Z"].map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-fade-in"
                  style={{
                    animationDelay: `${index * 240}ms`,
                    animationFillMode: "both"
                  }}
                >
                  <span
                    className="inline-block transition-all duration-700 hover:scale-115 hover:-rotate-3 hover:brightness-125 cursor-pointer arryz-glow-wrapper"
                    style={{
                      animationDelay: `${index * 1.5}s`
                    }}
                  >
                    <span
                      className="inline-block arryz-glow-text"
                      style={{
                        animationDelay: `${index * 1.5}s`
                      }}
                    >
                      {char}
                    </span>
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Sub-tagline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            I Build Web Experiences That <span className="text-[#7C3AED] dark:text-[#3B82F6]">Actually Work.</span>
            <span className="block text-lg font-normal text-gray-400 mt-2">Self-Taught. Story-Driven. <span className="text-[#2563EB] dark:text-[#3B82F6] font-bold">Built Different.</span></span>
          </h2>

          {/* Body copy (small) */}
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Full-stack developer from Sri Lanka. I help small business owners and startups scale their revenue with high-converting landing pages, clean search-engine optimized code, and custom SEO strategy that gets found first.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo("projects")}
              className="w-full sm:w-auto px-8 py-4 font-bold text-sm rounded-xl bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white hover:shadow-xl hover:shadow-[#2563EB]/25 transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2"
            >
              <span>See My Work</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => scrollTo("story")}
              className="w-full sm:w-auto px-8 py-4 font-bold text-sm rounded-xl border transition-all transform hover:-translate-y-1 justify-center flex items-center border-[#1E40AF]/30 dark:border-[#3B82F6]/30 text-[#1E40AF] dark:text-[#3B82F6] hover:bg-[#1E40AF]/5 dark:hover:bg-[#2563EB]/10"
            >
              My Story & Beats
            </button>
          </div>

          {/* Trust highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700/20 max-w-lg">
            <div>
              <p className="text-xl font-bold text-[#3B82F6]">0%</p>
              <p className="text-xs text-gray-500 font-mono">Boring Templates Used</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#7C3AED]">100%</p>
              <p className="text-xs text-gray-500 font-mono">Self-Taught Coding</p>
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-500">24/7</p>
              <p className="text-xs text-gray-500 font-mono">Obsessive Commitment</p>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Visual element / Interactive Terminal Showcase */}
        <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center min-h-[560px] lg:min-h-[660px] w-full mt-10 lg:mt-0">

          {/* Portrait Image with Tech Glow and Borders */}
          <div className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border border-cyan-500/30 dark:border-cyan-500/20 shadow-2xl group transition-all duration-500 hover:border-cyan-400/50 z-10 lg:hover:z-30">
            {/* Ambient Background Glow behind the portrait */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-70 z-10"></div>

            {/* Tech Corner Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/70 z-10"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/70 z-10"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/70 z-10"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/70 z-10"></div>

            {/* Tech Grid / Scanner Overlay Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10 opacity-30 group-hover:opacity-50 transition-opacity will-change-[opacity]"></div>

            {/* Active Telemetry Status Badge */}
            <div className={`absolute top-4 left-4 z-20 flex items-center space-x-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border text-[10px] font-mono ${isOnline
              ? "border-cyan-500/30 text-cyan-400"
              : "border-yellow-500/30 text-yellow-400"
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-500" : "bg-yellow-500"}`}></span>
              <span>SYSTEM CREATOR // {isOnline ? "ONLINE" : "OFFLINE (Sleeping)"}</span>
            </div>

            {/* Photo */}
            <img
              src={arryzPhoto}
              alt="Pamuda Jayathilaka (ArryZ) — Full-Stack Developer from Sri Lanka (Dark)"
              width={380}
              height={507}
              className="hidden dark:block w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <img
              src={arryzLightPhoto}
              alt="Pamuda Jayathilaka (ArryZ) — Full-Stack Developer from Sri Lanka (Light)"
              width={380}
              height={507}
              className="block dark:hidden w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />

            {/* Bottom Overlay Info Tag */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-black/65 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 text-[10px] font-mono text-gray-400">
              <span>
                <span className="hidden dark:inline">IMG_FILE: arryz.png</span>
                <span className="inline dark:hidden">IMG_FILE: arryz_light.png</span>
              </span>
              <span>760x1014px</span>
            </div>
          </div>

          {/* Interactive Coder Terminal Component (Hero special element) */}
          <div className="w-full max-w-[420px] rounded-2xl border mt-6 lg:mt-0 lg:absolute lg:bottom-12 lg:-left-12 lg:z-20 lg:hover:z-30 bg-white/85 dark:bg-[#080d1a]/85 backdrop-blur-sm border-gray-300 dark:border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,240,255,0.15)] overflow-hidden p-1 transition-all hover:scale-[1.01] hover:border-cyan-500/40">

            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-mono">
                <Terminal className="w-3 h-3" />
                <span>arryz-terminal-session</span>
              </div>
              <div className="w-4"></div>
            </div>

            {/* Terminal Logs Content */}
            <div className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-3 no-scrollbar text-left">
              {terminalLogs.map((log, index) => (
                <div
                  key={index}
                  className={`leading-relaxed ${log.startsWith(">")
                    ? "text-cyan-700 dark:text-cyan-400 font-bold"
                    : log.includes("discount")
                      ? "text-amber-700 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-400/10 p-1.5 rounded"
                      : "text-slate-800 dark:text-gray-300"
                    }`}
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Terminal Input Controls */}
            <div className="p-3 bg-slate-100 dark:bg-black/20 border-t border-gray-700/20 flex items-center space-x-2">
              <span className="text-cyan-600 dark:text-[#22D3EE] font-mono text-sm font-bold">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    runTerminalCommand(terminalInput);
                  }
                }}
                placeholder="Type 'whoami', 'skills', 'alphago' or 'contact'..."
                className="flex-1 bg-transparent text-xs font-mono outline-none text-cyan-800 dark:text-[#22D3EE] border-none focus:ring-0 placeholder-slate-400 dark:placeholder-gray-600"
              />
              <button
                onClick={() => runTerminalCommand(terminalInput)}
                className="p-1.5 rounded bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-700 dark:text-[#22D3EE] hover:bg-cyan-500/20 dark:hover:bg-cyan-500/25 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Automated Suggestion Pills */}
            <div className="px-3 py-2 bg-slate-50 dark:bg-black/10 flex flex-wrap gap-2 justify-center border-b border-gray-700/10">
              {["whoami", "skills", "alphago", "contact"].map((suggest) => (
                <button
                  key={suggest}
                  onClick={() => runTerminalCommand(suggest)}
                  className="text-[10px] font-mono bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-[#22D3EE] hover:bg-cyan-100 dark:hover:bg-cyan-500/25 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-500/20 transition-all"
                >
                  {suggest}
                </button>
              ))}
            </div>

            {/* Terminal Status Bar (Tmux / Powerline style) */}
            <div className="px-3 py-2 bg-slate-100 dark:bg-cyan-950/20 border-t border-gray-700/20 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-600 dark:text-cyan-400">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Sri Lanka (UTC+5:30)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${isOnline ? "bg-emerald-500" : "bg-yellow-500"}`}></span>
                <span>{isOnline ? "Active Online" : "Offline - I'm sleeping now"}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
