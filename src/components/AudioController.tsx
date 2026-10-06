import React, { useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioController: React.FC = () => {
  const [isMuted, setIsMuted] = useState(audioEngine.getIsMuted());
  const [isPlaying, setIsPlaying] = useState(audioEngine.getIsBGMPlaying());

  useEffect(() => {
    const unsub = audioEngine.subscribe(() => {
      setIsMuted(audioEngine.getIsMuted());
      setIsPlaying(audioEngine.getIsBGMPlaying());
    });
    return () => unsub();
  }, []);

  const handleToggle = () => {
    audioEngine.playClick();
    if (isMuted || !isPlaying) {
      if (isMuted) {
        audioEngine.toggleMute();
      }
      if (!isPlaying) {
        audioEngine.startBGM();
      }
    } else {
      audioEngine.toggleMute();
    }
  };

  const active = !isMuted && isPlaying;

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 text-xs font-medium group shadow-sm ${
        active
          ? 'bg-rose-950/40 text-rose-200 border border-rose-500/40 hover:border-rose-400 shadow-rose-950/20'
          : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/50'
      }`}
      aria-label={active ? 'Pause Soft Acoustic BGM' : 'Play Soft Piano & Guitar BGM'}
      title={active ? 'Soft acoustic melody playing. Click to mute.' : 'Click to play soft acoustic piano & guitar tune.'}
    >
      {active ? (
        <Music className="w-3.5 h-3.5 text-rose-300 animate-spin [animation-duration:10s]" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" />
      )}

      <span className="hidden sm:inline">
        {active ? 'Melody: On' : 'Music: Off'}
      </span>

      {/* Gentle, elegant sound indicator */}
      {active && (
        <span className="flex items-center gap-0.5 ml-0.5" aria-hidden="true">
          <span className="w-0.5 h-2 bg-rose-400 rounded-full animate-pulse [animation-duration:1.2s]" />
          <span className="w-0.5 h-3 bg-amber-300 rounded-full animate-pulse [animation-duration:0.9s]" />
          <span className="w-0.5 h-1.5 bg-rose-300 rounded-full animate-pulse [animation-duration:1.4s]" />
        </span>
      )}
    </button>
  );
};
