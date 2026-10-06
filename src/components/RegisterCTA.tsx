import React, { useState } from 'react';
import { EVENT_DATA } from '../data/eventData';
import {
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  QrCode,
  Check,
  RefreshCw,
  ShieldCheck,
  Award,
  Zap,
  Ticket,
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { ScrollReveal } from './ScrollReveal';

interface RegisterCTAProps {
  onOpenRegisterModal: () => void;
}

export const RegisterCTA: React.FC<RegisterCTAProps> = ({ onOpenRegisterModal }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [trackChoice, setTrackChoice] = useState('Robotics & Automation (RAS)');
  const [generatedPass, setGeneratedPass] = useState<{
    id: string;
    name: string;
    email: string;
    track: string;
    timestamp: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedPass, setCopiedPass] = useState(false);

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setErrorMsg('Please enter your full name for the symposium pass.');
      return;
    }
    if (!emailInput || !emailInput.includes('@')) {
      setErrorMsg('Please enter a valid student / institutional email.');
      return;
    }

    setErrorMsg('');
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const newPass = {
      id: `INX-2026-${randomHex}`,
      name: nameInput.trim(),
      email: emailInput.trim(),
      track: trackChoice,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setGeneratedPass(newPass);
    audioEngine.playPassGenerated();
  };

  const handleCopyPassId = () => {
    if (generatedPass) {
      navigator.clipboard.writeText(generatedPass.id);
      setCopiedPass(true);
      audioEngine.playClick();
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  return (
    <section
      id="register"
      className="relative py-24 sm:py-32 bg-[#070D1E] overflow-hidden border-t border-purple-500/20 w-full"
    >
      {/* Background blueprint circuit lines & volumetric rainbow lighting */}
      <div className="absolute inset-0 bg-circuit-grid opacity-50 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] max-w-full h-[550px] bg-pink-600/15 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[650px] max-w-full h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Top Header Container with ScrollReveal */}
        <ScrollReveal direction="up" distance={25} duration={600}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto w-full">
            {/* Small label badge with pink/purple styling */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-pink-500/40 text-xs font-mono font-bold text-pink-300 tracking-wider uppercase mb-6 shadow-lg shadow-pink-950/40">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Delegate Participation & Registration</span>
            </div>

            {/* Heading: READY TO INNOVATE? with Chromatic Gradient */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 via-purple-300 to-amber-300 tracking-tight leading-tight uppercase font-mono break-words w-full">
              READY TO INNOVATE?
            </h2>

            {/* Supporting text */}
            <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
              Join IEEE InnovateX 2026 and be part of a community building ideas through engineering and technology.
            </p>

            {/* Distinct Colorful Value Badges Strip */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-slate-300 w-full">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-950/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Registration Fee</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-950/40">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified IEEE Accreditation</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/40 text-amber-300 shadow-sm shadow-amber-950/40">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>IAS & RAS Plenary Access</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  onOpenRegisterModal();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-400 rounded-2xl shadow-xl shadow-purple-950/80 hover:shadow-pink-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 uppercase tracking-wider font-mono border border-pink-400/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4 text-pink-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={EVENT_DATA.event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-purple-500/40 hover:border-purple-400 rounded-2xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 shadow-lg font-mono"
              >
                <span>DIRECT PORTAL URL</span>
                <ExternalLink className="w-4 h-4 text-purple-400" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Holographic Delegate Pass Generator with Chromatic Rainbow Sheen */}
        <ScrollReveal direction="hologram" delay={150} duration={700}>
          <div className="mt-14 sm:mt-16 max-w-4xl mx-auto bg-slate-900/90 border border-purple-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md text-left w-full overflow-hidden">
            
            {/* Card Header */}
            <div className="border-b border-slate-800 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-xs font-mono text-pink-400 uppercase tracking-wider block font-bold flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-pink-400" />
                  <span>Interactive Accreditation Engine</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 truncate font-mono">
                  Generate Your Digital IEEE Delegate Pass
                </h3>
              </div>
              <span className="text-xs font-mono text-pink-300 bg-purple-950/80 px-3 py-1.5 rounded-lg border border-pink-500/40 w-fit shrink-0 font-bold shadow-sm">
                OFFICIAL ACCREDITATION
              </span>
            </div>

            {/* Main Form + Pass Rendering Grid */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between w-full">
              
              {/* Left: Input Form */}
              <div className="w-full lg:w-7/12 space-y-4">
                <form onSubmit={handleGeneratePass} className="space-y-4 w-full">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      DELEGATE FULL NAME <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Patel"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      STUDENT / ACADEMIC EMAIL <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jordan.patel@university.edu"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      TECHNICAL TRACK CONVERGENCE
                    </label>
                    <select
                      value={trackChoice}
                      onChange={(e) => setTrackChoice(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-pink-400 transition-colors font-mono"
                    >
                      <option value="Robotics & Automation (RAS)">Robotics & Automation (RAS) - Pink Track</option>
                      <option value="Industrial Systems & Power (IAS)">Industrial Systems & Power (IAS) - Amber Track</option>
                      <option value="Applied Computing & AI (IEEE)">Applied Computing & AI (IEEE) - Cyan Track</option>
                    </select>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-400 text-white text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-purple-950/60 flex items-center justify-center gap-2 border border-pink-400/40"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Render Holographic Pass</span>
                  </button>
                </form>

                <p className="text-[11px] text-slate-400">
                  Notice: Generates a verified digital credential token for provisional event registration.
                </p>
              </div>

              {/* Right: Prismatic Holographic Pass Rendering Card */}
              <div className="w-full lg:w-5/12 flex justify-center items-center">
                <div
                  className="w-full max-w-[320px] rounded-3xl bg-gradient-to-br from-[#1a0f2e] via-[#091124] to-[#0d1b2a] border border-pink-500/60 p-6 shadow-2xl relative overflow-hidden select-none hover:border-pink-400 transition-colors shadow-purple-950/80"
                >
                  {/* Prismatic Rainbow Specular Reflection Sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge"
                    style={{
                      background: `linear-gradient(135deg, rgba(236, 72, 153, 0.45) 0%, rgba(168, 85, 247, 0.4) 30%, rgba(6, 182, 212, 0.35) 70%, rgba(245, 158, 11, 0.4) 100%)`,
                    }}
                  />

                  {/* Micro Circuit Lines on Badge */}
                  <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />

                  {/* Header Lockup on Badge */}
                  <div className="relative z-10 flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
                    <div>
                      <span className="text-[9px] font-mono text-pink-400 uppercase tracking-widest block font-bold">
                        IEEE STUDENT SOCIETY
                      </span>
                      <span className="text-sm font-bold text-white tracking-wider font-mono">
                        INNOVATEX <span className="text-pink-400">2026</span>
                      </span>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-pink-950 border border-pink-500/50 text-[9px] font-mono text-pink-300 font-bold">
                      DELEGATE
                    </div>
                  </div>

                  {/* Delegate Details */}
                  <div className="relative z-10 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">
                        DELEGATE NAME
                      </span>
                      <div className="text-base font-bold text-white truncate font-mono">
                        {generatedPass ? generatedPass.name : 'Alex Morgan'}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">
                        CONVERGENCE TRACK
                      </span>
                      <div className="text-xs font-semibold text-pink-300 truncate font-mono">
                        {generatedPass ? generatedPass.track : 'Robotics & Automation (RAS)'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                      <div>
                        <span>PASS ID</span>
                        <div className="text-white font-bold">{generatedPass ? generatedPass.id : 'INX-2026-7842'}</div>
                      </div>
                      <div className="text-right">
                        <span>STATUS</span>
                        <div className="text-emerald-400 font-bold flex items-center gap-1 justify-end">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>VERIFIED</span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Barcode Area */}
                    <div className="pt-2 flex items-center justify-between gap-3 bg-slate-950/90 p-2.5 rounded-xl border border-purple-500/30">
                      <div className="p-1.5 bg-white rounded-lg">
                        <QrCode className="w-8 h-8 text-slate-950" />
                      </div>
                      <div className="text-[9px] font-mono text-slate-400 leading-tight">
                        <span className="text-pink-300 font-semibold">IEEE·IAS·RAS TOKEN</span>
                        <span className="block text-slate-500">SCAN AT MAIN CHECKPOINT</span>
                      </div>
                    </div>
                  </div>

                  {/* Copy Pass ID Button */}
                  {generatedPass && (
                    <div className="mt-4 pt-3 border-t border-slate-800 flex justify-center">
                      <button
                        onClick={handleCopyPassId}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-pink-400 hover:text-pink-300 font-bold"
                      >
                        {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <RefreshCw className="w-3.5 h-3.5" />}
                        <span>{copiedPass ? 'COPIED TO CLIPBOARD' : 'COPY PASS SERIAL ID'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
