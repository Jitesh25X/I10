/**
 * Synthesized Web Audio soundscapes for the Aarambh Preloader.
 * Purely client-side, zero external assets, fail-safe.
 */
class PreloaderAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ctx) {
      try {
        this.ctx.suspend().catch(() => {});
      } catch {}
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Ethereal ambient swell during the A symbol entrance
   */
  public playEntranceDrone() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Low warm sine pad
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, now); // A2 note
      osc1.frequency.exponentialRampToValueAtTime(165, now + 0.9); // E3 note

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(220, now); // A3 note
      osc2.frequency.exponentialRampToValueAtTime(277.18, now + 0.9); // C#4

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.05);
      osc2.stop(now + 1.05);
    } catch {}
  }

  /**
   * Delicate celestial crystal chime at the snap moment
   */
  public playSnapChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Resonant harmonic chime (Gold celestial tone)
      const freqs = [554.37, 880, 1318.51, 1760]; // C#5, A5, E6, A6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const initialVol = 0.05 / (idx + 1);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(initialVol, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.5);
      });
    } catch {}
  }

  /**
   * Gentle harmonic shimmer as "arambh" emerges
   */
  public playEmergenceShimmer() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, i) => {
        const noteTime = now + i * 0.12;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.03, noteTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.85);
      });
    } catch {}
  }

  /**
   * Crystalline harp glissando as the characters are traced with light
   */
  public playCharacterTrace() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Celestial pentatonic scale: F#5, G#5, A#5, C#6, D#6, F#6
      const scale = [739.99, 830.61, 932.33, 1108.73, 1244.51, 1479.98];
      scale.forEach((freq, idx) => {
        const noteTime = now + idx * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.035, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.95);
      });
    } catch {}
  }
}

export const preloaderAudio = new PreloaderAudio();
