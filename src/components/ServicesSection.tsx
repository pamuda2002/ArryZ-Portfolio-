import { useState, useEffect } from "react";
import { ChevronRight, Rocket, Search, Settings } from "lucide-react";

interface ServicesSectionProps {
  isDark: boolean;
  setContactMessage: (message: string) => void;
  scrollTo: (id: string) => void;
}

export default function ServicesSection({ isDark, setContactMessage, scrollTo }: ServicesSectionProps) {
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

  const servicesData = [
    {
      id: "landing",
      title: "High-Converting Landing Pages",
      description: "High-converting landing pages tailored for small businesses — designed to turn random visitors into loyal paying customers.",
      icon: Rocket,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10 border-blue-500/30",
      tags: ["UI/UX Design", "React / Next.js", "Mobile-First"],
      tagBg: "bg-[#63B3ED]/10 text-[#63B3ED] border-[#63B3ED]/20",
      btnColor: "text-blue-400 group-hover:text-blue-300",
      inquiryText: "Hi ArryZ, I am interested in a High-Converting Landing Page for my business. Let's build something epic!"
    },
    {
      id: "seo",
      title: "SEO Optimization",
      description: "On-page Technical SEO and conversion copywriting setup to help your local business get found on search engine results.",
      icon: Search,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-500/10 border-amber-500/30",
      tags: ["Technical SEO", "Content Writing", "Performance"],
      tagBg: "bg-[#7C3AED]/10 text-purple-300 border border-purple-500/25",
      btnColor: "text-purple-400 group-hover:text-purple-300",
      inquiryText: "Hi ArryZ, I need Technical SEO Optimization and conversion copywriting to improve my visibility. Let's connect!"
    },
    {
      id: "fullstack",
      title: "Full-Stack Development",
      description: "From database to deployment — clean, scalable, structured code built for the long-term without shortcuts.",
      icon: Settings,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10 border-emerald-500/30",
      tags: ["Node.js", "PostgreSQL", "Auth & Security"],
      tagBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
      btnColor: "text-emerald-400 group-hover:text-[#38D39F]",
      inquiryText: "Hi ArryZ, I have a Full-Stack Project idea and need database integration, user auth, and scalable architecture. Let's discuss!"
    }
  ];

  return (
    <section 
      id="services" 
      aria-label="Services offered"
      className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
    >
      {/* Header */}
      <div className="text-left max-w-3xl mb-16">
        <div className="inline-block text-xs font-mono text-[#63B3ED] uppercase tracking-wider mb-2">
          WHAT I DO FOR YOU
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          High-Value Services Designed <br className="hidden sm:inline" />
          To Turn <span className="text-[#63B3ED]">Visitors Into Clients</span>
        </h2>
        <p className="mt-4 text-gray-400 text-sm max-w-xl">
          No slow WordPress page-builders. No confusing systems. Just pure, clean code that loads instantly and transforms traffic into tangible leads.
        </p>
      </div>

      {/* Desktop View (Static Grid) */}
      <div className="hidden md:grid grid-cols-3 gap-8">
        {servicesData.map((service) => {
          const IconComponent = service.icon;
          return (
            <div 
              key={service.id}
              className={`p-8 rounded-3xl ${isDark ? "glass-card-dark" : "glass-card-light"} relative overflow-hidden group flex flex-col justify-between min-h-[350px]`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center text-2xl mb-6 transform group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`w-5 h-5 ${service.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {service.description}
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700/20">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tags.map((tag) => (
                    <span key={tag} className={`text-[10px] font-mono px-2.5 py-1 rounded border ${service.tagBg}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    setContactMessage(service.inquiryText);
                    scrollTo("contact");
                  }}
                  className={`text-xs font-mono font-bold ${service.btnColor} flex items-center space-x-1.5`}
                >
                  <span>Inquire About This Service</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
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
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="w-full shrink-0 px-1">
                <div 
                  className={`p-6 rounded-3xl ${isDark ? "glass-card-dark" : "glass-card-light"} relative overflow-hidden group flex flex-col justify-between min-h-[350px]`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center text-2xl mb-6 transform group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-5 h-5 ${service.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-700/20">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.tags.map((tag) => (
                        <span key={tag} className={`text-[10px] font-mono px-2.5 py-1 rounded border ${service.tagBg}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        setContactMessage(service.inquiryText);
                        scrollTo("contact");
                      }}
                      className={`text-xs font-mono font-bold ${service.btnColor} flex items-center space-x-1.5`}
                    >
                      <span>Inquire About This Service</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center space-x-2.5 mt-6">
          {servicesData.map((_, idx) => (
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
    </section>
  );
}
