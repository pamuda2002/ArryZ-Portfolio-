import { Terminal } from "lucide-react";

// Accent color lookup map for tech stack pills
const skillAccents: Record<string, { bg: string; text: string; shadow: string; border: string }> = {
  Python: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", shadow: "hover:shadow-purple-500/30", border: "border-purple-500/20" },
  HTML: { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", shadow: "hover:shadow-orange-500/30", border: "border-orange-500/20" },
  CSS: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", shadow: "hover:shadow-blue-500/30", border: "border-blue-500/20" },
  Tailwind: { bg: "bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400", shadow: "hover:shadow-cyan-500/30", border: "border-cyan-500/20" },
  JavaScript: { bg: "bg-yellow-500/10", text: "text-yellow-700 dark:text-yellow-400", shadow: "hover:shadow-yellow-500/30", border: "border-yellow-500/20" },
  TypeScript: { bg: "bg-sky-500/10", text: "text-sky-600 dark:text-sky-400", shadow: "hover:shadow-sky-500/30", border: "border-sky-500/20" },
  React: { bg: "bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400", shadow: "hover:shadow-cyan-500/30", border: "border-cyan-500/20" },
  "Next.js": { bg: "bg-slate-500/10", text: "text-slate-700 dark:text-slate-200", shadow: "hover:shadow-slate-500/30", border: "border-slate-300/40 dark:border-slate-500/20" },
  "Node.js": { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", shadow: "hover:shadow-emerald-500/30", border: "border-emerald-500/20" },
  "Express.js": { bg: "bg-zinc-500/10", text: "text-zinc-700 dark:text-zinc-300", shadow: "hover:shadow-zinc-500/30", border: "border-zinc-300/40 dark:border-zinc-500/20" },
  PostgreSQL: { bg: "bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", shadow: "hover:shadow-indigo-500/30", border: "border-indigo-500/20" },
  "Git & GitHub": { bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", shadow: "hover:shadow-rose-500/30", border: "border-rose-500/20" },
  "Authentication & Security": { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400", shadow: "hover:shadow-teal-500/30", border: "border-teal-500/20" },
  SEO: { bg: "bg-amber-500/10", text: "text-amber-700 dark:text-amber-400", shadow: "hover:shadow-amber-500/30", border: "border-amber-500/20" },
  "Content Writing": { bg: "bg-fuchsia-500/10", text: "text-fuchsia-600 dark:text-fuchsia-400", shadow: "hover:shadow-fuchsia-500/30", border: "border-fuchsia-500/20" },
  "VS Code": { bg: "bg-blue-600/10", text: "text-blue-600 dark:text-blue-400", shadow: "hover:shadow-blue-600/30", border: "border-blue-600/20" },
  "Antigravity IDE": { bg: "bg-violet-600/10", text: "text-violet-600 dark:text-violet-400", shadow: "hover:shadow-violet-600/30", border: "border-violet-600/20" },
  "AI Studio": { bg: "bg-cyan-600/10", text: "text-cyan-600 dark:text-cyan-300", shadow: "hover:shadow-cyan-600/30", border: "border-cyan-600/20" },
  "Claude Code": { bg: "bg-orange-600/10", text: "text-orange-600 dark:text-orange-400", shadow: "hover:shadow-orange-600/30", border: "border-orange-600/20" },
  "Google Stitch": { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", shadow: "hover:shadow-red-500/30", border: "border-red-500/20" }
};

export default function SkillsSection() {
  return (
    <section 
      id="skills" 
      aria-label="Technologies and skills"
      className="py-28 transition-colors duration-300 bg-slate-50 dark:bg-[#0a0f18]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-mono text-[#63B3ED] uppercase tracking-wider mb-2">
            MY TOOLBOX
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Technologies I Have <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#7C3AED]">Mastered</span>
          </h2>
          <p className="mt-4 text-sm transition-colors text-slate-600 dark:text-gray-400">
            Each badge glows in its unique accent color on hover. Taught from the ground up, with obsessive daily usage.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Row 1: Languages & Frameworks */}
          <div>
            <div className="text-left mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#63B3ED] font-bold">Languages & Frameworks</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[
                "Python",
                "HTML",
                "CSS",
                "Tailwind",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Express.js",
                "PostgreSQL"
              ].map((tech) => {
                const style = skillAccents[tech] || { bg: "bg-gray-500/10", text: "text-gray-300", shadow: "", border: "border-gray-500/20" };
                return (
                  <div
                    key={tech}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-mono transition-all transform hover:-translate-y-1 cursor-default flex items-center space-x-2 ${style.bg} ${style.text} ${style.border} ${style.shadow} hover:border-current`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span>{tech}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Craft & Tools */}
          <div>
            <div className="text-left mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7C3AED] font-bold">Craft, AI & Developer Tools</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[
                "Git & GitHub",
                "Authentication & Security",
                "SEO",
                "Content Writing",
                "VS Code",
                "Antigravity IDE",
                "AI Studio",
                "Claude Code",
                "Google Stitch"
              ].map((tech) => {
                const style = skillAccents[tech] || { bg: "bg-gray-500/10", text: "text-gray-300", shadow: "", border: "border-gray-500/20" };
                return (
                  <div
                    key={tech}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-mono transition-all transform hover:-translate-y-1 cursor-default flex items-center space-x-2 ${style.bg} ${style.text} ${style.border} ${style.shadow} hover:border-current`}
                  >
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    <span>{tech}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 3: Learning Next */}
          <div>
            <div className="text-left mb-3 flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-widest font-bold transition-colors text-emerald-700 dark:text-emerald-400">Learning Next</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded uppercase transition-colors bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/25">Coming Soon</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2.5 rounded-xl border border-dashed text-sm font-mono flex items-center space-x-2 transition-all border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-500/30 dark:bg-cyan-500/5 dark:text-cyan-300/80">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                <span>Flutter (Mobile apps deployment)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Info Box explaining how ArryZ works */}
        <div className="mt-12 p-6 rounded-2xl border text-left bg-white border-gray-200 dark:bg-[#0D1422]/40 dark:border-gray-800">
          <h3 className="text-sm font-bold font-mono mb-2 flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#63B3ED]" />
            <span>Unconventional IDE Note</span>
          </h3>
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            I code in <strong>Claude Code</strong>, <strong>Antigravity IDE</strong> and <strong>AI Studio</strong> pipelines. Skipping high school rote curriculum gave me the unique edge to adapt to cutting-edge AI orchestration. I write clean, secure code that works perfectly.
          </p>
        </div>

      </div>
    </section>
  );
}
