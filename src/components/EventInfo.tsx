import React, { useState } from 'react';
import { EVENT_DATA } from '../data/eventData';
import { Calendar, MapPin, Users, Award, Bell, Check, Download, ShieldCheck, Sparkles } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { audioEngine } from '../utils/audioEngine';
import { ScrollReveal } from './ScrollReveal';

interface EventInfoProps {
  onOpenRegisterModal: () => void;
}

export const EventInfo: React.FC<EventInfoProps> = ({ onOpenRegisterModal }) => {
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  const handleDownloadCalendar = () => {
    audioEngine.playClick();
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//IEEE Student Society//IEEE InnovateX 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:ieee-innovatex-2026@placeholder.edu',
      'DTSTAMP:20261001T000000Z',
      'SUMMARY:IEEE InnovateX 2026 - Where Ideas Meet Engineering',
      'DESCRIPTION:IEEE InnovateX 2026 Technical Symposium organized by IEEE Student Society with IAS & RAS. Official date & venue announcements coming soon.',
      'LOCATION:To Be Announced',
      'STATUS:TENTATIVE',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'IEEE-InnovateX-2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 3000);
  };

  return (
    <section id="event-info" className="relative py-20 bg-[#091124] border-y border-purple-500/20 overflow-hidden">
      {/* Background ambient colorful glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal direction="up" distance={20} duration={600}>
          <div className="mb-12 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-slate-800 pb-6">
            <div>
              <div className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Event Specification</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Essential Event Credentials
              </h2>
            </div>
            <div className="mt-3 sm:mt-0 text-xs sm:text-sm text-slate-400 font-mono">
              Official technical symposium parameters & logistics
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Distinct Colorful Info Cards with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Event Designation (Hot Pink / Fuchsia) */}
          <ScrollReveal direction="hologram" delay={0} duration={700}>
            <div className="bg-gradient-to-b from-slate-900/90 to-pink-950/20 border border-pink-500/40 hover:border-pink-400 rounded-2xl p-6 relative group transition-all duration-200 shadow-xl shadow-pink-950/20 h-full hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-pink-400 uppercase tracking-widest font-bold">Designation</span>
                <div className="p-2.5 bg-pink-950/80 text-pink-300 rounded-xl border border-pink-500/40 shadow-sm shadow-pink-500/20">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 font-mono">
                {EVENT_DATA.event.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                Student-led technical symposium organized under IEEE guidelines.
              </p>
            </div>
          </ScrollReveal>

          {/* 2. Date (Electric Violet / Purple) */}
          <ScrollReveal direction="hologram" delay={120} duration={700}>
            <div className="bg-gradient-to-b from-slate-900/90 to-purple-950/20 border border-purple-500/40 hover:border-purple-400 rounded-2xl p-6 relative group transition-all duration-200 shadow-xl shadow-purple-950/20 h-full hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-bold">Timeline</span>
                <div className="p-2.5 bg-purple-950/80 text-purple-300 rounded-xl border border-purple-500/40 shadow-sm shadow-purple-500/20">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
              <div className="text-lg font-bold text-purple-300 mb-1 font-mono">
                {EVENT_DATA.event.date}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                Official symposium dates will be released upon schedule ratification.
              </p>
            </div>
          </ScrollReveal>

          {/* 3. Venue (Cyber Emerald / Mint) */}
          <ScrollReveal direction="hologram" delay={240} duration={700}>
            <div className="bg-gradient-to-b from-slate-900/90 to-emerald-950/20 border border-emerald-500/40 hover:border-emerald-400 rounded-2xl p-6 relative group transition-all duration-200 shadow-xl shadow-emerald-950/20 h-full hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Location</span>
                <div className="p-2.5 bg-emerald-950/80 text-emerald-300 rounded-xl border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
              <div className="text-lg font-bold text-emerald-300 mb-1 font-mono">
                {EVENT_DATA.event.venue}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                Campus auditorium and engineering lab facilities to be announced.
              </p>
            </div>
          </ScrollReveal>

          {/* 4. Organized By (Solar Amber / Gold) */}
          <ScrollReveal direction="hologram" delay={360} duration={700}>
            <div className="bg-gradient-to-b from-slate-900/90 to-amber-950/20 border border-amber-500/40 hover:border-amber-400 rounded-2xl p-6 relative group transition-all duration-200 shadow-xl shadow-amber-950/20 h-full hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-bold">Leadership</span>
                <div className="p-2.5 bg-amber-950/80 text-amber-300 rounded-xl border border-amber-500/40 shadow-sm shadow-amber-500/20">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 font-mono">
                {EVENT_DATA.event.organizer}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                With technical chapter collaboration from IAS & RAS.
              </p>
            </div>
          </ScrollReveal>

        </div>

        {/* Association Strip & Action with Rich Colors */}
        <ScrollReveal direction="up" delay={200} duration={700}>
          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-950/70 p-5 sm:p-6 rounded-2xl border border-purple-500/30 shadow-lg">
            
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold">Chapters Represented:</span>
              
              <div className="flex items-center gap-4">
                {/* IEEE */}
                <div className="h-8 flex items-center p-1.5 bg-slate-900 rounded-lg border border-cyan-500/40 shadow-sm">
                  <SafeImage
                    src={EVENT_DATA.assets.ieeeLogo}
                    alt="IEEE"
                    className="max-h-5 w-auto object-contain filter brightness-110"
                    fallbackText="IEEE"
                  />
                </div>
                <span className="text-slate-600">/</span>
                {/* IAS */}
                <div className="h-8 flex items-center p-1.5 bg-slate-900 rounded-lg border border-amber-500/40 shadow-sm">
                  <SafeImage
                    src={EVENT_DATA.assets.iasLogo}
                    alt="IEEE Industry Applications Society"
                    className="max-h-5 w-auto object-contain filter brightness-110"
                    fallbackText="IEEE IAS"
                  />
                </div>
                <span className="text-slate-600">/</span>
                {/* RAS */}
                <div className="h-8 flex items-center p-1.5 bg-slate-900 rounded-lg border border-pink-500/40 shadow-sm">
                  <SafeImage
                    src={EVENT_DATA.assets.rasLogo}
                    alt="IEEE Robotics and Automation Society"
                    className="max-h-5 w-auto object-contain filter brightness-110"
                    fallbackText="IEEE RAS"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={handleDownloadCalendar}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold font-mono text-slate-200 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-xl transition-colors border border-purple-500/30 whitespace-nowrap shadow-sm"
              >
                {downloadedIcs ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>CALENDAR SAVED (.ICS)</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-purple-400" />
                    <span>ADD TO CALENDAR (.ICS)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  onOpenRegisterModal();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold font-mono text-white bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-400 rounded-xl transition-colors whitespace-nowrap shadow-md shadow-purple-950/60"
              >
                <Bell className="w-4 h-4 text-pink-200" />
                <span>GET ANNOUNCEMENTS</span>
              </button>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
