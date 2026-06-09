import { useEffect, useRef, useState, useMemo } from "react";

// Detect if the device is a touch/mobile device (no hover support)
const isMobileDevice = () => typeof window !== 'undefined' && (window.matchMedia('(hover: none)').matches || 'ontouchstart' in window);

interface HeroBackgroundProps {
  isDark: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  offsetX: number;
  offsetY: number;
}

export default function HeroBackground({ isDark }: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const isMobile = useMemo(() => isMobileDevice(), []);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // 1. Track cursor positions relative to container and window for Parallax and Canvas pulling
  // Skip mouse tracking entirely on mobile — no cursor to track
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate coordinates relative to the canvas container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Mouse is active only if it is within or near the hero section
      if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }

      // Parallax shifts based on screen center coordinates
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const pctX = (e.clientX - centerX) / centerX;
      const pctY = (e.clientY - centerY) / centerY;
      setParallaxOffset({ x: pctX, y: pctY });
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  // 2. Initialize and run Interactive Neural Network on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Scale canvas to match viewport/DPI — cap DPR on mobile to reduce GPU load
    const mobile = isMobileDevice();
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas || !ctx) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Cap DPR at 1.5 on mobile to avoid massive canvas buffers on 3x screens
      const dpr = mobile ? Math.min(window.devicePixelRatio || 1, 1.5) : (window.devicePixelRatio || 1);
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Reduce particle count on mobile for smoother animation
      const count = mobile ? 18 : (rect.width < 768 ? 30 : 65);
      particles = [];
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.35, // Slow drifting velocities
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1.2, // Delicate nodes
          alpha: Math.random() * 0.4 + 0.25, // Soft opacity values
          offsetX: 0,
          offsetY: 0,
        });
      }
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let isIntersecting = true;
    let observer: IntersectionObserver | null = null;

    // Main Canvas Render Loop
    // On mobile, skip every other frame to reduce GPU load (30fps instead of 60fps)
    let frameCount = 0;
    const draw = () => {
      if (!canvas || !ctx || !isIntersecting) return;
      
      frameCount++;
      if (mobile && frameCount % 2 !== 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Node Physics Update
      particles.forEach((p) => {
        // Base drift translation
        p.x += p.vx;
        p.y += p.vy;

        // Clean wrapping behavior
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        if (p.y > height + 15) p.y = -15;

        // Cursor attraction physics
        let isAttracted = false;
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attractionRadius = 220;

          if (dist < attractionRadius) {
            // Easing force pulling nodes toward cursor (inverse square relationship)
            const strength = Math.pow(1 - dist / attractionRadius, 1.8) * 0.25;
            const targetOffsetX = dx * strength;
            const targetOffsetY = dy * strength;

            // Interpolate toward the target pull offset
            p.offsetX += (targetOffsetX - p.offsetX) * 0.08;
            p.offsetY += (targetOffsetY - p.offsetY) * 0.08;
            isAttracted = true;
          }
        }

        // Return gracefully to base drift paths if mouse is far/inactive
        if (!isAttracted) {
          p.offsetX += (0 - p.offsetX) * 0.06;
          p.offsetY += (0 - p.offsetY) * 0.06;
        }
      });

      // 2a. Draw interconnecting cords (edges) between drifting nodes
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const p1x = p1.x + p1.offsetX;
        const p1y = p1.y + p1.offsetY;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const p2x = p2.x + p2.offsetX;
          const p2y = p2.y + p2.offsetY;

          const dx = p2x - p1x;
          const dy = p2y - p1y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 115;

          if (dist < maxDist) {
            // Distance-based fade
            const lineOpacity = (1 - dist / maxDist) * p1.alpha * (isDark ? 0.28 : 0.45);
            ctx.strokeStyle = isDark
              ? `rgba(6, 182, 212, ${lineOpacity})`  // Neon cyan
              : `rgba(37, 99, 235, ${lineOpacity})`; // Vibrant blue (more visible)
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.stroke();
          }
        }
      }

      // 2b. Draw nodes and connections to cursor
      particles.forEach((p) => {
        const px = p.x + p.offsetX;
        const py = p.y + p.offsetY;

        // Draw particle node
        ctx.fillStyle = isDark
          ? `rgba(34, 211, 238, ${p.alpha})` // Cyan-400
          : `rgba(29, 78, 216, ${p.alpha * 1.25})`; // Darker Blue-700 for better visibility in light mode
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Core/Center of node
        ctx.fillStyle = isDark ? "#ffffff" : "#ffffff";
        ctx.beginPath();
        ctx.arc(px, py, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Draw soft-connecting cord to user cursor
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - px;
          const dy = mouseRef.current.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const cordRadius = 190;

          if (dist < cordRadius) {
            const cordOpacity = (1 - dist / cordRadius) * (isDark ? 0.25 : 0.4);
            ctx.strokeStyle = isDark
              ? `rgba(0, 240, 255, ${cordOpacity})` // Glowing neon cyan
              : `rgba(29, 78, 216, ${cordOpacity})`; // Glowing neon blue
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(px, py);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      isIntersecting = false;
      observer = new IntersectionObserver(
        ([entry]) => {
          const wasIntersecting = isIntersecting;
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && !wasIntersecting) {
            cancelAnimationFrame(animationFrameId);
            draw();
          } else if (!isIntersecting) {
            cancelAnimationFrame(animationFrameId);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
    >
      {/* 3D Liquid Orbs Layer (Drifting deep behind screen) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* Orb 1: Top Left - Detailed in Indigo, Violet & Deep Navy */}
        <div
          className="absolute top-[-10%] left-[-8%] w-[260px] h-[260px] md:w-[480px] md:h-[480px] rounded-full blur-[60px] md:blur-[130px] opacity-45 transition-transform duration-700 ease-out z-0 will-change-transform"
          style={{
            transform: `translate3d(${parallaxOffset.x * -45}px, ${parallaxOffset.y * -45}px, 0)`,
          }}
        >
          <div
            className={`w-full h-full rounded-full animate-orb-float-1 ${
              isDark
                ? "bg-gradient-to-br from-[#08112d] via-[#1e3a8a]/35 to-[#312e81]/25"
                : "bg-gradient-to-br from-[#1E3A8A]/35 via-[#3B82F6]/25 to-[#00F0FF]/15"
            }`}
          ></div>
        </div>

        {/* Orb 2: Bottom Right - Neon Blues & Teal highlights */}
        <div
          className="absolute bottom-[-8%] right-[-10%] w-[260px] h-[260px] md:w-[560px] md:h-[560px] rounded-full blur-[60px] md:blur-[140px] opacity-40 transition-transform duration-700 ease-out z-0 will-change-transform"
          style={{
            transform: `translate3d(${parallaxOffset.x * -25}px, ${parallaxOffset.y * -25}px, 0)`,
          }}
        >
          <div
            className={`w-full h-full rounded-full animate-orb-float-2 ${
              isDark
                ? "bg-gradient-to-tr from-[#020617] via-[#0369a1]/25 to-[#1d4ed8]/15"
                : "bg-gradient-to-tr from-[#1E3A8A]/35 via-[#0284C7]/20 to-[#00F0FF]/15"
            }`}
          ></div>
        </div>

        {/* Orb 3: Middle Right - Warm Violet & Pink accents */}
        <div
          className="absolute top-[35%] right-[8%] w-[180px] h-[180px] md:w-[400px] md:h-[400px] rounded-full blur-[50px] md:blur-[120px] opacity-35 transition-transform duration-700 ease-out z-0 will-change-transform"
          style={{
            transform: `translate3d(${parallaxOffset.x * -60}px, ${parallaxOffset.y * -60}px, 0)`,
          }}
        >
          <div
            className={`w-full h-full rounded-full animate-orb-float-3 ${
              isDark
                ? "bg-gradient-to-l from-[#311042] via-[#581c87]/25 to-[#831843]/15"
                : "bg-gradient-to-l from-[#2E1065]/35 via-[#7C3AED]/20 to-[#EC4899]/15"
            }`}
          ></div>
        </div>

      </div>

      {/* HTML5 Canvas Particle Cluster (Interactive Neural Network) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 opacity-75 dark:opacity-85 mix-blend-normal pointer-events-none will-change-[transform]"
      />
    </div>
  );
}
