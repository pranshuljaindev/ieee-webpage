import React, { useState } from 'react';
import { EVENT_DATA, ScheduleItem } from '../data/eventData';
import { Clock, MapPin, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { ScrollReveal } from './ScrollReveal';

export const Schedule: React.FC = () => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>(EVENT_DATA.schedule[0].id);
  const [hoveredSlotId, setHoveredSlotId] = useState<string | null>(null);

  const activeSlot = EVENT_DATA.schedule.find((s) => s.id === selectedSlotId) || EVENT_DATA.schedule[0];

  const handleSelectSlot = (id: string) => {
    setSelectedSlotId(id);
    audioEngine.playClick();
  };

  const getPhaseColor = (index: number) => {
    switch (index) {
      case 0:
        return {
          text: 'text-pink-400',
          border: 'border-pink-500/50',
          bg: 'bg-pink-950/40',
          dot: 'bg-pink-400',
          shadow: 'shadow-pink-500/30',
        };
      case 1:
        return {
          text: 'text-emerald-400',
          border: 'border-emerald-500/50',
          bg: 'bg-emerald-950/40',
          dot: 'bg-emerald-400',
          shadow: 'shadow-emerald-500/30',
        };
      case 2:
        return {
          text: 'text-amber-400',
          border: 'border-amber-500/50',
          bg: 'bg-amber-950/40',
          dot: 'bg-amber-400',
          shadow: 'shadow-amber-500/30',
        };
      default:
        return {
          text: 'text-purple-400',
          border: 'border-purple-500/50',
          bg: 'bg-purple-950/40',
          dot: 'bg-purple-400',
          shadow: 'shadow-purple-500/30',
        };
    }
  };

  return (
    <section id="schedule" className="relative py-24 bg-[#091124] border-t border-purple-500/20 overflow-hidden">
      {/* Background blueprint & ambient glow */}
      <div className="absolute inset-0 bg-circuit-grid opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[300px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-[500px] h-[300px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal direction="up" distance={25} duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Symposium Chronology</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
                Event Schedule
              </h2>
            </div>
            <div className="mt-3 md:mt-0 text-xs sm:text-sm text-slate-400 font-mono">
              <span className="text-purple-300">[Interactive Futuristic Timeline · 4 Master Segments]</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Schedule Grid: Interactive Timeline + Deep Session Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Illuminated Timeline Cards */}
          <div className="lg:col-span-7 relative">
            
            {/* Glowing Vertical Bus Trace Line (Desktop) */}
            <div className="hidden sm:block absolute top-6 bottom-6 left-6 w-[2px] bg-slate-800 pointer-events-none">
              <div
                className="w-full bg-gradient-to-b from-pink-500 via-emerald-400 via-amber-400 to-purple-500 transition-all duration-300"
                style={{
                  height: `${((EVENT_DATA.schedule.findIndex(s => s.id === selectedSlotId) + 1) / EVENT_DATA.schedule.length) * 100}%`
                }}
              />
            </div>

            <div className="space-y-4 sm:pl-14">
              {EVENT_DATA.schedule.map((item, index) => {
                const isSelected = item.id === selectedSlotId;
                const isHovered = hoveredSlotId === item.id;
                const colors = getPhaseColor(index);

                return (
                  <ScrollReveal key={item.id} direction="left" delay={index * 100} duration={600}>
                    <div
                      onClick={() => handleSelectSlot(item.id)}
                      onMouseEnter={() => setHoveredSlotId(item.id)}
                      onMouseLeave={() => setHoveredSlotId(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectSlot(item.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                      className={`relative w-full text-left p-6 rounded-2xl border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                        isSelected
                          ? `bg-slate-900 ${colors.border} shadow-xl shadow-black/60 ring-1 ring-white/20 -translate-y-0.5`
                          : isHovered
                          ? 'bg-slate-900/90 border-slate-700 -translate-y-0.5 shadow-lg shadow-black/40'
                          : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      {/* Glowing Timeline Node Beacon (Desktop) */}
                      <div
                        className={`hidden sm:flex absolute -left-14 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full items-center justify-center border transition-all duration-200 ${
                          isSelected
                            ? `${colors.bg} ${colors.border} ${colors.shadow} scale-110 shadow-lg`
                            : isHovered
                            ? 'bg-slate-800 border-pink-400 scale-105'
                            : 'bg-slate-950 border-slate-700'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                        {/* Time & Session Category */}
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className={`flex items-center gap-1.5 font-bold tabular-nums text-sm ${colors.text}`}>
                            <Clock className="w-4 h-4 shrink-0" />
                            {item.time}
                          </span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-300 font-medium">{item.category}</span>
                        </div>

                        {/* Step index */}
                        <span className={`text-xs font-mono font-bold ${colors.text}`}>
                          PHASE 0{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="flex items-center justify-between gap-3">
                        <h3 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-200'
                        }`}>
                          {item.title}
                        </h3>
                        <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${
                          isSelected ? `${colors.text} translate-x-1` : 'text-slate-600'
                        }`} />
                      </div>

                      {/* Description */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Session Inspection Pane */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ScrollReveal direction="hologram" delay={150} duration={700}>
              <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                {/* Subtle top energy line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400" />

                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <span className="text-xs font-mono text-pink-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Segment Spotlight</span>
                  </span>
                  <span className="text-xs font-mono text-pink-300 tabular-nums font-semibold px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40">
                    {activeSlot.time}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
                      {activeSlot.category}
                    </span>
                    <h4 className="text-2xl font-bold text-white tracking-tight mt-1 font-mono">
                      {activeSlot.title}
                    </h4>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed pt-2">
                    {activeSlot.description}
                  </p>

                  {activeSlot.locationHint && (
                    <div className="flex items-center gap-2 pt-4 text-xs font-mono text-slate-400 border-t border-slate-800">
                      <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>Venue Location: <strong className="text-slate-200 font-medium">{activeSlot.locationHint}</strong></span>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-pink-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Symposium Protocol</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Registered delegates will be granted admission upon presentation of their student society credentials. Live Q&A and technical deliberations will commence immediately following each session.
                    </p>
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
