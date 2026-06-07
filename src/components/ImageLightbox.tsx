import React, { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  projectTitle: string;
  accentColor?: string; // 'rose' | 'blue' | 'emerald'
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
  projectTitle,
  accentColor = "blue",
}: ImageLightboxProps) {
  const [animate, setAnimate] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Touch swipe states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  // Trigger entering animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Reset load state when active image changes
  useEffect(() => {
    setIsLoaded(false);
  }, [currentIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length]);

  // Auto-scroll active thumbnail into center view
  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for transition animation (300ms)
  };

  const handleNext = () => {
    if (images.length <= 1) return;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length <= 1) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  // Touch Swipe handlers
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
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!isOpen) return null;

  // Dynamic borders mapping
  const borderClasses: Record<string, string> = {
    rose: "border-rose-500",
    blue: "border-blue-500",
    emerald: "border-emerald-500",
  };
  const activeBorder = borderClasses[accentColor] || "border-blue-500";

  return (
    <div
      className={`fixed inset-0 z-[9900] flex flex-col items-center justify-center p-4 transition-all duration-300 ease-out select-none ${
        animate
          ? "bg-slate-950/85 backdrop-blur-xl opacity-100"
          : "bg-slate-950/0 backdrop-blur-none opacity-0"
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Header Info & Close button */}
      <div
        className={`w-full max-w-5xl flex justify-between items-center mb-2 md:mb-4 transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-left">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
            {projectTitle}
          </span>
          <span className="text-white text-sm font-mono font-medium">
            {currentIndex + 1} <span className="text-gray-600">/</span> {images.length}
          </span>
        </div>

        <button
          onClick={handleClose}
          className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Close image lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Viewport */}
      <div
        className={`relative w-full max-w-5xl flex items-center justify-center flex-1 my-2 transition-all duration-300 ease-out ${
          animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation - Prev */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-200 group hidden sm:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}

        {/* Image Frame */}
        <div className="relative max-w-full max-h-[60vh] md:max-h-[65vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-slate-900/40">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          <img
            src={images[currentIndex]}
            alt={`${projectTitle} screenshot ${currentIndex + 1}`}
            onLoad={() => setIsLoaded(true)}
            className={`max-w-full max-h-[60vh] md:max-h-[65vh] object-contain transition-all duration-300 ease-out rounded-2xl ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        </div>

        {/* Navigation - Next */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-200 group hidden sm:block"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Horizontal Thumbnail Slider */}
      {images.length > 1 && (
        <div
          className={`w-full max-w-4xl mt-3 px-4 md:px-8 transition-all duration-300 ease-out ${
            animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={thumbnailContainerRef}
            className="flex items-center gap-2.5 overflow-x-auto py-2.5 px-3 snap-x justify-start md:justify-center rounded-xl bg-white/5 border border-white/5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
          >
            {images.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  ref={isActive ? activeThumbnailRef : null}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-10 md:w-24 md:h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 bg-slate-900 snap-center outline-none ${
                    isActive
                      ? `${activeBorder} scale-105 shadow-md shadow-black/40 opacity-100 z-10`
                      : "border-transparent opacity-45 hover:opacity-85 hover:scale-102"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${projectTitle} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-white/5 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
