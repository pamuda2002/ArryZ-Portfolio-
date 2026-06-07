interface BackgroundEffectsProps {
  isDark: boolean;
  mousePos: { x: number; y: number };
  hoveringInteractive: boolean;
  scrollPercent: number;
}

export default function BackgroundEffects({ isDark, mousePos, hoveringInteractive, scrollPercent }: BackgroundEffectsProps) {
  return (
    <>
      {/* 3D Liquid Orbs Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Navy/Blue Gradient Mesh — reduced blur on mobile for GPU savings */}
        <div className={`absolute top-0 left-0 w-full h-[150vh] opacity-30 blur-[60px] md:blur-[120px] transition-all duration-700 ${isDark ? "bg-gradient-to-tr from-[#0A0F24] via-[#1E3A8A]/30 to-[#030712]" : "bg-gradient-to-tr from-[#F0F4FF] via-[#E2E8F0] to-[#FFFFFF]"}`}></div>
        
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
        className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 hidden lg:block ${isDark ? "opacity-100" : "opacity-30"}`}
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
