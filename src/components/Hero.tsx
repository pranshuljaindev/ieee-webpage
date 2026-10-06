import React, { useState, useEffect } from 'react';
import { EVENT_DATA } from '../data/eventData';
import { InnovationCore } from './3d/InnovationCore';
import { BackgroundParticles } from './BackgroundParticles';
import { SafeImage } from './SafeImage';
import {
  ArrowRight,
  ChevronDown,
  Calendar,
  MapPin,
  Award,
  Music,
  Clock,
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface HeroProps {
  onOpenRegisterModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegisterModal }) => {
  const [isBGMPlaying, setIsBGMPlaying] = useState(audioEngine.getIsBGMPlaying());

  // Elegant live countdown capsule
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setIsBGMPlaying(audioEngine.getIsBGMPlaying());
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToExplore = () => {
    audioEngine.playClick();
    const el = document.getElementById('event-info');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleBGM = () => {
    audioEngine.playClick();
    if (isBGMPlaying) {
      audioEngine.stopBGM();
    } else {
      audioEngine.startBGM();
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-10 overflow-hidden bg-[#070D1E] select-none"
    >
      {/* 1. Background Particles & Ambient Lighting */}
      <BackgroundParticles />

      {/* Volumetric Multi-Color Lighting Auras */}
      <div
        className="absolute top-1/4 left-1/6 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[170px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-12 w-[650px] h-[550px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/3 w-[550px] h-[400px] bg-rose-500/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Main Hero Viewport (Stretched width to fill left and right space naturally) */}
      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full my-auto z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Stretched Text & Core Information */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left space-y-6 w-full">
            
            {/* Supertitle & Live Countdown */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 text-xs font-mono tracking-widest text-purple-300 font-semibold shadow-lg shadow-purple-950/40 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
                </span>
                <span className="bg-gradient-to-r from-rose-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent font-medium">
                  {EVENT_DATA.event.superTitle}
                </span>
              </div>

              {/* Minimal Countdown Capsule */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-slate-700/50 text-[11px] font-mono text-slate-300 backdrop-blur-sm shadow-sm">
                <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:14s]" />
                <span>
                  T-MINUS:{' '}
                  <strong className="text-white font-medium">
                    {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
                  </strong>
                </span>
              </div>
            </div>

            {/* Typography Hierarchy - Stretched & Impactful Title */}
            <div className="space-y-1 w-full">
              <div className="text-5xl sm:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight text-white leading-none font-mono">
                INNOVATEX
              </div>
              <div className="text-5xl sm:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-300 via-cyan-300 to-amber-200 filter drop-shadow-[0_0_35px_rgba(244,114,182,0.3)] font-mono">
                2026
              </div>
              <p className="text-lg sm:text-2xl 2xl:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 tracking-tight pt-2 uppercase font-mono flex items-center gap-2">
                <span>{EVENT_DATA.event.tagline}</span>
              </p>
            </div>

            {/* Stretched Event Overview Description */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl leading-relaxed">
              {EVENT_DATA.event.description}
            </p>

            {/* IEEE / IAS / RAS Tri-Society Branding Strip (Stretched width) */}
            <div className="w-full max-w-2xl p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 backdrop-blur-md shadow-xl shadow-black/30">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-rose-300 font-semibold">
                  <Award className="w-3.5 h-3.5 text-rose-400" />
                  <span>Associated Technical Chapters</span>
                </span>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  IEEE · IAS · RAS
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 items-center">
                {/* IEEE */}
                <div
                  onMouseEnter={() => audioEngine.playHover()}
                  className="h-14 flex items-center justify-center p-2.5 bg-slate-950/70 rounded-xl border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/20 transition-all group shadow-sm cursor-default"
                >
                  <SafeImage
                    src={EVENT_DATA.assets.ieeeLogo}
                    alt="IEEE Official"
                    className="max-h-9 max-w-full object-contain filter brightness-110 group-hover:scale-105 transition-transform"
                    fallbackText="IEEE"
                  />
                </div>

                {/* IAS */}
                <div
                  onMouseEnter={() => audioEngine.playHover()}
                  className="h-14 flex items-center justify-center p-2.5 bg-slate-950/70 rounded-xl border border-amber-500/30 hover:border-amber-400 hover:bg-amber-950/20 transition-all group shadow-sm cursor-default"
                >
                  <SafeImage
                    src={EVENT_DATA.assets.iasLogo}
                    alt="IEEE Industry Applications Society"
                    className="max-h-9 max-w-full object-contain filter brightness-110 group-hover:scale-105 transition-transform"
                    fallbackText="IEEE IAS"
                  />
                </div>

                {/* RAS */}
                <div
                  onMouseEnter={() => audioEngine.playHover()}
                  className="h-14 flex items-center justify-center p-2.5 bg-slate-950/70 rounded-xl border border-rose-500/30 hover:border-rose-400 hover:bg-rose-950/20 transition-all group shadow-sm cursor-default"
                >
                  <SafeImage
                    src={EVENT_DATA.assets.rasLogo}
                    alt="IEEE Robotics & Automation Society"
                    className="max-h-9 max-w-full object-contain filter brightness-110 group-hover:scale-105 transition-transform"
                    fallbackText="IEEE RAS"
                  />
                </div>
              </div>
            </div>

            {/* Event Quick Credentials */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-mono text-slate-300 pt-1">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-purple-950/50 rounded-lg border border-purple-500/20">
                <Calendar className="w-4 h-4 text-rose-400 shrink-0" />
                <span>DATE: <strong className="text-white font-medium">{EVENT_DATA.event.date}</strong></span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-cyan-950/50 rounded-lg border border-cyan-500/20">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>VENUE: <strong className="text-white font-medium">{EVENT_DATA.event.venue}</strong></span>
              </div>
            </div>

            {/* Clean Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  onOpenRegisterModal();
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-400 rounded-2xl transition-all duration-200 shadow-xl shadow-purple-950/60 hover:shadow-rose-500/30 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 border border-rose-400/30 font-mono tracking-wider hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4 text-rose-200 group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Soft Melody Toggle */}
              <button
                onClick={handleToggleBGM}
                onMouseEnter={() => audioEngine.playHover()}
                className={`inline-flex items-center justify-center gap-2 px-5 py-4 text-xs sm:text-sm font-medium rounded-2xl transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 border backdrop-blur-md ${
                  isBGMPlaying
                    ? 'bg-rose-950/50 border-rose-500/40 text-rose-200 shadow-md shadow-rose-950/30'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/60'
                }`}
                title={isBGMPlaying ? 'Pause Soft Acoustic BGM' : 'Play Soft Piano & Guitar Melody'}
              >
                <Music
                  className={`w-4 h-4 ${
                    isBGMPlaying ? 'text-rose-300 animate-spin [animation-duration:10s]' : 'text-slate-400'
                  }`}
                />
                <span>
                  {isBGMPlaying ? 'Soft Melody · On' : 'Play Soft Melody'}
                </span>
              </button>

              <button
                onClick={scrollToExplore}
                onMouseEnter={() => audioEngine.playHover()}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-2xl transition-all duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                <span>Explore</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Stretched 3D Innovation Planet Canvas (Fills Right Space Naturally) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end xl:justify-center w-full">
            <div className="w-full aspect-square max-w-[560px] sm:max-w-[620px] lg:max-w-[660px] xl:max-w-[720px] relative flex items-center justify-center">
              
              {/* Soft volumetric glow framing the larger 3D planet */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-600/15 via-purple-600/15 to-amber-500/10 blur-3xl pointer-events-none" />

              {/* Three.js Interactive WebGL Component - Generously Stretched */}
              <InnovationCore />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-20 flex justify-center pt-6">
        <button
          onClick={scrollToExplore}
          onMouseEnter={() => audioEngine.playHover()}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-rose-300 transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-lg text-xs"
          aria-label="Scroll to Event Itinerary"
        >
          <span className="text-[11px] tracking-widest uppercase font-mono">DISCOVER THE EXPERIENCE</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-rose-300" />
        </button>
      </div>
    </section>
  );
};
