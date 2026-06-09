import { useState, useEffect } from "react";
import { Sun, Moon, Clock, Menu, X } from "lucide-react";
import SriLankaFlag from "../assets/icons/Sri_Lanka_flag.svg";
import Logo from "../assets/images/Logo.webp";
import { scrollTo } from "../utils/scroll";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sri Lanka time state
  const [colomboTime, setColomboTime] = useState("");
  const [isAwake, setIsAwake] = useState(true);

  // Update clock & awake status
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Colombo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const timeStr = formatter.format(new Date());
      setColomboTime(timeStr);

      const colomboHour = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })).getHours();
      // Awake from 8 AM to 11:30 PM
      setIsAwake(colomboHour >= 8 && colomboHour < 23);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] transition-all duration-300 bg-white/85 dark:bg-[#030712]/85 border-b border-gray-200 dark:border-[#2563EB]/10 text-[#0D1B2A] dark:text-gray-100 backdrop-blur-sm md:backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo Mark left */}
        <a
          href="#hero"
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <img
            src={Logo}
            alt="ArryZ Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain transform transition-all group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight leading-none">ArryZ</span>
            <span className="text-[10px] text-gray-500 font-mono tracking-wider">Pamuda Jayathilaka</span>
          </div>
        </a>

        {/* Desktop Nav Links (center) */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#story" className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">My Story</a>
          <a href="#services" className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Services</a>
          <a href="#skills" className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Tech Stack</a>
          <a href="#projects" className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Projects</a>
          <a href="#why" className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Why ArryZ</a>
          <a href="#contact" className="hover:text-[#3B82F6] text-sm font-semibold transition-colors cursor-pointer">Contact</a>
        </nav>

        {/* Theme toggle + Hire Me CTA (right) */}
        <div className="flex items-center space-x-4">

          {/* Sri Lanka Time Badge (Quick info widget) */}
          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-full border border-[#2563EB]/25 bg-[#2563EB]/5">
            <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
            <img src={SriLankaFlag} className="w-4.5 h-3 object-cover rounded-[1px] border border-gray-500/10" alt="Sri Lanka Flag" width={20} height={14} />
            <span className="opacity-80">{colomboTime || "5:30 PM"}</span>
            <span className={`w-2 h-2 rounded-full ${isAwake ? "bg-emerald-500" : "bg-amber-400"}`}></span>
          </div>

          {/* Light/Dark Toggle */}
          <button
            onClick={() => {
              const currentDark = document.documentElement.classList.contains("dark");
              if (currentDark) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
              } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
              }
            }}
            className="p-2.5 rounded-lg border transition-all border-gray-300 dark:border-[#2563EB]/20 bg-gray-100 dark:bg-gray-900 text-[#0D1B2A] dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-800"
            title="Toggle Light/Dark Theme"
            aria-label="Toggle Theme"
          >
            <Sun className="hidden dark:block w-4 h-4" />
            <Moon className="block dark:hidden w-4 h-4" />
          </button>

          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
          >
            Hire Me
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden px-4 pt-2 pb-6 border-t bg-slate-50 dark:bg-[#0D1422] border-gray-200 dark:border-gray-800 transition-all">
          <div className="flex flex-col space-y-4 pt-2">
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 font-medium hover:text-[#3B82F6]">My Story</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 font-medium hover:text-[#3B82F6]">Services</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 font-medium hover:text-[#3B82F6]">Tech Stack</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 font-medium hover:text-[#3B82F6]">Projects</a>
            <a href="#why" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 font-medium hover:text-[#3B82F6]">Why ArryZ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 font-medium hover:text-[#3B82F6]">Contact</a>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-700/20 dark:border-gray-800">
              <div className="flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-full border border-[#2563EB]/25 bg-[#2563EB]/5">
                <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                <img src={SriLankaFlag} className="w-4.5 h-3 object-cover rounded-[1px] border border-gray-500/10" alt="Sri Lanka Flag" width={20} height={14} />
                <span className="opacity-80">{colomboTime || "5:30 PM"}</span>
                <span className={`w-2 h-2 rounded-full ${isAwake ? "bg-emerald-500" : "bg-amber-400"}`}></span>
              </div>
              <span className="text-xs text-[#3B82F6] font-semibold">{isAwake ? "Available Now" : "Responding via Mail"}</span>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#2563EB] text-white font-bold"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
