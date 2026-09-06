import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { usePreloader } from '../../context/PreloaderContext';
import { preloaderAudio } from '../../utils/preloaderAudio';
import { AARAMBH_VECTOR_PATH, AARAMBH_VECTOR_VIEWBOX } from './aarambhLogoPath';

// Official Assets:
// 1. FULL OFFICIAL LOGO: Complete Aarambh logo updated with the new stylized "A"
const FULL_LOGO_SRC = '/assets/aarambh-full-with-new-a.png';

// 2. ISOLATED "A" SYMBOL: Stylized Aarambh "A" extracted from Gemini_Generated_Image_2ikxcl2ikxcl2ikx.png
const ISOLATED_A_SRC = '/assets/aarambh-isolated-a-new.png';

// Optical pivot center of the new stylized "A" inside the 1983x793 coordinate canvas
const A_TRANSFORM_ORIGIN = '18.26% 51.50%';

export const Preloader: React.FC = () => {
  const { isPreloaderActive, dismissPreloader, audioEnabled, toggleAudio } = usePreloader();

  const [imagesReady, setImagesReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  });

  // Phases:
  // 0: Initial Screen - Cosmic void / intentionally empty (0 - 300ms)
  // 1: Isolated A Entrance - Rotates and scales into position (300ms - 1150ms)
  // 2: Snap into Position - Precise satisfying settle + bloom (1150ms - 1400ms)
  // 3: Full Logo Reveal - Wordmark emerges from behind A via mask expansion (1400ms - 2250ms)
  // 4: Seamless Handoff - Isolated A fades out into full logo underneath (2250ms - 2400ms)
  // 5: Character Trace & Highlight - Characters are outlined & illuminated (2400ms - 3650ms)
  // 6: Website Transition - Dissolves smoothly into live application (3650ms - 4150ms)
  const [phase, setPhase] = useState<number>(0);

  // Preload both image assets immediately to ensure instantaneous presentation
  useEffect(() => {
    let active = true;
    const imgFull = new Image();
    const imgIsolatedA = new Image();
    let count = 0;

    const onDone = () => {
      count++;
      if (count >= 2 && active) setImagesReady(true);
    };

    imgFull.onload = onDone;
    imgFull.onerror = onDone;
    imgIsolatedA.onload = onDone;
    imgIsolatedA.onerror = onDone;

    imgFull.src = FULL_LOGO_SRC;
    imgIsolatedA.src = ISOLATED_A_SRC;

    const timeout = setTimeout(() => {
      if (active) setImagesReady(true);
    }, 250);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Reset phase whenever preloader is activated
  useEffect(() => {
    if (isPreloaderActive) {
      setPhase(0);
    }
  }, [isPreloaderActive]);

  // Main animation timeline
  useEffect(() => {
    if (!isPreloaderActive || !imagesReady) return;

    if (prefersReducedMotion) {
      // Accessible reduced motion timeline: gentle fade-in, hold, then dissolve
      setPhase(4);
      const timer = setTimeout(() => {
        setPhase(6);
        setTimeout(dismissPreloader, 400);
      }, 1600);
      return () => clearTimeout(timer);
    }

    // Phase 0 -> 1: Isolated A begins entering (at 200ms)
    const t1 = setTimeout(() => {
      setPhase(1);
      if (audioEnabled) preloaderAudio.playEntranceDrone();
    }, 200);

    // Phase 1 -> 2: Snap into position (at 950ms)
    const t2 = setTimeout(() => {
      setPhase(2);
      if (audioEnabled) preloaderAudio.playSnapChime();
    }, 950);

    // Phase 2 -> 3: Full logo reveal - wordmark emerges from behind A (at 1200ms)
    const t3 = setTimeout(() => {
      setPhase(3);
      if (audioEnabled) preloaderAudio.playEmergenceShimmer();
    }, 1200);

    // Phase 3 -> 4: Seamless handoff - standalone A fades out to full logo (at 1950ms)
    const t4 = setTimeout(() => {
      setPhase(4);
    }, 1950);

    // Phase 4 -> 5: Character Contour Trace & Typography Highlight (at 2080ms)
    const t5 = setTimeout(() => {
      setPhase(5);
      if (audioEnabled) preloaderAudio.playCharacterTrace();
    }, 2080);

    // Phase 5 -> 6: Website transition - dissolve into page (at 3200ms)
    const t6 = setTimeout(() => {
      setPhase(6);
    }, 3200);

    // Complete transition and unmount (at 3650ms)
    const t7 = setTimeout(() => {
      dismissPreloader();
    }, 3650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [isPreloaderActive, imagesReady, prefersReducedMotion, audioEnabled, dismissPreloader]);

  return (
    <AnimatePresence>
      {isPreloaderActive && (
        <motion.div
          id="aarambh-preloader"
          key="aarambh-preloader-overlay"
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase >= 6 ? 0 : 1,
            scale: phase >= 6 ? 1.02 : 1,
          }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center bg-[#05050A] overflow-hidden select-none"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Cosmic Background Gradient & Vignette */}
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

          {/* Subtle Ambient Cosmic Nebula Glow */}
          <motion.div
            className="absolute w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-accent-purple/20 via-accent-gold/10 to-transparent blur-[120px] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase >= 1 ? 0.35 : 0.12,
              scale: phase >= 2 ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Phase 2: Snap Celestial Shockwave / Light Bloom Halo */}
          {phase >= 2 && phase < 6 && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{
                scale: [0.5, 1.7],
                opacity: [0, 0.65, 0],
              }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-64 h-64 rounded-full border border-accent-gold/40 shadow-[0_0_45px_rgba(242,193,78,0.35)] pointer-events-none"
              style={{
                left: 'calc(50% - 128px)',
                top: 'calc(50% - 128px)',
              }}
            />
          )}

          {/* 
            PARENT LOGO STAGE:
            Represents the bounding box of the complete Aarambh logo (aspect 1983/793).
            Remains perfectly centered and stationary.
          */}
          <div
            id="aarambh-logo-stage"
            className="relative w-[86vw] max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl aspect-[1983/793] flex items-center justify-center pointer-events-none"
          >
            {/* 
              LAYER 1 (Lower z-index: z-10):
              THE FULL OFFICIAL AARAMBH LOGO
              Asset: file_00000000a774820885c4e18328008380.png
              Stationary in its final position.
              Revealed progressively via horizontal mask expansion toward the right.
            */}
            <motion.div
              id="aarambh-full-logo-mask"
              className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
              initial={{
                clipPath: 'inset(0% 100% 0% 0%)',
                opacity: 0,
              }}
              animate={{
                // In Phase 0-2: Hidden
                // In Phase 3: Unmasks from the stylized A (~36.6%) horizontally towards 100%
                // In Phase 4+: Fully revealed
                clipPath:
                  phase < 3
                    ? 'inset(0% 100% 0% 0%)'
                    : phase === 3
                    ? 'inset(0% 0% 0% 0%)'
                    : 'inset(0% 0% 0% 0%)',
                opacity: phase >= 3 ? 1 : 0,
              }}
              transition={{
                clipPath: {
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: {
                  duration: 0.1,
                },
              }}
            >
              <img
                src={FULL_LOGO_SRC}
                alt="Aarambh Full Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(107,70,193,0.35)]"
                draggable={false}
                loading="eager"
                decoding="sync"
              />
            </motion.div>

            {/* 
              LAYER 2 (Higher z-index: z-20):
              THE ISOLATED "A" SYMBOL
              Asset: Gemini_Generated_Image_2ikxcl2ikxcl2ikx.png (extracted & matted)
              Animates into the stage, snaps into its precise final coordinate, and visually
              dominates during Phase 2 and 3. In Phase 4, it seamlessly hands off (fades out)
              leaving the identical full logo visible underneath.
            */}
            <motion.div
              id="aarambh-isolated-a"
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                transformOrigin: A_TRANSFORM_ORIGIN,
                willChange: 'transform, opacity, filter',
                transform: 'translateZ(0)',
              }}
              initial={{
                opacity: 0,
                scale: 0.8,
                rotate: -135,
                filter: 'blur(8px) drop-shadow(0 0 35px rgba(107,70,193,0.7))',
              }}
              animate={{
                // Opacity: Appears in Phase 1, stays through Phase 3, fades out in Phase 4 handoff
                opacity:
                  phase === 0
                    ? 0
                    : phase >= 1 && phase < 4
                    ? 1
                    : 0,
                // Scale: Smooth entrance in Phase 1, snap settle in Phase 2, stable in Phase 3
                scale:
                  phase === 0
                    ? 0.8
                    : phase === 1
                    ? 1.0
                    : phase === 2
                    ? [1.0, 1.05, 0.985, 1.0] // Precise snap settle
                    : 1.0,
                // Rotation: Orients from -135deg to 0deg in Phase 1
                rotate: phase >= 1 ? 0 : -135,
                filter:
                  phase >= 2
                    ? 'blur(0px) drop-shadow(0 0 30px rgba(242,193,78,0.5)) drop-shadow(0 0 55px rgba(107,70,193,0.4))'
                    : 'blur(0px) drop-shadow(0 0 25px rgba(107,70,193,0.6))',
              }}
              transition={{
                opacity: {
                  duration: phase >= 4 ? 0.12 : 0.45,
                  ease: 'easeOut',
                },
                rotate: {
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                },
                scale:
                  phase === 2
                    ? { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                filter: { duration: 0.25 },
              }}
            >
              <img
                src={ISOLATED_A_SRC}
                alt="Aarambh Isolated A"
                className="w-full h-full object-contain"
                draggable={false}
                loading="eager"
                decoding="sync"
              />
            </motion.div>

            {/* 
              PHASE 5: CHARACTER CONTOUR TRACING & TYPOGRAPHY HIGHLIGHT
              Instead of highlighting a rectangular box, the contours of the Aarambh characters
              are traced with a celestial laser beam, while a golden starlight sheen washes across
              ONLY the character typography (strictly masked to the logo silhouette).
            */}
            {phase >= 5 && (
              <>
                {/* 1. TYPOGRAPHY-MASKED LIGHT WASH (No rectangular box, strictly fills the character glyphs) */}
                <motion.div
                  id="aarambh-character-mask-highlight"
                  className="absolute inset-0 z-25 pointer-events-none"
                  style={{
                    maskImage: `url(${FULL_LOGO_SRC})`,
                    WebkitMaskImage: `url(${FULL_LOGO_SRC})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Radiant starlight beam passing exclusively through the character bodies */}
                  <motion.div
                    className="w-2/5 h-full bg-gradient-to-r from-transparent via-accent-gold/45 via-white/70 to-transparent skew-x-[-18deg] blur-md"
                    initial={{ x: '-130%' }}
                    animate={{ x: '280%' }}
                    transition={{
                      duration: 1.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </motion.div>

                {/* 2. VECTOR CHARACTER CONTOUR TRACE (Laser-sharp tracing of the letter perimeters) */}
                <svg
                  id="aarambh-character-contour-svg"
                  viewBox={AARAMBH_VECTOR_VIEWBOX}
                  className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* Linear gradient for the traveling trace along the letterforms */}
                    <linearGradient id="traceBeamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity="0.6" />
                      <stop offset="35%" stopColor="#F2C14E" stopOpacity="1" />
                      <stop offset="70%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#F2C14E" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Soft stardust aura filter for character contour illumination */}
                    <filter id="traceGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur1" />
                      <feGaussianBlur stdDeviation="12" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Ambient glowing character silhouette echo */}
                  <motion.path
                    d={AARAMBH_VECTOR_PATH}
                    fill="none"
                    stroke="#F2C14E"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#traceGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1],
                      opacity: [0, 0.65, 0.45, 0],
                    }}
                    transition={{
                      pathLength: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 1.25, times: [0, 0.2, 0.8, 1], ease: 'easeOut' },
                    }}
                  />

                  {/* Razor-sharp luminous starlight contour trace */}
                  <motion.path
                    d={AARAMBH_VECTOR_PATH}
                    fill="none"
                    stroke="url(#traceBeamGradient)"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1],
                      opacity: [0, 1, 0.95, 0],
                    }}
                    transition={{
                      pathLength: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 1.25, times: [0, 0.15, 0.85, 1], ease: 'easeOut' },
                    }}
                  />
                </svg>

                {/* 3. CELESTIAL ARC APEX STARLIGHT FLARE (Diamond 4-pointed sparkle) */}
                <motion.div
                  className="absolute z-35 pointer-events-none"
                  style={{
                    left: '58.5%',
                    top: '8.5%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ scale: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1.4, 1.1, 0],
                    opacity: [0, 1, 0.85, 0],
                    rotate: [0, 45],
                  }}
                  transition={{
                    duration: 1.05,
                    times: [0, 0.35, 0.75, 1],
                    ease: 'easeOut',
                  }}
                >
                  {/* Central radiant diamond core */}
                  <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_18px_6px_rgba(242,193,78,0.95)]" />
                  {/* Horizontal diffraction ray */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />
                  {/* Vertical diffraction ray */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
                </motion.div>
              </>
            )}
          </div>

          {/* Subtle Orientation Label */}
          <motion.div
            className="absolute bottom-12 text-center pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: phase >= 1 && phase < 5 ? 0.6 : 0,
              y: phase >= 1 && phase < 5 ? 0 : 10,
            }}
            transition={{ duration: 0.35 }}
          >
            <span className="text-[11px] sm:text-xs font-display font-medium tracking-[0.3em] uppercase text-text-muted">
              Orientation 2026
            </span>
          </motion.div>

          {/* Audio Mute/Unmute Control */}
          <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
            <button
              id="preloader-audio-toggle"
              onClick={toggleAudio}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors duration-200 backdrop-blur-md"
              title={audioEnabled ? 'Mute audio' : 'Enable audio'}
              aria-label={audioEnabled ? 'Mute audio' : 'Enable audio'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-accent-gold" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
