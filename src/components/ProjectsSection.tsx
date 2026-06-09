import { useState, useEffect } from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { GithubIcon } from "../types";
import ImageLightbox from "./ImageLightbox";

interface Project {
  id: string;
  title: string;
  description: string;
  previewImage: string;
  previewAlt: string;
  screenshots: string[];
  tech: string[];
  githubUrl: string;
  accentColor: "rose" | "blue" | "emerald";
}

const projectsData: Project[] = [
  {
    id: "elotefruit",
    title: "Elotefruit",
    description: "A vibrant and highly interactive landing page for an artisanal ice cream shop, featuring smooth scroll animations, custom flavor visualizers, and conversion-optimized menu displays.",
    previewImage: "/src/assets/images/Elotefruit/preview.webp",
    previewAlt: "Elotefruit Ice Cream Shop",
    screenshots: [
      "/src/assets/images/Elotefruit/image01.webp",
      "/src/assets/images/Elotefruit/image02.webp",
      "/src/assets/images/Elotefruit/image03.webp",
      "/src/assets/images/Elotefruit/image04.webp",
      "/src/assets/images/Elotefruit/image05.webp",
      "/src/assets/images/Elotefruit/image06.webp",
      "/src/assets/images/Elotefruit/image07.webp",
      "/src/assets/images/Elotefruit/image08.webp",
      "/src/assets/images/Elotefruit/image09.webp",
      "/src/assets/images/Elotefruit/image10.webp",
      "/src/assets/images/Elotefruit/image11.webp",
      "/src/assets/images/Elotefruit/image12.webp",
      "/src/assets/images/Elotefruit/image13.webp",
      "/src/assets/images/Elotefruit/image14.webp",
      "/src/assets/images/Elotefruit/image15.webp",
      "/src/assets/images/Elotefruit/image16.webp",
      "/src/assets/images/Elotefruit/image17.webp",
      "/src/assets/images/Elotefruit/image18.webp",
    ],
    tech: ["HTML", "CSS", "TypeScript", "React", "Tailwind"],
    githubUrl: "https://github.com", // TODO: replace with real repo URL
    accentColor: "rose",
  },
  {
    id: "austinplumbing",
    title: "Austin Plumbing",
    description: "A high-performance landing page built for a local plumbing service, complete with conversion-optimized layouts, programmatic local SEO improvements, structured schema markup, and custom copywritten content to drive user actions.",
    previewImage: "/src/assets/images/AustinPlumbing/preview.webp",
    previewAlt: "Austin Plumbing Landing Page",
    screenshots: [
      "/src/assets/images/AustinPlumbing/image01.webp",
      "/src/assets/images/AustinPlumbing/image02.webp",
      "/src/assets/images/AustinPlumbing/image03.webp",
      "/src/assets/images/AustinPlumbing/image04.webp",
      "/src/assets/images/AustinPlumbing/image05.webp",
      "/src/assets/images/AustinPlumbing/image06.webp",
      "/src/assets/images/AustinPlumbing/image07.webp",
      "/src/assets/images/AustinPlumbing/image08.webp",
      "/src/assets/images/AustinPlumbing/image09.webp",
      "/src/assets/images/AustinPlumbing/image10.webp",
      "/src/assets/images/AustinPlumbing/image11.webp",
      "/src/assets/images/AustinPlumbing/image12.webp",
      "/src/assets/images/AustinPlumbing/image13.webp",
      "/src/assets/images/AustinPlumbing/image14.webp",
      "/src/assets/images/AustinPlumbing/image15.webp",
      "/src/assets/images/AustinPlumbing/image16.webp",
      "/src/assets/images/AustinPlumbing/image17.webp",
      "/src/assets/images/AustinPlumbing/image18.webp",
      "/src/assets/images/AustinPlumbing/image19.webp",
    ],
    tech: ["React", "TypeScript", "Tailwind", "Contentful", "SEO"],
    githubUrl: "https://github.com", // TODO: replace with real repo URL
    accentColor: "blue",
  },
  {
    id: "letterleap",
    title: "Letter Leap",
    description: "A muscle-memory-based spelling application utilizing spaced repetition (SRS) and active recall. Features built-in Web Speech API audio pronunciation, custom typing repetition drills, and timezone-aware daily rollovers.",
    previewImage: "/src/assets/images/LetterLeap/preview.webp",
    previewAlt: "Letter Leap Spelling Application",
    screenshots: [
      "/src/assets/images/LetterLeap/image01.webp",
      "/src/assets/images/LetterLeap/image02.webp",
      "/src/assets/images/LetterLeap/image03.webp",
      "/src/assets/images/LetterLeap/image04.webp",
      "/src/assets/images/LetterLeap/image05.webp",
      "/src/assets/images/LetterLeap/image06.webp",
      "/src/assets/images/LetterLeap/image07.webp",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    githubUrl: "https://github.com", // TODO: replace with real repo URL
    accentColor: "emerald",
  },
];

const chipColors = {
  rose: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20",
  blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
};

export default function ProjectsSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
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
      setActiveSlide((prev) => (prev + 1) % projectsData.length);
    } else if (isRightSwipe) {
      setActiveSlide((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    }
  };

  // Auto-slide effect for mobile view
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % projectsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const handleOpenLightbox = (projectIndex: number) => {
    setActiveProjectIdx(projectIndex);
    setActiveImageIdx(0);
    setLightboxOpen(true);
  };

  const activeProject = projectsData[activeProjectIdx];

  return (
    <section 
      id="projects" 
      aria-label="Personal projects"
      className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
    >
      {/* Header */}
      <div className="text-left max-w-3xl mb-16">
        <span className="inline-block text-xs font-mono text-[#63B3ED] uppercase tracking-wider mb-2">
          CRAFTED PROJECTS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Personal Projects — <br />
          <span className="text-[#63B3ED]">Real Code, Real Craft.</span>
        </h2>
        <p className="mt-4 text-sm max-w-xl transition-colors text-slate-600 dark:text-gray-400">
          I don't display simple Todo list apps. These are functional open-source models, engines, and trackers created from scratch to test high-traffic stress.
        </p>
      </div>

      {/* Desktop View (Static Grid) */}
      <div className="hidden md:grid grid-cols-3 gap-8">
        {projectsData.map((project, idx) => {
          return (
            <article 
              key={project.id}
              className="rounded-3xl border overflow-hidden transition-all flex flex-col justify-between bg-slate-50 border-gray-200 shadow-sm dark:bg-[#0D1422]/90 dark:border-[#63B3ED]/25"
            >
              {/* Visual Header representing project preview */}
              <div className="relative aspect-video overflow-hidden border-b transition-colors border-slate-200 dark:border-gray-700/20">
                <img 
                  src={project.previewImage} 
                  alt={project.previewAlt} 
                  loading="lazy"
                  width={640}
                  height={360}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-xs mb-4 transition-colors text-slate-600 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.tech.map((chip) => (
                      <span 
                        key={chip} 
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                          chipColors[project.accentColor]
                        }`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* GitHub & Live demo buttons */}
                  <div className="flex items-center justify-between pt-4 border-t transition-colors border-slate-200 dark:border-gray-700/20">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs font-mono flex items-center space-x-1 transition-colors text-slate-505 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>

                    <button 
                      onClick={() => handleOpenLightbox(idx)}
                      className="text-xs font-mono hover:underline flex items-center space-x-1 cursor-pointer transition-colors text-blue-600 dark:text-[#63B3ED]"
                    >
                      <span>View Images</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
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
          {projectsData.map((project, idx) => {
            return (
              <div key={project.id} className="w-full shrink-0 px-1">
                <article 
                  className="rounded-3xl border overflow-hidden transition-all flex flex-col justify-between bg-slate-50 border-gray-200 shadow-sm dark:bg-[#0D1422]/90 dark:border-[#63B3ED]/25"
                >
                  {/* Visual Header representing project preview */}
                  <div className="relative aspect-video overflow-hidden border-b transition-colors border-slate-200 dark:border-gray-700/20">
                    <img 
                      src={project.previewImage} 
                      alt={project.previewAlt} 
                      loading="lazy"
                      width={640}
                      height={360}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-xs mb-4 transition-colors text-slate-600 dark:text-gray-400">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech chips */}
                      <div className="flex flex-wrap gap-1 mb-6">
                        {project.tech.map((chip) => (
                          <span 
                            key={chip} 
                            className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                              chipColors[project.accentColor]
                            }`}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      {/* GitHub & Live demo buttons */}
                      <div className="flex items-center justify-between pt-4 border-t transition-colors border-slate-200 dark:border-gray-700/20">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs font-mono flex items-center space-x-1 transition-colors text-slate-505 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>

                        <button 
                          onClick={() => handleOpenLightbox(idx)}
                          className="text-xs font-mono hover:underline flex items-center space-x-1 cursor-pointer transition-colors text-blue-600 dark:text-[#63B3ED]"
                        >
                          <span>View Images</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center space-x-2.5 mt-6">
          {projectsData.map((_, idx) => (
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

      {/* Honest label */}
      <div className="mt-8 text-center px-4">
        <p className="text-xs font-mono px-4 py-2.5 rounded-2xl sm:rounded-full inline-block max-w-full text-left sm:text-center border transition-all text-slate-600 bg-blue-50 border-blue-200/60 dark:text-gray-400 dark:bg-blue-500/5 dark:border-blue-500/10">
          <ShieldCheck className="w-4 h-4 text-blue-500 dark:text-[#63B3ED] inline-block mr-1 align-text-bottom shrink-0" /> <strong>Personal Projects Statement:</strong> Real code, real craft. (I build every project with obsessive attention to detail, ready for client deployment. No lazy copy-pasting.)
        </p>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={activeProject.screenshots}
          currentIndex={activeImageIdx}
          setCurrentIndex={setActiveImageIdx}
          projectTitle={activeProject.title}
          accentColor={activeProject.accentColor}
        />
      )}
    </section>
  );
}
