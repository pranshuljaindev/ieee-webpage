import React, { useState } from 'react';
import { EVENT_DATA, SocietyGroup } from '../data/eventData';
import { SafeImage } from './SafeImage';
import { ExternalLink, ShieldCheck, Activity, Cpu, Network, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { ScrollReveal } from './ScrollReveal';

export const Societies: React.FC = () => {
  const [activeSocId, setActiveSocId] = useState<string | null>(null);

  const handleHover = (id: string | null) => {
    setActiveSocId(id);
    if (id) audioEngine.playClick();
  };

  const getSocietyTheme = (abbr: string) => {
    switch (abbr) {
      case 'IEEE':
        return {
          border: 'border-cyan-500/40 hover:border-cyan-400',
          activeRing: 'border-cyan-400 ring-cyan-400/40',
          shadow: 'shadow-cyan-950/40',
          text: 'text-cyan-300',
          badge: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/40',
          dot: 'bg-cyan-400',
        };
      case 'IEEE IAS':
        return {
          border: 'border-amber-500/40 hover:border-amber-400',
          activeRing: 'border-amber-400 ring-amber-400/40',
          shadow: 'shadow-amber-950/40',
          text: 'text-amber-300',
          badge: 'text-amber-400 bg-amber-950/80 border-amber-500/40',
          dot: 'bg-amber-400',
        };
      default: // IEEE RAS
        return {
          border: 'border-pink-500/40 hover:border-pink-400',
          activeRing: 'border-pink-400 ring-pink-400/40',
          shadow: 'shadow-pink-950/40',
          text: 'text-pink-300',
          badge: 'text-pink-400 bg-pink-950/80 border-pink-500/40',
          dot: 'bg-pink-400',
        };
    }
  };

  return (
    <section id="societies" className="relative py-24 bg-[#091124] border-t border-purple-500/20 overflow-hidden">
      {/* Background blueprint circuit lines & ambient colorful glow */}
      <div className="absolute inset-0 bg-circuit-grid opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal direction="up" distance={25} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-purple-500/40 text-xs font-mono font-bold tracking-wider uppercase mb-3 text-purple-300 shadow-md">
              <Network className="w-3.5 h-3.5 text-pink-400" />
              <span>Interconnected Technical Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
              Associated IEEE Societies
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              IEEE InnovateX 2026 brings together three specialized domains: global engineering standards, applied industrial power, and advanced robotics automation.
            </p>
          </div>
        </ScrollReveal>

        {/* Central Topology Network Visual Hub */}
        <ScrollReveal direction="scale" delay={100} duration={600}>
          <div className="mb-12 hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-3xl py-4 flex items-center justify-between px-12">
              
              {/* SVG Connecting Bus Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <line
                  x1="20%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke={activeSocId === 'soc-ieee' ? '#06b6d4' : '#334155'}
                  strokeWidth={activeSocId === 'soc-ieee' ? '3' : '1.5'}
                  strokeDasharray={activeSocId === 'soc-ieee' ? '4 4' : 'none'}
                  className="transition-colors duration-200"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke={activeSocId === 'soc-ias' ? '#f59e0b' : '#334155'}
                  strokeWidth={activeSocId === 'soc-ias' ? '3' : '1.5'}
                  className="transition-colors duration-200"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="80%"
                  y2="50%"
                  stroke={activeSocId === 'soc-ras' ? '#ec4899' : '#334155'}
                  strokeWidth={activeSocId === 'soc-ras' ? '3' : '1.5'}
                  strokeDasharray={activeSocId === 'soc-ras' ? '4 4' : 'none'}
                  className="transition-colors duration-200"
                />
              </svg>

              {/* Node 1: IEEE indicator (Cyan) */}
              <div className={`relative z-10 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all duration-200 ${
                activeSocId === 'soc-ieee' ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/40 scale-105' : 'bg-slate-900 border-slate-800 text-cyan-400/70'
              }`}>
                IEEE Global
              </div>

              {/* Central InnovateX Hub with Rainbow Flare */}
              <div className="relative z-10 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 border border-white/30 text-white font-bold text-sm tracking-wider shadow-xl shadow-purple-950 flex items-center gap-2 font-mono">
                <Activity className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span>INNOVATEX 2026 NEXUS</span>
              </div>

              {/* Node 2: RAS indicator (Pink) */}
              <div className={`relative z-10 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all duration-200 ${
                activeSocId === 'soc-ras' ? 'bg-pink-950 border-pink-400 text-pink-200 shadow-lg shadow-pink-500/40 scale-105' : 'bg-slate-900 border-slate-800 text-pink-400/70'
              }`}>
                RAS Robotics
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Three Organization Cards: IEEE, IAS, RAS with Colorful Distinct Theming */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENT_DATA.societies.map((soc, idx) => {
            const isHovered = activeSocId === soc.id;
            const theme = getSocietyTheme(soc.abbr);
            return (
              <ScrollReveal
                key={soc.id}
                direction="hologram"
                delay={idx * 140}
                duration={700}
                className="h-full"
              >
                <div
                  onMouseEnter={() => handleHover(soc.id)}
                  onMouseLeave={() => handleHover(null)}
                  className={`bg-slate-900/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group border h-full ${
                    isHovered
                      ? `${theme.activeRing} shadow-2xl -translate-y-1 ring-1`
                      : `${theme.border} hover:border-white/40`
                  }`}
                >
                  <div>
                    {/* Logo Frame: Correct aspect ratio, no distortion with colorful borders */}
                    <div className="h-24 w-full flex items-center justify-center p-3 bg-slate-950/90 rounded-2xl border border-slate-800 mb-6 group-hover:border-white/30 transition-colors shadow-inner">
                      <SafeImage
                        src={soc.logoUrl}
                        alt={`${soc.fullName} Official Logo`}
                        className="max-h-16 max-w-full object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-200"
                        fallbackText={soc.abbr}
                      />
                    </div>

                    {/* Subtitle / Focus with color badge */}
                    <div className={`text-xs font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold ${theme.text}`}>
                      <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
                      <span>{soc.focusArea}</span>
                    </div>

                    {/* Organization Name */}
                    <h3 className="text-xl font-extrabold text-white tracking-tight font-mono">
                      {soc.fullName}
                    </h3>

                    {/* Tagline */}
                    <div className="text-xs text-slate-400 font-medium italic mt-1 mb-4">
                      "{soc.tagline}"
                    </div>

                    {/* Short Factual Description */}
                    <p className="text-sm text-slate-300/90 leading-relaxed">
                      {soc.description}
                    </p>
                  </div>

                  {/* Bottom Card Link */}
                  <div className="pt-6 mt-6 border-t border-slate-800/80">
                    <a
                      href={soc.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${theme.text} hover:text-white transition-colors group-hover:translate-x-1 duration-150 font-mono`}
                      aria-label={`Visit official ${soc.abbr} portal`}
                    >
                      <span>Official Society Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Academic / Student Society Badge with Multi-Color Outline */}
        <ScrollReveal direction="up" delay={200} duration={600}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/90 border border-purple-500/30 text-xs text-slate-300 font-mono shadow-md">
              <ShieldCheck className="w-4 h-4 text-pink-400" />
              <span>Coordinated by IEEE Student Society Chapter Leadership</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
