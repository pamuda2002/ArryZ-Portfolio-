import { useState } from "react";
import type { FormEvent } from "react";
import { MapPin, Terminal, Check, Send, ShieldCheck } from "lucide-react";
import { GithubIcon, InstagramIcon, XIcon, WhatsappIcon } from "../types";
import SriLankaFlag from "../assets/icons/Sri_Lanka_flag.svg";

interface ContactSectionProps {
  isDark: boolean;
  contactMessage: string;
  setContactMessage: (message: string) => void;
}

export default function ContactSection({ isDark, contactMessage, setContactMessage }: ContactSectionProps) {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert("Please fill in all telemetry parameters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mvznargg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          message: contactMessage,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "An error occurred while submitting the form. Please try again.");
      }
    } catch (error) {
      alert("A networking transmission failure happened. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact and hire"
      className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Column - Contact Copy & Info */}
        <div className="lg:col-span-5 text-left space-y-6">

          <div className="inline-block text-xs font-mono text-[#63B3ED] uppercase tracking-wider">
            GET IN TOUCH
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Have a project? <br />
            Let's build something <span className="text-[#2563eb]">worth finding.</span>
          </h2>

          <p className={`text-base leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            I respond personally to every inquiry within 8 hours. Sri Lanka local time is GMT+5:30. Available for remote contract work worldwide.
          </p>

          <div className="space-y-4 pt-4">

            <div className="flex items-center space-x-3 text-sm">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 font-mono">Location</span>
                <span className="font-semibold flex items-center gap-1.5">
                  Tambuttegama, Sri Lanka
                  <img src={SriLankaFlag} className="w-4.5 h-3 object-cover rounded-[1px] border border-gray-500/10 inline-block" alt="Sri Lanka Flag" />
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center text-purple-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 font-mono">Real Name credit</span>
                <span className="font-semibold">Pamuda Jayathilaka</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 font-mono">Available For</span>
                <span className="font-semibold">Contract landing pages, Technical SEO, Python scripting</span>
              </div>
            </div>

          </div>

          {/* Social Icons */}
          <div className="pt-6 border-t border-gray-700/20">
            <span className="block text-xs text-gray-500 font-mono uppercase mb-3">Or message me directly here</span>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/pamuda2002"
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-lg border transition-all ${isDark ? "border-gray-800 bg-[#0d1422] text-gray-300 hover:text-white" : "border-gray-300 bg-slate-100 text-gray-700 hover:text-black"
                    }`}
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>

                <a
                  href="https://www.instagram.com/psjayathilaka/"
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-lg border transition-all ${isDark ? "border-gray-800 bg-[#0d1422] text-gray-300 hover:text-[#E1306C]" : "border-gray-300 bg-slate-100 text-gray-700 hover:text-[#E1306C]"
                    }`}
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>

                <a
                  href="https://x.com/psjayathilaka"
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-lg border transition-all ${isDark ? "border-gray-800 bg-[#0d1422] text-gray-300 hover:text-white" : "border-gray-300 bg-slate-100 text-gray-700 hover:text-black"
                    }`}
                  aria-label="X (Twitter) Profile"
                >
                  <XIcon className="w-5 h-5" />
                </a>

                <a
                  href="https://wa.me/94768089712"
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-lg border transition-all ${isDark ? "border-gray-800 bg-[#0d1422] text-gray-300 hover:text-[#25D366]" : "border-gray-300 bg-slate-100 text-gray-700 hover:text-[#25D366]"
                    }`}
                  aria-label="WhatsApp Profile"
                >
                  <WhatsappIcon className="w-5 h-5" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-xs font-mono text-gray-400">
                <div>
                  <span>email: </span>
                  <a href="mailto:arryz.buzinezz@gmail.com" className="text-[#63B3ED] font-semibold underline hover:text-blue-400 transition-colors">arryz.buzinezz@gmail.com</a>
                </div>
                <div>
                  <span>whatsapp: </span>
                  <a href="https://wa.me/94768089712" target="_blank" rel="noreferrer" className="text-[#38D39F] font-semibold underline hover:text-[#25D366] transition-colors">+94 76 808 9712</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-7">
          <div className={`p-5 sm:p-8 rounded-3xl border ${isDark ? "bg-[#0D1422]/95 border-gray-800" : "bg-slate-50 border-gray-200"
            }`}>

            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2 text-left">
              <Send className="w-5 h-5 text-[#2563eb]" />
              <span>Direct Telemetry Pitch</span>
            </h3>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-emerald-400">Pitch Telemetry Transmitted!</h4>
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. I have received your request. I will analyze your parameters and write back to you personally within 8 hours. Let's make this epic!
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactName("");
                    setContactEmail("");
                    setContactPhone("");
                    setContactMessage("");
                  }}
                  className="text-xs font-mono text-[#63B3ED] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 text-left"
              >

                {/* Name Input */}
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-400 mb-2">
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Acme Local Service Group"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all ${isDark
                      ? "bg-black/30 border-gray-800 text-white focus:border-[#63B3ED]"
                      : "bg-white border-gray-300 text-gray-900 focus:border-[#7C3AED]"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. founder@acme.com"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all ${isDark
                        ? "bg-black/30 border-gray-800 text-white focus:border-[#63B3ED]"
                        : "bg-white border-gray-300 text-gray-900 focus:border-[#7C3AED]"
                        } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 000-0000"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all ${isDark
                        ? "bg-black/30 border-gray-800 text-white focus:border-[#63B3ED]"
                        : "bg-white border-gray-300 text-gray-900 focus:border-[#7C3AED]"
                        } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-mono uppercase text-gray-400">
                      Project scope & details *
                    </label>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        setContactMessage("Hi ArryZ, I need a high-converting, blazing fast landing page for my local plumbing business. We get around 1,500 local visitors but very low conversion. Let's optimize it!");
                      }}
                      className="text-[10px] text-[#63B3ED] hover:underline font-mono disabled:opacity-50 disabled:no-underline"
                    >
                      [Insert Local Business Demo Prompt]
                    </button>
                  </div>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe what you sell, who you target, and your speed bottlenecks..."
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all ${isDark
                      ? "bg-black/30 border-gray-800 text-white focus:border-[#63B3ED]"
                      : "bg-white border-gray-300 text-gray-900 focus:border-[#7C3AED]"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-4 rounded-xl bg-gradient-to-r from-[#1E40AF] to-[#2563eb] text-white font-bold text-xs sm:text-sm tracking-wide hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 flex-wrap disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="truncate max-w-[85%]">
                    {isSubmitting ? "Transmitting Proposal Telemetry..." : "Transmit Project Proposal Telemetry"}
                  </span>
                  <Send className="w-4 h-4 shrink-0" />
                </button>

                <p className="text-[10px] text-gray-500 text-center font-mono flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Zero spam guarantee. Available for NDA signing where required.</span>
                </p>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
