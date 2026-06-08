import { useState } from "react";
import { Sun, Moon, Clock, Menu, X } from "lucide-react";
import SriLankaFlag from "../assets/icons/Sri_Lanka_flag.svg";
import Logo from "../assets/images/Logo.webp";


interface NavbarProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  colomboTime: string;
  isAwake: boolean;
  scrollTo: (id: string) => void;
}

export default function Navbar({ isDark, setIsDark, colomboTime, isAwake, scrollTo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-300 ${isDark
        ? "bg-[#030712]/85 border-b border-[#2563EB]/10 text-gray-100"
        : "bg-white/85 border-b border-gray-200 text-[#0D1B2A]"
      } backdrop-blur-sm md:backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo Mark left */}
        <div
          onClick={() => handleNavClick("hero")}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <img
            src={Logo}
            alt="ArryZ Logo"
            className="w-10 h-10 object-contain transform transition-all group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight leading-none">ArryZ</span>
            <span className="text-[10px] text-gray-500 font-mono tracking-wider">Pamuda Jayathilaka</span>
          </div>
        </div>

        {/* Desktop Nav Links (center) */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleNavClick("story")} className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">My Story</button>
          <button onClick={() => handleNavClick("services")} className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Services</button>
          <button onClick={() => handleNavClick("skills")} className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Tech Stack</button>
          <button onClick={() => handleNavClick("projects")} className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Projects</button>
          <button onClick={() => handleNavClick("why")} className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Why ArryZ</button>
          <button onClick={() => handleNavClick("contact")} className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Contact</button>
        </nav>

        {/* Theme toggle + Hire Me CTA (right) */}
        <div className="flex items-center space-x-4">

          {/* Sri Lanka Time Badge (Quick info widget) */}
          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-full border border-[#2563EB]/25 bg-[#2563EB]/5">
            <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
            <img src={SriLankaFlag} className="w-4.5 h-3 object-cover rounded-[1px] border border-gray-500/10" alt="Sri Lanka Flag" />
            <span className="opacity-80">{colomboTime || "5:30 PM"}</span>
            <span className={`w-2 h-2 rounded-full ${isAwake ? "bg-emerald-500" : "bg-amber-400"}`}></span>
          </div>

          {/* Light/Dark Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2.5 rounded-lg border transition-all ${isDark
                ? "border-[#2563EB]/20 bg-gray-900 text-yellow-400 hover:bg-gray-800"
                : "border-gray-300 bg-gray-100 text-[#0D1B2A] hover:bg-gray-200"
              }`}
            title="Toggle Light/Dark Theme"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Hire Me CTA Button */}
          <button
            onClick={() => handleNavClick("contact")}
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
          >
            Hire Me
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pt-2 pb-6 border-t ${isDark ? "bg-[#0D1422] border-gray-800" : "bg-slate-50 border-gray-200"
          } transition-all`}>
          <div className="flex flex-col space-y-4 pt-2">
            <button onClick={() => handleNavClick("story")} className="text-left py-2 font-medium hover:text-[#3B82F6]">My Story</button>
            <button onClick={() => handleNavClick("services")} className="text-left py-2 font-medium hover:text-[#3B82F6]">Services</button>
            <button onClick={() => handleNavClick("skills")} className="text-left py-2 font-medium hover:text-[#3B82F6]">Tech Stack</button>
            <button onClick={() => handleNavClick("projects")} className="text-left py-2 font-medium hover:text-[#3B82F6]">Projects</button>
            <button onClick={() => handleNavClick("why")} className="text-left py-2 font-medium hover:text-[#3B82F6]">Why ArryZ</button>
            <button onClick={() => handleNavClick("contact")} className="text-left py-2 font-medium hover:text-[#3B82F6]">Contact</button>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-700/20 dark:border-gray-800">
              <div className="flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-full border border-[#2563EB]/25 bg-[#2563EB]/5">
                <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                <img src={SriLankaFlag} className="w-4.5 h-3 object-cover rounded-[1px] border border-gray-500/10" alt="Sri Lanka Flag" />
                <span className="opacity-80">{colomboTime || "5:30 PM"}</span>
                <span className={`w-2 h-2 rounded-full ${isAwake ? "bg-emerald-500" : "bg-amber-400"}`}></span>
              </div>
              <span className="text-xs text-[#3B82F6] font-semibold">{isAwake ? "Available Now" : "Responding via Mail"}</span>
            </div>
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full text-center py-2.5 rounded-lg bg-[#2563EB] text-white font-bold"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
