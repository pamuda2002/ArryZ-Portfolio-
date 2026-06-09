import { useState, useEffect } from "react";

export default function BackgroundEffects() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // 1. Scroll percentage calculation
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

  // 2. Update mouse position and interactive states — skip on mobile (no cursor)
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

  return (
    <>
      {/* 3D Liquid Orbs Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Navy/Blue Gradient Mesh — reduced blur on mobile for GPU savings */}
        <div className="absolute top-0 left-0 w-full h-[150vh] opacity-30 blur-[60px] md:blur-[120px] transition-all duration-700 bg-gradient-to-tr from-[#F0F4FF] via-[#E2E8F0] to-[#FFFFFF] dark:from-[#0A0F24] dark:via-[#1E3A8A]/30 dark:to-[#030712]"></div>
        
        {/* Floating Orb 2 (Story/Services Section) — smaller on mobile */}
        <div className="absolute top-[40%] left-[2%] w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full bg-[#2563EB] opacity-15 blur-[60px] md:blur-[120px] animate-float-medium will-change-transform"></div>
        {/* Floating Orb 3 (Projects/Contact Section) — smaller on mobile */}
        <div className="absolute top-[80%] right-[10%] w-[220px] h-[220px] md:w-[380px] md:h-[380px] rounded-full bg-[#4f46e5] opacity-10 blur-[50px] md:blur-[100px] animate-float-slow will-change-transform"></div>
      </div>

      {/* Thin blue viewport scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-[4px] bg-[#2563EB] z-[9999] shadow-[0_0_8px_#2563EB] will-change-[width]"
        style={{ width: `${scrollPercent}%` }}
      ></div>

      {/* Desktop-only custom cursor aura — hidden on touch devices to avoid full-viewport repaints */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 hidden lg:block opacity-30 dark:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 70%)`
        }}
      ></div>

      {/* Magnetic glowing tip at exact cursor location — desktop only */}
      <div 
        className={`hidden lg:block fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-50 transition-transform duration-150 ease-out ${
          hoveringInteractive 
            ? "w-8 h-8 bg-blue-500/20 border-2 border-[#2563EB] scale-125 shadow-[0_0_15px_rgba(37,99,235,0.6)]" 
            : "w-3 h-3 bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.8)]"
        }`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>
    </>
  );
}
