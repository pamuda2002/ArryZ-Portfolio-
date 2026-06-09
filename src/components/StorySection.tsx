import { useState } from "react";
import { Award, Volume2, Laptop, Zap, Gamepad2, Target, Landmark, Atom, Scale, Bot, Globe } from "lucide-react";

// Preset file contents for coder simulator
const codeFiles: Record<string, string> = {
  "app.tsx": `// High-Converting Landing Page Component
import React from 'react';
import { Hero, TrustBadges, LeadForm } from './components';

export default function LandingApp() {
  return (
    <div className="min-h-screen font-sans bg-brand-bg select-none">
      <Hero 
        headline="Unconventional growth for local businesses"
        subtext="Guaranteed 3.5x boost in daily organic inbound leads" 
      />
      <TrustBadges label="Verified Local Customers" />
      <LeadForm placeholder="Enter business email" />
    </div>
  );
}`,
  "main.py": `# Neural network spark for local AI predictions
import numpy as np

class SparkPredictor:
    def __init__(self, weights_init="random"):
        self.learning_rate = 0.037 # Homage to AlphaGo Move 37
        self.weights = np.array([0.42, 0.99, 0.19, 0.88])
        
    def predict_client_conversion(self, load_speed, mobile_friendly, seo_score):
        features = np.array([load_speed, mobile_friendly, seo_score, 1.0])
        score = np.dot(self.weights, features)
        return 1.0 / (1.0 + np.exp(-score)) # Sigmoid activation`,
  "seo.ts": `// On-page technical SEO & schema rules
export const buildLocalBusinessSchema = (business: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name || "Premium Client Business",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": business.city || "London",
      "addressCountry": business.countryCode || "GB"
    },
    "description": "Programmatic high-speed SEO Landing hub.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "24"
    }
  };
};`,
  "db.sql": `-- Clean scalable DB configuration with constraints
CREATE TABLE IF NOT EXISTS client_leads (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  project_scope VARCHAR(50) DEFAULT 'landing_page',
  estimated_budget NUMERIC(10,2) CHECK (estimated_budget > 0),
  submitted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_email ON client_leads(email);`
};

