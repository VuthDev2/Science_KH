// Zero-dependency Web Audio API sound effects for interactive STEM learning
import {
  triggerHapticLight,
  triggerHapticSuccess,
  triggerHapticWarning,
} from "@/lib/native-mobile";

class SoundEffects {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sciencekh_sound");
        // "0" means muted; default or "1" means enabled
        this.muted = stored === "0";
      } catch {}
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  isEnabled(): boolean {
    return !this.muted;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sciencekh_sound", muted ? "0" : "1");
      } catch {}
    }
  }

  setEnabled(enabled: boolean) {
    this.setMuted(!enabled);
  }

  toggle(): boolean {
    const nextVal = !this.muted;
    this.setMuted(nextVal);
    return !nextVal;
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Bright ascending chime for correct answers with dynamic pitch scaling based on combo streak
   */
  playCorrect(combo = 1) {
    triggerHapticSuccess();
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Scale pitch based on combo streak (Do -> Re -> Mi -> Fa -> Sol)
    const baseFreqs = [
      [523.25, 659.25],          // Combo 1: C5 -> E5
      [587.33, 739.99],          // Combo 2: D5 -> F#5
      [659.25, 830.61],          // Combo 3: E5 -> G#5
      [783.99, 987.77],          // Combo 4: G5 -> B5
      [880.00, 1046.50, 1318.51] // Combo 5+: A5 -> C6 -> E6 (sparkling triumph)
    ];

    const pitchIndex = Math.min(Math.max(0, combo - 1), baseFreqs.length - 1);
    const notes = baseFreqs[pitchIndex];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = combo >= 3 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0, now + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.36);
    });
  }

  /**
   * Crisp, tactile "pop" sound for selecting buttons, cards, or tokens
   */
  playPop() {
    triggerHapticLight();
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  /**
   * Gentle, non-punitive low thud for learning mistakes
   */
  playWrong() {
    triggerHapticWarning();
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.31);
  }

  /**
   * Heart lost warning sound
   */
  playHeartLost() {
    triggerHapticWarning();
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(349.23, now); // F4
    osc.frequency.linearRampToValueAtTime(261.63, now + 0.2); // C4

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  /**
   * Celebratory victory fanfare when completing a quiz / lesson
   */
  playVictory() {
    triggerHapticSuccess();
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // C5, E5, G5, C6 arpeggio
    const chords = [523.25, 659.25, 783.99, 1046.5];

    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      const duration = idx === chords.length - 1 ? 0.6 : 0.2;
      gain.gain.setValueAtTime(0, now + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + duration + 0.01);
    });
  }

  /**
   * Resonant scientific synthesizer chime for formula pronunciation
   */
  playFormulaSynthesizer() {
    triggerHapticLight();
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [349.23, 440.0, 523.25, 659.25]; // F4, A4, C5, E5

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.41);
    });
  }
}

export const sounds = new SoundEffects();
