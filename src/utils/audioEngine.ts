/**
 * Soft Acoustic Piano & Guitar procedural synthesizer for IEEE InnovateX 2026.
 * Generates soothing, elegant, organic acoustic melodies:
 * - Emotive Grand Piano with hammer felt strikes & acoustic soundboard resonance
 * - Fingerstyle Acoustic Nylon/Steel Guitar with realistic plucked string dynamics
 * - Piano & Guitar Duet: Harmonious, relaxing acoustic arrangement
 * Pure Web Audio API: Zero external audio files, zero copyright, zero latency.
 */

type AudioListener = () => void;

export interface BGMTrackInfo {
  id: string;
  name: string;
  tag: string;
  bpm: number;
  description: string;
}

export const BGM_TRACKS: BGMTrackInfo[] = [
  {
    id: 'piano-guitar-harmony',
    name: 'Piano & Guitar Harmony',
    tag: 'ACOUSTIC DUET · 64 BPM',
    bpm: 64,
    description: 'Soothing blend of gentle grand piano arpeggios and acoustic fingerpicked guitar',
  },
  {
    id: 'soft-grand-piano',
    name: 'Soft Grand Piano',
    tag: 'SOLO PIANO · 62 BPM',
    bpm: 62,
    description: 'Emotive, warm grand piano chords with mellow felt-hammer acoustic resonance',
  },
  {
    id: 'acoustic-fingerstyle',
    name: 'Acoustic Guitar Melody',
    tag: 'FINGERSTYLE GUITAR · 66 BPM',
    bpm: 66,
    description: 'Warm, gentle plucked nylon and steel guitar strings with wooden body warmth',
  },
];

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBGMPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private bgmVolume: number = 0.32; // Soft, comfortable default volume
  private listeners: Set<AudioListener> = new Set();

  private activeIntervals: number[] = [];
  private activeTimeouts: number[] = [];
  private chordIndex: number = 0;

  // Emotive, soothing chord progression in D Major / B Minor
  private readonly chordProgression = [
    // Dmaj9
    {
      bass: 73.42, // D2
      pianoChord: [146.83, 220.0, 277.18, 329.63, 369.99], // D3, A3, C#4, E4, F#4
      guitarArp: [220.0, 293.66, 369.99, 440.0, 554.37], // A3, D4, F#4, A4, C#5
      melody: [554.37, 493.88, 440.0, 369.99], // C#5, B4, A4, F#4
    },
    // F#m7
    {
      bass: 92.5, // F#2
      pianoChord: [185.0, 277.18, 329.63, 440.0], // F#3, C#4, E4, A4
      guitarArp: [277.18, 369.99, 440.0, 554.37], // C#4, F#4, A4, C#5
      melody: [440.0, 493.88, 554.37, 659.25], // A4, B4, C#5, E5
    },
    // Gmaj7
    {
      bass: 98.0, // G2
      pianoChord: [196.0, 293.66, 369.99, 493.88], // G3, D4, F#4, B4
      guitarArp: [246.94, 293.66, 369.99, 493.88, 587.33], // B3, D4, F#4, B4, D5
      melody: [587.33, 493.88, 440.0, 369.99], // D5, B4, A4, F#4
    },
    // Asus4 -> A
    {
      bass: 110.0, // A2
      pianoChord: [220.0, 293.66, 329.63, 440.0], // A3, D4, E4, A4
      guitarArp: [220.0, 277.18, 329.63, 440.0, 554.37], // A3, C#4, E4, A4, C#5
      melody: [440.0, 493.88, 440.0, 369.99], // A4, B4, A4, F#4
    },
    // Bm7
    {
      bass: 123.47, // B2
      pianoChord: [246.94, 293.66, 369.99, 440.0], // B3, D4, F#4, A4
      guitarArp: [246.94, 293.66, 369.99, 440.0, 493.88], // B3, D4, F#4, A4, B4
      melody: [493.88, 440.0, 369.99, 293.66], // B4, A4, F#4, D4
    },
    // Em9
    {
      bass: 82.41, // E2
      pianoChord: [164.81, 246.94, 293.66, 369.99, 392.0], // E3, B3, D4, F#4, G4
      guitarArp: [196.0, 246.94, 293.66, 369.99, 493.88], // G3, B3, D4, F#4, B4
      melody: [369.99, 392.0, 440.0, 493.88], // F#4, G4, A4, B4
    },
    // Gmaj7 / A
    {
      bass: 110.0, // A2
      pianoChord: [196.0, 246.94, 293.66, 369.99], // G3, B3, D4, F#4
      guitarArp: [220.0, 293.66, 369.99, 440.0], // A3, D4, F#4, A4
      melody: [440.0, 493.88, 554.37, 587.33], // A4, B4, C#5, D5
    },
    // D (Peaceful resolution)
    {
      bass: 73.42, // D2
      pianoChord: [146.83, 220.0, 293.66, 369.99, 440.0], // D3, A3, D4, F#4, A4
      guitarArp: [220.0, 293.66, 369.99, 440.0, 587.33], // A3, D4, F#4, A4, D5
      melody: [587.33, 440.0, 369.99, 293.66], // D5, A4, F#4, D4
    },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = sessionStorage.getItem('innovatex_muted');
      this.isMuted = savedMute === 'true';
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.ctx && !this.bgmGain) {
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : this.bgmVolume, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsBGMPlaying(): boolean {
    return this.isBGMPlaying && !this.isMuted;
  }

  public getCurrentTrack(): BGMTrackInfo {
    return BGM_TRACKS[this.currentTrackIndex] || BGM_TRACKS[0];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getTracks(): BGMTrackInfo[] {
    return BGM_TRACKS;
  }

  public getBGMVolume(): number {
    return this.bgmVolume;
  }

  public setBGMVolume(val: number) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(
        this.isMuted ? 0 : this.bgmVolume,
        this.ctx.currentTime
      );
    }
    this.notify();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('innovatex_muted', String(this.isMuted));
    }

    if (this.isMuted) {
      if (this.bgmGain && this.ctx) {
        this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      if (this.sfxGain && this.ctx) {
        this.sfxGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    } else {
      this.initContext();
      if (this.bgmGain && this.ctx) {
        this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
      }
      if (this.sfxGain && this.ctx) {
        this.sfxGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      }
    }

    this.notify();
    return this.isMuted;
  }

  public switchTrack(trackIndex: number) {
    if (trackIndex < 0 || trackIndex >= BGM_TRACKS.length) return;
    this.currentTrackIndex = trackIndex;
    if (this.isBGMPlaying) {
      this.startBGM(trackIndex);
    } else {
      this.notify();
    }
  }

  public toggleBGM(): boolean {
    if (this.isBGMPlaying) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.isBGMPlaying;
  }

  /**
   * Start soft procedural acoustic BGM
   */
  public startBGM(trackIdx = this.currentTrackIndex) {
    this.initContext();
    if (!this.ctx) return;

    if (this.isMuted) {
      this.isMuted = false;
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('innovatex_muted', 'false');
      }
    }

    this.stopSynthesizers();
    this.currentTrackIndex = trackIdx;
    this.isBGMPlaying = true;

    try {
      if (this.bgmGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.bgmGain.gain.setValueAtTime(0.001, now);
        this.bgmGain.gain.linearRampToValueAtTime(this.bgmVolume, now + 1.5);
      }

      this.chordIndex = 0;
      this.startAcousticSession();
      this.notify();
    } catch {
      this.isBGMPlaying = false;
      this.notify();
    }
  }

  public stopBGM() {
    if (this.bgmGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, now);
      this.bgmGain.gain.linearRampToValueAtTime(0.001, now + 0.8);
    }

    setTimeout(() => {
      this.stopSynthesizers();
    }, 850);

    this.isBGMPlaying = false;
    this.notify();
  }

  private stopSynthesizers() {
    this.activeIntervals.forEach((id) => window.clearInterval(id));
    this.activeIntervals = [];
    this.activeTimeouts.forEach((id) => window.clearTimeout(id));
    this.activeTimeouts = [];
  }

  // --------------------------------------------------------------------------
  // PHYSICAL ACOUSTIC MODEL: SOFT GRAND PIANO NOTE
  // --------------------------------------------------------------------------
  private playSoftPianoNote(
    freq: number,
    duration: number = 3.0,
    velocity: number = 0.5,
    pan: number = 0
  ) {
    if (!this.ctx || !this.bgmGain || !this.isBGMPlaying || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Fundamental warm sine
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // 2. Second harmonic (octave warmth)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // 3. Third harmonic (gentle acoustic overtone)
      const osc3 = this.ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 3, now);

      // Gains
      const gain1 = this.ctx.createGain();
      const gain2 = this.ctx.createGain();
      const gain3 = this.ctx.createGain();
      const masterNoteGain = this.ctx.createGain();

      // Piano hammer felt attack and natural double-stage decay envelope
      const peakVol = Math.max(0.01, velocity * 0.11);
      masterNoteGain.gain.setValueAtTime(0.0001, now);
      // Soft felt hammer attack (8ms)
      masterNoteGain.gain.linearRampToValueAtTime(peakVol, now + 0.008);
      // Initial percussive decay
      masterNoteGain.gain.exponentialRampToValueAtTime(peakVol * 0.45, now + 0.35);
      // Long singing acoustic string sustain decay
      masterNoteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain1.gain.setValueAtTime(0.75, now);
      gain2.gain.setValueAtTime(0.22, now);
      gain3.gain.setValueAtTime(0.06, now);

      // Soundboard wooden warmth filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      // Mellow piano filter tracking note pitch
      filter.frequency.setValueAtTime(Math.min(1800, freq * 3.5 + 400), now);
      filter.Q.setValueAtTime(1.1, now);

      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(masterNoteGain);
      gain2.connect(masterNoteGain);
      gain3.connect(masterNoteGain);

      masterNoteGain.connect(filter);

      // Stereo spatial placement
      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(Math.max(-0.6, Math.min(0.6, pan)), now);
        filter.connect(panner);
        panner.connect(this.bgmGain);
      } else {
        filter.connect(this.bgmGain);
      }

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + duration + 0.1);
      osc2.stop(now + duration + 0.1);
      osc3.stop(now + duration + 0.1);
    } catch {
      // Safe catch
    }
  }

  // --------------------------------------------------------------------------
  // PHYSICAL ACOUSTIC MODEL: SOFT ACOUSTIC GUITAR (FINGERPICKED NYLON/STEEL)
  // --------------------------------------------------------------------------
  private playSoftGuitarNote(
    freq: number,
    duration: number = 2.4,
    velocity: number = 0.5,
    pan: number = 0
  ) {
    if (!this.ctx || !this.bgmGain || !this.isBGMPlaying || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;

      // Triangular core for plucked string timbre
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle warm second harmonic
      const subOsc = this.ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(freq * 2, now);

      const noteGain = this.ctx.createGain();
      const subGain = this.ctx.createGain();
      const peakVol = Math.max(0.01, velocity * 0.08);

      // Rapid plucked string attack (4ms) & sweet acoustic guitar decay
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(peakVol, now + 0.005);
      noteGain.gain.exponentialRampToValueAtTime(peakVol * 0.35, now + 0.22);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      subGain.gain.setValueAtTime(peakVol * 0.25, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      // Dynamic acoustic lowpass filter (drops on pluck from bright to warm wooden body)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.min(2600, freq * 4.2), now);
      filter.frequency.exponentialRampToValueAtTime(Math.min(900, freq * 1.8), now + 0.18);
      filter.Q.setValueAtTime(1.8, now);

      // Wooden body resonance filter (acoustic guitar cavity boost around 220Hz)
      const bodyFilter = this.ctx.createBiquadFilter();
      bodyFilter.type = 'peaking';
      bodyFilter.frequency.setValueAtTime(220, now);
      bodyFilter.gain.setValueAtTime(3.5, now);
      bodyFilter.Q.setValueAtTime(1.2, now);

      osc.connect(noteGain);
      subOsc.connect(subGain);

      noteGain.connect(filter);
      subGain.connect(filter);

      filter.connect(bodyFilter);

      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(Math.max(-0.6, Math.min(0.6, pan)), now);
        bodyFilter.connect(panner);
        panner.connect(this.bgmGain);
      } else {
        bodyFilter.connect(this.bgmGain);
      }

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + duration + 0.1);
      subOsc.stop(now + duration + 0.1);
    } catch {
      // Safe catch
    }
  }

  // --------------------------------------------------------------------------
  // HARMONIC ACOUSTIC SESSION ARRANGER
  // --------------------------------------------------------------------------
  private startAcousticSession() {
    const measureDurationMs = 3750; // 64 BPM, 4/4 measure (peaceful tempo)

    const playMeasure = () => {
      if (!this.isBGMPlaying || !this.ctx || !this.bgmGain) return;

      const chordData = this.chordProgression[this.chordIndex];
      this.chordIndex = (this.chordIndex + 1) % this.chordProgression.length;

      const mode = this.currentTrackIndex; // 0: Duet, 1: Solo Piano, 2: Solo Guitar

      // 1. Deep acoustic piano bass root note on beat 1
      if (mode === 0 || mode === 1) {
        this.playSoftPianoNote(chordData.bass, 3.8, 0.65, -0.25);
      } else {
        this.playSoftGuitarNote(chordData.bass, 3.2, 0.7, -0.15);
      }

      // 2. Arpeggiated gentle accompaniment
      chordData.pianoChord.forEach((noteFreq, idx) => {
        const delayMs = idx * 420 + Math.random() * 40; // Gentle rubato feel
        const tId = window.setTimeout(() => {
          if (!this.isBGMPlaying) return;
          const pan = -0.3 + (idx / chordData.pianoChord.length) * 0.6;

          if (mode === 0) {
            // Duet: Alternating soft piano chords and guitar plucks
            if (idx % 2 === 0) {
              this.playSoftPianoNote(noteFreq, 2.8, 0.45, pan);
            } else {
              this.playSoftGuitarNote(noteFreq, 2.2, 0.4, pan);
            }
          } else if (mode === 1) {
            // Solo Piano
            this.playSoftPianoNote(noteFreq, 3.0, 0.45, pan);
          } else {
            // Solo Guitar
            this.playSoftGuitarNote(noteFreq, 2.4, 0.45, pan);
          }
        }, delayMs);
        this.activeTimeouts.push(tId);
      });

      // 3. Delicate lyrical acoustic guitar or piano melody on beats 2 & 4
      chordData.melody.forEach((melFreq, idx) => {
        const delayMs = 1200 + idx * 580 + (Math.random() - 0.5) * 60;
        const tId = window.setTimeout(() => {
          if (!this.isBGMPlaying) return;
          const pan = 0.2 + (idx % 2 === 0 ? 0.15 : -0.15);

          if (mode === 0 || mode === 2) {
            // Guitar melody
            this.playSoftGuitarNote(melFreq, 2.2, 0.52, pan);
          } else {
            // High register piano singing note
            this.playSoftPianoNote(melFreq, 2.6, 0.5, pan);
          }
        }, delayMs);
        this.activeTimeouts.push(tId);
      });
    };

    // Play first measure immediately, then schedule recurring measures
    playMeasure();
    const intervalId = window.setInterval(playMeasure, measureDurationMs);
    this.activeIntervals.push(intervalId);
  }

  // --------------------------------------------------------------------------
  // ELEGANT UI SOUND EFFECTS
  // --------------------------------------------------------------------------
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Safe catch
    }
  }

  public playHover() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);

      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Safe catch
    }
  }

  public playChime(freq = 587.33, duration = 0.25, _unused?: any) {
    if (this.isMuted) return;
    this.playSoftPianoNote(freq, duration, 0.45, 0);
  }

  public playPassGenerated() {
    if (this.isMuted) return;
    this.playChime(783.99, 0.4);
    setTimeout(() => this.playChime(1046.5, 0.5), 120);
  }

  public playCinematicIntro() {
    if (this.isMuted) return;
    this.playChime(440, 0.6);
  }

  public playModeSwitch() {
    this.playChime(659.25, 0.3);
  }

  public getAverageAudioLevel(): number {
    return this.isBGMPlaying && !this.isMuted ? 0.35 : 0;
  }
}

export const audioEngine = new AudioEngine();