export default function StorySection() {
  // Active Story Chapter beat (1 to 4)
  const [activeStoryChapter, setActiveStoryChapter] = useState(1);

  // Interactive AlphaGo Board Simulator State
  const [goBoard, setGoBoard] = useState<(string | null)[]>(() => {
    const initial = Array(25).fill(null);
    // Move 37 recreation presets (0-indexed indices for 5x5: 0 to 24)
    initial[7] = "W";  // (1,2)
    initial[8] = "B";  // (1,3)
    initial[12] = "W"; // (2,2)
    initial[13] = "B"; // (2,3)
    initial[17] = "W"; // (3,2)
    return initial;
  });
  const [goStatus, setGoStatus] = useState("AlphaGo just played Move 37 (Unconventional & Creative). Press any spot to challenge!");

  // Interactive Podcast worldview radio audio player simulator
  const [activePodcast, setActivePodcast] = useState("history");

  // Simulated Code Directory Explorer state
  const [activeCodeFile, setActiveCodeFile] = useState("app.tsx");

  // Handle AlphaGo Go board simulation tap
  const handleGoBoardClick = (index: number) => {
    if (goBoard[index] !== null) return;
    const nextBoard = [...goBoard];
    nextBoard[index] = "B"; // User plays black stone

    // Simple automatic countermove by simulated AlphaGo
    let nextAvailable = -1;
    for (let i = 0; i < nextBoard.length; i++) {
      if (nextBoard[i] === null) {
        nextAvailable = i;
        break;
      }
    }

    if (nextAvailable !== -1) {
      nextBoard[nextAvailable] = "W";
    }

    setGoBoard(nextBoard);
    setGoStatus("You placed a Black stone. AI countered instantly. 'Unconventional paths defeat predetermined algorithms.'");
  };

  // Reset Go board
  const resetGoBoard = () => {
    const initial = Array(25).fill(null);
    initial[7] = "W";
    initial[8] = "B";
    initial[12] = "W";
    initial[13] = "B";
    initial[17] = "W";
    setGoBoard(initial);
    setGoStatus("AlphaGo Move 37 simulator reset. Tap any intersection to explore!");
  };

  return (
    <section 
      id="story" 
      aria-label="My origin story"
      className="py-28 relative overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-[#0a0f18]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#7C3AED]">Origin Story</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-[#7C3AED] mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-gray-400">
            Dropped out of high school. Learned from first principles. Built different.
          </p>
        </div>

        {/* Interactive Chapter Indicator Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {[
            { num: 1, title: "1. The Spark", icon: Zap, activeColor: "border-yellow-500 text-yellow-400" },
            { num: 2, title: "2. The Detour", icon: Gamepad2, activeColor: "border-rose-500 text-rose-400" },
            { num: 3, title: "3. The Build", icon: Laptop, activeColor: "border-cyan-500 text-cyan-400" },
            { num: 4, title: "4. The Mission", icon: Target, activeColor: "border-emerald-500 text-emerald-400" }
          ].map((ch) => {
            const IconComponent = ch.icon;
            return (
              <button
                key={ch.num}
                onClick={() => setActiveStoryChapter(ch.num)}
                className={`p-2.5 sm:p-4 rounded-xl border text-center font-display transition-all flex items-center justify-center text-xs sm:text-sm ${
                  activeStoryChapter === ch.num
                    ? `bg-blue-500/10 dark:bg-[#1B3A6B]/25 font-bold scale-102 ${ch.activeColor}`
                    : `border-gray-200 dark:border-gray-700/25 bg-gray-50 dark:bg-black/10 text-slate-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-black/20 hover:text-slate-800 dark:hover:text-gray-300`
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 shrink-0 ${activeStoryChapter === ch.num ? "" : "opacity-60"}`} />
                <span className="truncate">{ch.title}</span>
              </button>
            );
          })}
        </div>

        {/* Horizontal progress indicators */}
        <div className="w-full bg-gray-700/25 h-1.5 rounded-full overflow-hidden mb-12">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-[#7C3AED] to-emerald-500 transition-all duration-500" 
            style={{ width: `${(activeStoryChapter / 4) * 100}%` }}
          ></div>
        </div>

        {/* Chapter Beats Display Panel */}
        <div className="min-h-[500px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Story text panel (col-span-7) */}
          <div className="lg:col-span-7 p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1422]/80 border-gray-200 dark:border-[#63B3ED]/15 border flex flex-col justify-between relative overflow-hidden shadow-2xl">
            
            {/* Massive Chapter Number Watermark (opacity 5-8%) */}
            <div className="absolute right-0 bottom-0 text-[260px] sm:text-[340px] font-display font-extrabold text-slate-200/40 dark:text-[#63B3ED]/5 select-none pointer-events-none leading-none -mb-16 -mr-8 font-mono">
              {activeStoryChapter}
            </div>

            {/* Story Beats logic */}
            {activeStoryChapter === 1 && (
              <div className="space-y-6 relative z-10 text-left">
                <div className="flex items-center space-x-3 text-yellow-400">
                  <Zap className="w-5 h-5" />
                  <span className="font-mono text-sm font-bold tracking-widest uppercase">CHAPTER 1: THE SPARK (2016)</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Watching AlphaGo Defeat the World Champion.
                </h3>

                <blockquote className="border-l-4 border-yellow-500 pl-4 py-1 italic text-lg transition-colors text-slate-700 dark:text-gray-300">
                  "I was a school kid in Sri Lanka when I watched an AI defeat the world's best Go player. I didn't fully understand it — but I knew I wanted to be part of that world."
                </blockquote>

                <p className="text-sm leading-relaxed transition-colors text-slate-600 dark:text-gray-400">
                  AlphaGo vs Lee Sedol, 2016. That was the pivotal moment that changed my destiny. Seeing machines play Move 37—an action human grandmasters called a 'beautiful anomaly'—sparked a lifelong obsession with technology. I resolved to teach myself how software and intelligence are built from zero.
                </p>

                <div className="p-4 rounded-xl border flex items-start space-x-2 text-xs transition-colors bg-yellow-50 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/25">
                  <Award className="w-5 h-5 flex-shrink-0 text-yellow-500 mt-0.5" />
                  <span><strong>Discovery Hook:</strong> AI is the ultimate goal. Taught myself Python to read research papers before I even learned high school algorithms.</span>
                </div>
              </div>
            )}

            {activeStoryChapter === 2 && (
              <div className="space-y-6 relative z-10 text-left">
                <div className="flex items-center space-x-3 text-rose-400">
                  <Gamepad2 className="w-5 h-5" />
                  <span className="font-mono text-sm font-bold tracking-widest uppercase">CHAPTER 2: THE DETOUR (2019)</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Leaving High School for a Global Worldview.
                </h3>

                <blockquote className="border-l-4 border-rose-500 pl-4 py-1 italic text-lg transition-colors text-slate-700 dark:text-gray-300">
                  "I dropped out of A-levels. Not because I stopped caring — because I needed to learn differently. I spent years gaming, listening to podcasts on history, science, politics, AI. I was building a worldview."
                </blockquote>

                <p className="text-sm leading-relaxed transition-colors text-slate-600 dark:text-gray-400">
                  The traditional high school education path in Sri Lanka felt limited. I left the A-levels path to construct my own knowledge hub. By immersing myself in high-level research podcasts, audiobooks, and global strategy gaming, I developed extreme focus and English language mastery. I learned how systems interact, preparing myself for digital entrepreneurship.
                </p>

                <div className="p-4 rounded-xl border flex items-start space-x-2 text-xs transition-colors bg-rose-50 dark:bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-500/25">
                  <Volume2 className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
                  <span><strong>Unconventional Advantage:</strong> Free from rote memorization, I approached programming with fresh, problem-solving eyes.</span>
                </div>
              </div>
            )}

            {activeStoryChapter === 3 && (
              <div className="space-y-6 relative z-10 text-left">
                <div className="flex items-center space-x-3 text-cyan-400">
                  <Laptop className="w-5 h-5" />
                  <span className="font-mono text-sm font-bold tracking-widest uppercase">CHAPTER 3: THE BUILD (2021)</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Obsessive Taught Python, JS, React & Databases.
                </h3>

                <blockquote className="border-l-4 border-cyan-500 pl-4 py-1 italic text-lg transition-colors text-slate-700 dark:text-gray-300">
                  "I taught myself Python. Then HTML, CSS, JavaScript. Then React, Node.js, PostgreSQL, TypeScript, Next.js. No degree. No internship. Just obsessive learning and building."
                </blockquote>

                <p className="text-sm leading-relaxed transition-colors text-slate-600 dark:text-gray-400">
                  Without university guide rails, my education was validated purely by functional code. I built scrapers, automated scripts, custom web backends, and responsive user interfaces. I coded through electricity power cuts, laptop failures, and absolute isolation to achieve true technological competence.
                </p>

                <div className="p-4 rounded-xl border flex items-start space-x-2 text-xs transition-colors bg-cyan-50 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/25">
                  <Laptop className="w-5 h-5 flex-shrink-0 text-cyan-500 mt-0.5" />
                  <span><strong>Real-World Skill:</strong> Because my survival depended on it, my code is clean, production-ready, and focuses heavily on high conversions.</span>
                </div>
              </div>
            )}

            {activeStoryChapter === 4 && (
              <div className="space-y-6 relative z-10 text-left">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Target className="w-5 h-5" />
                  <span className="font-mono text-sm font-bold tracking-widest uppercase">CHAPTER 4: THE MISSION (PRESENT)</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Funding the AI Journey, One Landing Page at a Time.
                </h3>

                <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 italic text-lg transition-colors text-slate-700 dark:text-gray-300">
                  "AI is still the destination. Web development is how I fund the journey — and build something real along the way. Right now, I help small businesses grow online. One landing page at a time."
                </blockquote>

                <p className="text-sm leading-relaxed transition-colors text-slate-600 dark:text-gray-400">
                  I treat local businesses like rocket ships. I do not design lazy templated pages; I build highly targeted sales tools with instant loading speeds, semantic SEO architecture, and convincing copy. By working with me, clients fund the dream of an independent Sri Lankan AI laboratory.
                </p>

                <div className="p-4 rounded-xl border flex items-start space-x-2 text-xs transition-colors bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/25">
                  <Zap className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
                  <span><strong>Mutual Success:</strong> When your sales grow, I build my technological future. Win-win partnership.</span>
                </div>
              </div>
            )}

            {/* Progress control buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-700/20 z-10">
              <button
                disabled={activeStoryChapter === 1}
                onClick={() => setActiveStoryChapter((p) => p - 1)}
                className={`text-xs font-mono font-bold px-3 py-1.5 rounded border transition-all ${
                  activeStoryChapter === 1 
                    ? "opacity-35 cursor-not-allowed border-gray-200 dark:border-transparent" 
                    : "bg-blue-50 dark:bg-[#1B3A6B]/20 text-[#2563EB] dark:text-[#63B3ED] border-blue-200 dark:border-transparent hover:bg-blue-100 dark:hover:bg-[#1B3A6B]/40"
                }`}
              >
                &larr; Previous Beat
              </button>

              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((num) => (
                  <span 
                    key={num} 
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeStoryChapter === num ? "bg-[#2563EB] dark:bg-[#63B3ED] scale-125" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></span>
                ))}
              </div>

              <button
                disabled={activeStoryChapter === 4}
                onClick={() => setActiveStoryChapter((p) => p + 1)}
                className={`text-xs font-mono font-bold px-3 py-1.5 rounded transition-all ${
                  activeStoryChapter === 4 
                    ? "opacity-35 cursor-not-allowed" 
                    : "bg-[#2563EB] text-white hover:bg-blue-700 dark:bg-[#63B3ED]/25 dark:text-white dark:hover:bg-[#63B3ED]/40"
                }`}
              >
                Next Beat &rarr;
              </button>
            </div>

          </div>

          {/* Interactive Visual Playground panel on the right (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Box 1: Dynamic Simulator aligned with Chapter */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#F0F4FF] dark:bg-[#0D1422] border-blue-100 dark:border-gray-800 border flex-1 flex flex-col justify-between">
              
              {activeStoryChapter === 1 && (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono transition-colors text-slate-500 dark:text-gray-400">Interactive Go Board (Move 37)</span>
                    <button 
                      onClick={resetGoBoard}
                      className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20"
                    >
                      Reset
                    </button>
                  </div>

                  <p className="text-xs transition-colors text-slate-600 dark:text-gray-400">
                    The board below is primed. DeepMind's AI took a path humans deemed impossible. Try placing your own black stone!
                  </p>

                  {/* Simple Go Grid */}
                  <div className="p-4 rounded-xl border max-w-[200px] mx-auto transition-colors bg-amber-600/10 dark:bg-amber-900/40 border-amber-600/20 dark:border-amber-900/60">
                    <div className="grid grid-cols-5 gap-3">
                      {goBoard.map((stone, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleGoBoardClick(idx)}
                          className="w-6 h-6 rounded-full border border-amber-950/60 flex items-center justify-center transition-all relative"
                          style={{
                            backgroundColor: stone === "W" ? "#FFFFFF" : stone === "B" ? "#09090B" : "rgba(245, 158, 11, 0.15)",
                            boxShadow: stone ? "0 4px 6px rgba(0,0,0,0.3)" : "none"
                          }}
                        >
                          {!stone && <span className="w-1.5 h-1.5 bg-amber-950/30 rounded-full"></span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-mono text-center p-2 rounded border transition-colors text-blue-700 dark:text-[#63B3ED] bg-blue-50 dark:bg-[#63B3ED]/5 border-blue-200/60 dark:border-[#63B3ED]/10">
                    {goStatus}
                  </p>
                </div>
              )}

              {activeStoryChapter === 2 && (
                <div className="space-y-4 text-left">
                  <span className="text-xs font-mono transition-colors text-slate-500 dark:text-gray-400">Worldview Podcast Radio (Simulated)</span>
                  <p className="text-xs transition-colors text-slate-600 dark:text-gray-400">
                    During my detour, I didn't stop studying. I listened to hours of first-principles knowledge. Toggle the frequencies below:
                  </p>

                  <div className="space-y-2">
                    {[
                      { id: "history", title: "Fall of Civilizations & Systems", length: "1h 42m", icon: Landmark },
                      { id: "science", title: "Quantum Physics & Computing", length: "48m", icon: Atom },
                      { id: "politics", title: "Game Theory & Global Politics", length: "2h 05m", icon: Scale },
                      { id: "ai", title: "Lex Fridman AI & Deep Learning", length: "3h 15m", icon: Bot }
                    ].map((pod) => {
                      const IconComponent = pod.icon;
                      return (
                        <button
                          key={pod.id}
                          onClick={() => setActivePodcast(pod.id)}
                          className={`w-full p-2 text-left rounded-lg text-xs font-mono flex items-center justify-between border transition-all ${
                            activePodcast === pod.id
                              ? "bg-rose-50 dark:bg-rose-500/10 border-rose-300 dark:border-rose-500/50 text-rose-700 dark:text-rose-300 font-semibold"
                              : "bg-white/80 dark:bg-black/10 border-blue-100/50 dark:border-transparent text-slate-600 dark:text-gray-500 hover:text-slate-900 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-black/20 hover:border-blue-200"
                          }`}
                        >
                          <span className="truncate flex items-center">
                            <IconComponent className={`w-3.5 h-3.5 mr-2 ${
                              activePodcast === pod.id ? "text-rose-400" : "text-gray-500 opacity-60"
                            } ${pod.id === "science" ? "animate-spin-slow" : ""}`} />
                            <span>{pod.title}</span>
                          </span>
                          <span className="opacity-60 shrink-0 text-[10px] ml-2">{pod.length}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl flex items-center space-x-3 transition-colors bg-white dark:bg-black/20 border border-blue-100 dark:border-transparent">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <div className="flex-1 text-[11px] font-mono truncate transition-colors text-rose-600 dark:text-rose-400 font-semibold dark:font-normal">
                      Currently Tuning: {activePodcast.toUpperCase()} Podcast Beat
                    </div>
                  </div>
                </div>
              )}

              {activeStoryChapter === 3 && (
                <div className="space-y-4 text-left">
                  <span className="text-xs font-mono transition-colors text-slate-500 dark:text-gray-400">Taught Code Library Preview</span>
                  <p className="text-xs transition-colors text-slate-600 dark:text-gray-400">
                    I build clean files. Click to inspect one of my early self-taught programming beats:
                  </p>

                  <div className="flex space-x-1.5 border-b pb-2 border-blue-100 dark:border-gray-700/30">
                    {["app.tsx", "main.py", "seo.ts", "db.sql"].map((fileName) => (
                      <button
                        key={fileName}
                        onClick={() => setActiveCodeFile(fileName)}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                          activeCodeFile === fileName
                            ? "bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 font-semibold dark:font-normal"
                            : "text-slate-500 dark:text-gray-500 hover:text-slate-800 dark:hover:text-gray-300"
                        }`}
                      >
                        {fileName}
                      </button>
                    ))}
                  </div>

                  <pre className="p-3 rounded-xl text-[9px] font-mono overflow-x-auto max-h-44 border leading-tight transition-colors bg-white dark:bg-[#040811] text-cyan-800 dark:text-[#22D3EE] border-cyan-100 dark:border-cyan-500/20">
                    <code>{codeFiles[activeCodeFile]}</code>
                  </pre>

                  <div className="text-[10px] text-center italic text-slate-500 dark:text-gray-400">
                    "Clean linted files, ready to launch without errors."
                  </div>
                </div>
              )}

              {activeStoryChapter === 4 && (
                <div className="space-y-4 text-left">
                  <span className="text-xs font-mono transition-colors text-slate-500 dark:text-gray-400">Local Small Business Conversion Engine</span>
                  <p className="text-xs transition-colors text-slate-600 dark:text-gray-400">
                    Most developers focus on code. I focus on client revenues. This is the math I engineer:
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl border transition-colors bg-white dark:bg-black/20 border-blue-100 dark:border-emerald-500/10">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-gray-400">Standard Template Page</span>
                        <span className="text-red-600 dark:text-red-400 font-semibold dark:font-normal">1.2% Conversion</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full mt-1.5 transition-colors bg-slate-100 dark:bg-gray-700/30">
                        <div className="h-full rounded-full bg-red-500 dark:bg-red-400" style={{ width: "12%" }}></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border transition-colors bg-emerald-50 dark:bg-black/20 border-emerald-200 dark:border-emerald-500/25">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-emerald-800 dark:text-emerald-400">ArryZ Optimized Landing</span>
                        <span className="text-emerald-700 dark:text-emerald-400">6.8% Conversion</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full mt-1.5 transition-colors bg-emerald-100 dark:bg-gray-700/30">
                        <div className="h-full rounded-full animate-pulse bg-emerald-500 dark:bg-emerald-400" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono p-2 rounded text-center border transition-colors flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/5 border-emerald-100 dark:border-transparent">
                    <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Over 5x performance improvement.</span>
                  </p>
                </div>
              )}

            </div>

            {/* Box 2: Quote highlight */}
            <div className="p-4 rounded-2xl border text-xs font-mono flex items-center justify-between bg-white dark:bg-[#0D1422]/40 border-gray-200 dark:border-gray-800">
              <span className="opacity-60">Status: Taught in Sri Lanka</span>
              <span className="text-blue-600 dark:text-[#63B3ED] font-bold flex items-center gap-1.5">
                <span>Active Worldwide</span>
                <Globe className="w-3.5 h-3.5 animate-spin-slow" />
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
