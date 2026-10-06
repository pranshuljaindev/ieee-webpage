import React, { useState, useEffect } from 'react';
import { EVENT_DATA } from '../data/eventData';
import { SafeImage } from './SafeImage';
import { audioEngine } from '../utils/audioEngine';
import { SkipForward, Music, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Attempt audio play during intro
    audioEngine.playCinematicIntro();

    // Sequence timeline
    const timers = [
      setTimeout(() => setStep(1), 400),   // Grid activates
      setTimeout(() => setStep(2), 900),   // IEEE appears
      setTimeout(() => setStep(3), 1400),  // IAS and RAS appear
      setTimeout(() => setStep(4), 1900),  // INNOVATEX assembles
      setTimeout(() => setStep(5), 2500),  // 2026 activates
      setTimeout(() => {
        onComplete();
      }, 3400),                           // Complete & transition to hero
    ];

    // Progress bar tick
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 70);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  const handleEnterWithBGM = () => {
    audioEngine.startBGM();
    onComplete();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#050914] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
      role="status"
      aria-label="Loading IEEE InnovateX 2026 Experience"
    >
      {/* Background blueprint subtle grid lines */}
      <div className={`absolute inset-0 bg-circuit-grid transition-opacity duration-1000 ${
        step >= 1 ? 'opacity-40' : 'opacity-0'
      }`} />

      {/* Radial lighting bloom */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none animate-pulse" />

      {/* Top Controls: Enter with BGM & Skip Button */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={handleEnterWithBGM}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-950/50 hover:bg-rose-900/60 text-xs text-rose-200 border border-rose-500/30 transition-all shadow-sm backdrop-blur-md"
          title="Start with soothing piano & guitar music"
        >
          <Music className="w-3.5 h-3.5 text-rose-300" />
          <span>Enter with Music</span>
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white border border-slate-700/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <span>Skip</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Stage Animation */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full">
        
        {/* Step 1: Small System Label */}
        <div className={`text-xs font-mono text-cyan-400 uppercase tracking-widest transition-all duration-700 mb-6 ${
          step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          IEEE STUDENT SOCIETY TECHNICAL SYMPOSIUM
        </div>

        {/* Step 2 & 3: IEEE, IAS, and RAS Logos Assembling */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 my-4 min-h-[50px]">
          
          {/* IEEE */}
          <div className={`transition-all duration-700 transform ${
            step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <SafeImage
              src={EVENT_DATA.assets.ieeeLogo}
              alt="IEEE"
              className="h-8 sm:h-10 w-auto object-contain filter brightness-125"
              fallbackText="IEEE"
            />
          </div>

          <div className={`w-[1px] h-6 bg-slate-700 transition-opacity duration-500 ${
            step >= 3 ? 'opacity-100' : 'opacity-0'
          }`} />

          {/* IAS */}
          <div className={`transition-all duration-700 transform delay-100 ${
            step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <SafeImage
              src={EVENT_DATA.assets.iasLogo}
              alt="IEEE IAS"
              className="h-7 sm:h-9 w-auto object-contain filter brightness-125"
              fallbackText="IEEE IAS"
            />
          </div>

          <div className={`w-[1px] h-6 bg-slate-700 transition-opacity duration-500 ${
            step >= 3 ? 'opacity-100' : 'opacity-0'
          }`} />

          {/* RAS */}
          <div className={`transition-all duration-700 transform delay-200 ${
            step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <SafeImage
              src={EVENT_DATA.assets.rasLogo}
              alt="IEEE RAS"
              className="h-7 sm:h-9 w-auto object-contain filter brightness-125"
              fallbackText="IEEE RAS"
            />
          </div>
        </div>

        {/* Step 4 & 5: Big Typographic Reveal */}
        <div className="my-6">
          <div className={`text-4xl sm:text-6xl font-extrabold tracking-tight text-white transition-all duration-700 ${
            step >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}>
            INNOVATEX{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 via-cyan-300 to-amber-300 transition-all duration-700 ${
              step >= 5 ? 'opacity-100 filter brightness-110' : 'opacity-0'
            }`}>
              2026
            </span>
          </div>

          <div className={`text-sm sm:text-base font-semibold text-slate-400 tracking-wide mt-2 transition-all duration-700 ${
            step >= 4 ? 'opacity-100' : 'opacity-0'
          }`}>
            WHERE IDEAS MEET ENGINEERING
          </div>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="w-64 sm:w-80 mt-6">
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-fuchsia-600 via-purple-500 via-cyan-400 to-amber-400 transition-all duration-150 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2.5">
            <span>CALIBRATING 3D ENVIRONMENT</span>
            <span className="tabular-nums text-pink-400 font-semibold">{Math.min(Math.round(progress), 100)}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};
