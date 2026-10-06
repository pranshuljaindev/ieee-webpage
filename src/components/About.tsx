import React, { useState } from 'react';
import { EVENT_DATA } from '../data/eventData';
import { Cpu, Lightbulb, Users, Compass, BookOpen, Layers, Terminal, Binary, Network, ArrowUpRight, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { ScrollReveal } from './ScrollReveal';

export const About: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const pillars = [
    {
      id: 'pillar-1',
      code: 'PARADIGM 01',
      title: 'Systematic Innovation',
      icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
      tagline: 'From First-Principles Theory to Scalable Deployment',
      themeColor: 'amber',
      accentBorder: 'border-amber-500/50',
      activeBg: 'bg-amber-950/40',
      activeText: 'text-amber-300',
      description:
        'InnovateX moves beyond hackathon abstractions. The symposium enforces empirical problem formulation, algorithmic optimization, and structured engineering workflows that translate theoretical hypotheses into scalable, tangible prototypes.',
      technicalSpecs: [
        'Constraint-driven design methodologies',
        'Mathematical validation of experimental models',
        'Rapid prototype hardware-software co-design',
      ],
      societyNexus: 'Core IEEE Standardized Engineering Frameworks',
    },
    {
      id: 'pillar-2',
      code: 'PARADIGM 02',
      title: 'Applied Engineering & Power',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      tagline: 'Bridging High-Efficiency Systems & Industrial Grids',
      themeColor: 'purple',
      accentBorder: 'border-purple-500/50',
      activeBg: 'bg-purple-950/40',
      activeText: 'text-purple-300',
      description:
        'In collaboration with the IEEE Industry Applications Society (IAS), we spotlight real-world electrical systems, energy-efficient power electronics, conversion topologies, and mission-critical industrial automation testbeds.',
      technicalSpecs: [
        'High-density power electronics & motor drives',
        'Industrial sensor telemetry & supervisory control',
        'Resilient smart grid architectures',
      ],
      societyNexus: 'IEEE Industry Applications Society (IAS) Mandate',
    },
    {
      id: 'pillar-3',
      code: 'PARADIGM 03',
      title: 'Robotics & Autonomous Flux',
      icon: <Cpu className="w-5 h-5 text-pink-400" />,
      tagline: 'Adaptive Control, Kinematics & Edge Intelligence',
      themeColor: 'pink',
      accentBorder: 'border-pink-500/50',
      activeBg: 'bg-pink-950/40',
      activeText: 'text-pink-300',
      description:
        'Anchored by the IEEE Robotics and Automation Society (RAS), sessions deconstruct modern mechatronics, multi-sensor SLAM algorithms, embedded neural accelerators, and robust closed-loop actuators operating in unpredictable physical environments.',
      technicalSpecs: [
        'Real-time kinematic trajectory optimization',
        'Multi-modal sensor fusion (LiDAR, IMU, Vision)',
        'Embedded edge inference for autonomous platforms',
      ],
      societyNexus: 'IEEE Robotics and Automation Society (RAS) Mandate',
    },
    {
      id: 'pillar-4',
      code: 'PARADIGM 04',
      title: 'Student Research Vanguard',
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      tagline: 'Peer-to-Peer Technical Dialogue & Open Exchange',
      themeColor: 'emerald',
      accentBorder: 'border-emerald-500/50',
      activeBg: 'bg-emerald-950/40',
      activeText: 'text-emerald-300',
      description:
        'Organized by the IEEE Student Society to give emerging undergraduate and postgraduate engineers a platform to share research papers, benchmark open-source implementations, and engage with academic and industry leaders.',
      technicalSpecs: [
        'Peer-reviewed student demonstration tracks',
        'Open-source hardware schematics and codebase sharing',
        'Direct technical review from IEEE senior members',
      ],
      societyNexus: 'IEEE Student Society Chapter Leadership',
    },
  ];

  const current = pillars[activePillarIndex];

  const handleSelectPillar = (idx: number) => {
    setActivePillarIndex(idx);
    audioEngine.playClick();
  };

  return (
    <section id="about" className="relative py-28 bg-[#070D1E] overflow-hidden">
      {/* Background blueprint & colorful glowing nebulae */}
      <div className="absolute inset-0 bg-circuit-grid opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-32 left-1/3 w-[600px] h-[400px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[400px] bg-pink-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal direction="up" distance={25} duration={600}>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-purple-500/40 text-xs font-mono font-bold tracking-wider uppercase mb-3 text-purple-300 shadow-md">
              <Terminal className="w-3.5 h-3.5 text-pink-400" />
              <span>Technical Manifesto & Scope</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-mono">
              Cultivating Technical Rigor & Engineering Discovery
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              IEEE InnovateX 2026 is an engineering symposium organized by the IEEE Student Society to bridge theoretical study with physical practice. Grounded in the joint leadership of IEEE, IAS, and RAS.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Quantum Blueprint Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Paradigm Selector List with ScrollReveal */}
          <div className="lg:col-span-5 space-y-3">
            <ScrollReveal direction="left" delay={100} duration={600}>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">
                Select Architecture Focus
              </span>
            </ScrollReveal>

            {pillars.map((item, idx) => {
              const isSelected = activePillarIndex === idx;
              return (
                <ScrollReveal key={item.id} direction="left" delay={120 + idx * 80} duration={600}>
                  <button
                    onClick={() => handleSelectPillar(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                      isSelected
                        ? `bg-slate-900 ${item.accentBorder} shadow-xl shadow-purple-950/60 ring-1 ring-pink-500/40 -translate-y-0.5`
                        : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isSelected ? 'bg-slate-950 border-pink-500/50' : 'bg-slate-950 border-slate-800'
                    }`}>
                      {item.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                        idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-purple-400' : idx === 2 ? 'text-pink-400' : 'text-emerald-400'
                      }`}>
                        {item.code}
                      </span>
                      <h3 className={`text-base font-bold truncate transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {item.tagline}
                      </p>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Column: Deep Blueprint Specification Panel with Dynamic Theme */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="hologram" delay={200} duration={700}>
              <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
                {/* Header Gradient Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 via-cyan-400 to-amber-400" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-2">
                  <div>
                    <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-widest">
                      {current.code} · SYMPOSIUM SPECIFICATION
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
                      {current.title}
                    </h3>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/50 text-xs font-mono text-purple-200 font-semibold self-start sm:self-auto shadow-sm">
                    {current.societyNexus}
                  </div>
                </div>

                {/* Tagline & Detailed Statement */}
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-slate-200 tracking-wide">
                    "{current.tagline}"
                  </div>

                  <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed">
                    {current.description}
                  </p>

                  {/* Key Technical Directives */}
                  <div className="mt-8 pt-6 border-t border-slate-800/80">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold flex items-center gap-1.5">
                      <Binary className="w-3.5 h-3.5 text-pink-400" />
                      <span>Technical Deliverables & Focus Areas:</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {current.technicalSpecs.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-snug flex flex-col justify-between hover:border-pink-500/40 transition-colors"
                        >
                          <span className="text-[10px] font-mono text-pink-400 font-bold mb-1">
                            CRITERION 0{sIdx + 1}
                          </span>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Assurance */}
                  <div className="mt-6 pt-4 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/60">
                    <span>CURATED BY PROGRAM COMMITTEE</span>
                    <span className="text-emerald-400 font-bold">STANDARDS COMPLIANT</span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
