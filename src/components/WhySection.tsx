import { useState, useEffect } from "react";
import { Globe, Zap, Target } from "lucide-react";

interface WhySectionProps {
  isDark: boolean;
}

export default function WhySection({ isDark }: WhySectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Touch swipe states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setActiveSlide((prev) => (prev + 1) % 3);
    } else if (isRightSwipe) {
      setActiveSlide((prev) => (prev - 1 + 3) % 3);
    }
  };

  // Auto-slide effect for mobile view
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const cardsData = [
    {
      id: "autodidact",
      title: "Self-Taught Dev",
      description: "No degree. No shortcuts. Just relentless building, troubleshooting, and self-directed reading. I learn exactly what your business challenges require.",
      icon: Globe,
      iconColor: "text-blue-500 dark:text-[#63B3ED] mb-4 animate-spin-slow",
      footerText: "100% Autodidact Competence",
      footerColor: isDark ? "border-gray-700/20 text-[#63B3ED]" : "border-slate-200 text-blue-600"
    },
    {
      id: "experience",
      title: "2+ Years Focused Code",
      description: "Python, web development, databases, security, and programmatic SEO setup. Taught from the bottom up to ensure real, responsive speed.",
      icon: Zap,
      iconColor: "text-rose-500 mb-4",
      footerText: "730+ Days of Obsessive Building",
      footerColor: isDark ? "border-gray-700/20 text-rose-400" : "border-slate-200 text-rose-600"
    },
    {
      id: "client",
      title: "Client-First Philosophy",
      description: "I learn what your business needs before writing a single line of code. No useless decorations—only layout design that secures inquiries.",
      icon: Target,
      iconColor: "text-emerald-500 mb-4",
      footerText: "Guaranteed Lead Alignment",
      footerColor: isDark ? "border-gray-700/20 text-emerald-400" : "border-slate-200 text-emerald-600"
    }
  ];

  return (
    <section 
      id="why" 
      aria-label="Why work with ArryZ"
      className={`py-28 transition-colors duration-300 ${
        isDark ? "bg-[#0a0f18]" : "bg-slate-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs font-mono text-[#63B3ED] uppercase tracking-wider mb-2">
            WHY WORK WITH ME
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Unconventional Path. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#7C3AED]">Unmatched Focus.</span>
          </h2>
          <p className={`mt-4 text-sm transition-colors ${isDark ? "text-gray-400" : "text-slate-600"}`}>
            I don't have a piece of paper from a university. Instead, I have working code, real commitment, and client priority.
          </p>
        </div>

        {/* Desktop View (Static Grid) */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {cardsData.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id}
                className={`p-8 rounded-3xl border text-left flex flex-col justify-between ${
                  isDark ? "bg-[#0D1422]/90 border-gray-800" : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <div>
                  <IconComponent className={`w-8 h-8 ${card.iconColor}`} />
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {card.description}
                  </p>
                </div>
                <div className={`mt-6 pt-4 border-t text-xs font-mono font-bold transition-colors ${card.footerColor}`}>
                  {card.footerText}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View (Auto-sliding Horizontal Carousel) */}
        <div className="md:hidden overflow-hidden w-full relative">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {cardsData.map((card) => {
              const IconComponent = card.icon;
              return (
                <div key={card.id} className="w-full shrink-0 px-1">
                  <div 
                    className={`p-6 rounded-3xl border text-left flex flex-col justify-between min-h-[300px] ${
                      isDark ? "bg-[#0D1422]/90 border-gray-800" : "bg-white border-gray-200 shadow-sm"
                    }`}
                  >
                    <div>
                      <IconComponent className={`w-8 h-8 ${card.iconColor}`} />
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {card.description}
                      </p>
                    </div>
                    <div className={`mt-6 pt-4 border-t text-xs font-mono font-bold transition-colors ${card.footerColor}`}>
                      {card.footerText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center space-x-2.5 mt-6">
            {cardsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx 
                    ? "bg-[#2563EB] dark:bg-[#63B3ED] scale-125" 
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
