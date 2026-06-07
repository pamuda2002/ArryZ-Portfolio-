import { ArrowUp, MapPin } from "lucide-react";

interface FooterProps {
  isDark: boolean;
  scrollTo: (id: string) => void;
}

export default function Footer({ isDark, scrollTo }: FooterProps) {
  return (
    <footer className={`py-12 border-t transition-colors ${isDark ? "bg-[#030712] border-gray-800 text-gray-400" : "bg-slate-50 border-gray-200 text-gray-700"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left - Legal Credits */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-display font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#7C3AED]">ArryZ Portfolio</span>
          <span className="text-xs font-mono opacity-60 mt-1">
            Pamuda Jayathilaka © {new Date().getFullYear()} · Born June 19, 2002. Dropped out of A-levels. Taught himself everything.
          </span>
          <span className="text-[10px] font-mono text-[#63B3ED] mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#63B3ED]" />
            <span>Tambuttegama, Sri Lanka · Running telemetry around the globe.</span>
          </span>
        </div>

        {/* Right - Scroll to top button */}
        <button
          onClick={() => scrollTo("hero")}
          className="px-4 py-2 text-xs font-mono font-bold rounded-lg border border-gray-700/30 hover:border-gray-500 transition-all flex items-center space-x-2"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Scroll To Top</span>
        </button>

      </div>
    </footer>
  );
}
