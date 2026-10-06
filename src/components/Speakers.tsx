import React, { useState } from 'react';
import { EVENT_DATA, Speaker } from '../data/eventData';
import { SafeImage } from './SafeImage';
import { Linkedin, ExternalLink, BookOpen, X, Sparkles, Award } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { ScrollReveal } from './ScrollReveal';

interface CardProps {
  speaker: Speaker;
  index: number;
  onOpenAbstract: (speaker: Speaker) => void;
}

const SpeakerCard: React.FC<CardProps> = ({ speaker, index, onOpenAbstract }) => {
  const isFirst = index === 0;
  const theme = isFirst
    ? {
        border: 'border-pink-500/40 hover:border-pink-400',
        badge: 'text-pink-300 bg-pink-950/90 border-pink-500/50',
        topicText: 'text-pink-400',
        iconColor: 'text-pink-400',
        shadow: 'hover:shadow-pink-950/60 shadow-xl',
        gradientLine: 'from-pink-500 to-purple-500',
        btnText: 'text-pink-300 hover:text-white',
      }
    : {
        border: 'border-amber-500/40 hover:border-amber-400',
        badge: 'text-amber-300 bg-amber-950/90 border-amber-500/50',
        topicText: 'text-amber-400',
        iconColor: 'text-amber-400',
        shadow: 'hover:shadow-amber-950/60 shadow-xl',
        gradientLine: 'from-amber-500 to-orange-500',
        btnText: 'text-amber-300 hover:text-white',
      };

  return (
    <div
      onMouseEnter={() => audioEngine.playHover()}
      className={`relative bg-slate-900/90 border ${theme.border} rounded-3xl overflow-hidden transition-all duration-300 ${theme.shadow} flex flex-col sm:flex-row group h-full hover:-translate-y-1`}
    >
      
      {/* Top energy indicator line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradientLine} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Speaker Avatar Container */}
      <div className="sm:w-64 h-72 sm:h-auto shrink-0 relative bg-slate-950 overflow-hidden">
        <SafeImage
          src={speaker.avatarUrl}
          alt={`${speaker.name} - ${speaker.topic}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
          fallbackText={speaker.code}
        />

        {/* Ambient subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

        {/* Speaker code badge with distinct color */}
        <div className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-lg text-xs font-mono font-bold border shadow-md ${theme.badge}`}>
          {speaker.code}
        </div>
      </div>

      {/* Speaker Content Details */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-4">
        <div>
          {/* Keynote Topic */}
          <div className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${theme.topicText}`}>
            <Sparkles className={`w-3.5 h-3.5 ${theme.iconColor}`} />
            <span>{speaker.topic}</span>
          </div>

          {/* Speaker Name */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5 font-mono">
            {speaker.name}
          </h3>

          {/* Role / Title */}
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 font-mono">
            {speaker.title}
          </p>

          {/* 1-2 Sentence Bio */}
          <p className="text-sm text-slate-300/90 leading-relaxed mt-4">
            {speaker.bio}
          </p>
        </div>

        {/* Card Footer: Abstract Action & LinkedIn Link */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              audioEngine.playClick();
              onOpenAbstract(speaker);
            }}
            className={`inline-flex items-center gap-1.5 text-xs font-bold ${theme.btnText} transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 py-1 font-mono uppercase tracking-wider`}
          >
            <BookOpen className={`w-4 h-4 ${theme.iconColor}`} />
            <span>View Plenary Abstract</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={speaker.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              aria-label={`${speaker.name} LinkedIn Profile (Placeholder)`}
              title="LinkedIn Profile Placeholder"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            {speaker.websiteUrl && (
              <a
                href={speaker.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                aria-label={`${speaker.name} Research Profile (Placeholder)`}
                title="Scholar/Research Profile Placeholder"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Speakers: React.FC = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section id="speakers" className="relative py-28 bg-[#070D1E] border-t border-purple-500/20 overflow-hidden">
      {/* Background ambient colorful glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal direction="up" distance={25} duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-pink-400" />
                <span>Plenary Technical Keynotes</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
                Keynote Speakers
              </h2>
            </div>
            <div className="mt-3 md:mt-0 text-xs sm:text-sm text-slate-400 font-mono">
              <span className="text-pink-300">[2 Keynote Plenary Sessions · Replaceable Profile Slots]</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Exactly 2 Keynote Speaker Cards with Staggered Hologram ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {EVENT_DATA.speakers.map((speaker, idx) => (
            <ScrollReveal
              key={speaker.id}
              direction="hologram"
              delay={idx * 150}
              duration={700}
              className="h-full"
            >
              <SpeakerCard
                speaker={speaker}
                index={idx}
                onOpenAbstract={(spk) => setSelectedSpeaker(spk)}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Note on Speaker Updates with ScrollReveal */}
        <ScrollReveal direction="up" delay={200} duration={600}>
          <div className="mt-10 text-center text-xs text-slate-400 font-mono">
            Final keynote profiles, formal biographical abstracts, and institutional affiliations will be published following program committee confirmation.
          </div>
        </ScrollReveal>

      </div>

      {/* Keynote Abstract Modal */}
      {selectedSpeaker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="speaker-modal-title"
        >
          <div className="bg-[#0B132B] border border-purple-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close Abstract Dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-pink-400 uppercase tracking-wider mb-1 font-bold">
              {selectedSpeaker.code} · {selectedSpeaker.topic}
            </div>

            <h3 id="speaker-modal-title" className="text-2xl font-extrabold text-white tracking-tight font-mono">
              {selectedSpeaker.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-4 font-mono">
              {selectedSpeaker.title}
            </p>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6">
              <span className="text-xs font-mono text-slate-400 uppercase block mb-1 font-bold">
                Plenary Talk Abstract
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedSpeaker.abstract}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-4">
              <span>Connect on professional networks:</span>
              <a
                href={selectedSpeaker.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-pink-300 hover:text-white font-semibold font-mono"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
