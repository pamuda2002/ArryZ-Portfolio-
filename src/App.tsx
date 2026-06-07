import { useState, useEffect, useRef } from "react";

import BackgroundEffects from "./components/BackgroundEffects";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import ServicesSection from "./components/ServicesSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import WhySection from "./components/WhySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(true);

  // Custom Cursor positioning & state
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  // Scroll depth percentage
  const [scrollPercent, setScrollPercent] = useState(0);

  // Sri Lanka time state
  const [colomboTime, setColomboTime] = useState("");
  const [isAwake, setIsAwake] = useState(true);

  // Shared cross-component state
  const [contactMessage, setContactMessage] = useState("");

  // Update clock & scroll percentage
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

      // Simple calculation: Sri Lanka is UTC+5:30. Let's check awake status.
      const colomboHour = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })).getHours();
      // Awake from 8 AM to 11:30 PM
      setIsAwake(colomboHour >= 8 && colomboHour < 23);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          setScrollPercent((window.scrollY / scrollHeight) * 100);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update mouse position and interactive states — skip on mobile (no cursor)
  useEffect(() => {
    // Detect touch/mobile device
    const isMobile = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive-element") ||
        target.getAttribute("role") === "button"
      ) {
        setHoveringInteractive(true);
      } else {
        setHoveringInteractive(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Sync isDark state with HTML class list for Tailwind v4 selector-based dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Scroll to section function
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 relative select-none ${isDark ? "bg-[#030712] text-gray-100" : "bg-white text-[#0D1B2A]"}`}>
      
      <BackgroundEffects 
        isDark={isDark} 
        mousePos={mousePos} 
        hoveringInteractive={hoveringInteractive} 
        scrollPercent={scrollPercent} 
      />

      <Navbar 
        isDark={isDark} 
        setIsDark={setIsDark} 
        colomboTime={colomboTime} 
        isAwake={isAwake} 
        scrollTo={scrollTo} 
      />

      <HeroSection isDark={isDark} scrollTo={scrollTo} />

      <StorySection isDark={isDark} />

      <ServicesSection 
        isDark={isDark} 
        setContactMessage={setContactMessage} 
        scrollTo={scrollTo} 
      />

      <SkillsSection isDark={isDark} />

      <ProjectsSection isDark={isDark} />

      <WhySection isDark={isDark} />

      <ContactSection 
        isDark={isDark} 
        contactMessage={contactMessage} 
        setContactMessage={setContactMessage} 
      />

      <Footer isDark={isDark} scrollTo={scrollTo} />

    </div>
  );
}
