import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { usePreloader } from '../../context/PreloaderContext';
import { preloaderAudio } from '../../utils/preloaderAudio';

/**
 * ============================================================================
 * CINEMATIC PRELOADER: "THE SPARK CREATES THE BEGINNING"
 * ============================================================================
 * Official Aarambh Logo: sacred, unified asset (never sliced, cropped or redrawn)
 */
const OFFICIAL_LOGO_SRC = '/file_00000000a774820885c4e18328008380.png';

/**
 * Normalized coordinate of the Crown Star above the stylized 'A'
 * derived mathematically from the 1983 x 793 official artwork:
 * X: 1204 / 1983 = 60.72%
 * Y: 70 / 793 = 8.83%
 */
const CROWN_STAR_X_PCT = 0.6072;
const CROWN_STAR_Y_PCT = 0.0883;

export const Preloader: React.FC = () => {
  const {
    isPreloaderActive,
    dismissPreloader,
    setWebsiteEmerging,
    audioEnabled,
    toggleAudio,
  } = usePreloader();

  // DOM Refs for high-precision, 60/120fps continuous animation
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const logoContainerRef = useRef<HTMLDivElement | null>(null);
  const logoWrapperRef = useRef<HTMLDivElement | null>(null);
  const sparkCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const shimmerSvgRef = useRef<SVGSVGElement | null>(null);

  // Sound trigger flags to ensure each sound fires once at its exact moment
  const soundPlayedRef = useRef<{
    swipe: boolean;
    settle: boolean;
    glimmer: boolean;
    emerge: boolean;
  }>({
    swipe: false,
    settle: false,
    glimmer: false,
    emerge: false,
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  });

  // Body scroll lock
  useEffect(() => {
    if (isPreloaderActive) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isPreloaderActive]);

  // Reduced motion media query listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  const handleSkip = useCallback(() => {
    setWebsiteEmerging(true);
    dismissPreloader();
  }, [setWebsiteEmerging, dismissPreloader]);

  // Master Animation Timeline
  useEffect(() => {
    if (!isPreloaderActive) return;

    // Reduced motion alternative: clean, gentle fade-in and reveal
    if (prefersReducedMotion) {
      const t1 = setTimeout(() => {
        if (logoWrapperRef.current) {
          logoWrapperRef.current.style.opacity = '1';
          logoWrapperRef.current.style.transform = 'scale(1)';
        }
      }, 300);
      const t2 = setTimeout(() => {
        setWebsiteEmerging(true);
        if (backdropRef.current) {
          backdropRef.current.style.opacity = '0';
        }
      }, 1200);
      const t3 = setTimeout(() => {
        if (logoWrapperRef.current) {
          logoWrapperRef.current.style.opacity = '0';
        }
      }, 2100);
      const t4 = setTimeout(() => {
        dismissPreloader();
      }, 2500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }

    let animationFrameId: number;
    let startTime: number | null = null;
    let isEmergingTriggered = false;
    let isFinishedTriggered = false;

    // History buffer for spark's subtle luminous wake (Scene 3)
    const trailHistory: { x: number; y: number; time: number }[] = [];

    const renderFrame = (now: number) => {
      if (!startTime) {
        startTime = now;
      }
      const t = (now - startTime) / 1000; // time in seconds

      // Measure current dimensions of the logo container
      let targetX = window.innerWidth * 0.5;
      let targetY = window.innerHeight * 0.5;

      if (logoContainerRef.current) {
        const rect = logoContainerRef.current.getBoundingClientRect();
        targetX = rect.left + rect.width * CROWN_STAR_X_PCT;
        targetY = rect.top + rect.height * CROWN_STAR_Y_PCT;
      }

      // Starting coordinate of the spark (far left, distant, intentional)
      const startX = Math.max(30, window.innerWidth * 0.08);
      const startY = window.innerHeight * 0.54;

      // ======================================================================
      // SCENE 1: THE VOID (0.00s – 0.40s)
      // Visual silence, nearly black (#05050A) with subtle depth.
      // ======================================================================
      let sparkVisible = false;
      let sparkX = startX;
      let sparkY = startY;
      let sparkOpacity = 0;
      let sparkScale = 0.4;

      // ======================================================================
      // SCENE 2: THE FIRST SPARK (0.40s – 0.65s)
      // Tiny microscopic warm point of light appears far left, brightens slightly,
      // hesitates with quiet anticipation.
      // ======================================================================
      if (t >= 0.40 && t < 0.65) {
        sparkVisible = true;
        const p = (t - 0.40) / 0.25;
        // Subtle starlight breathing
        sparkOpacity = Math.min(0.95, p * 1.2);
        sparkScale = 0.35 + Math.sin(p * Math.PI) * 0.25;
        sparkX = startX;
        sparkY = startY;
      }

      // ======================================================================
      // SCENE 3: THE SIGNATURE SWIPE (0.65s – 1.50s)
      // Spark travels across space with an elegant calligraphic curve.
      // Accelerates naturally with a refined, minimal luminous wake.
      // ======================================================================
      if (t >= 0.65 && t < 1.50) {
        sparkVisible = true;
        if (!soundPlayedRef.current.swipe && audioEnabled) {
          soundPlayedRef.current.swipe = true;
          preloaderAudio.playStarSwipe();
        }

        const p = (t - 0.65) / (1.50 - 0.65);
        // Fluid acceleration and natural momentum
        const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

        sparkX = startX + (targetX - startX) * ease;
        // Calligraphic arc: slight dip on acceleration, graceful swoop upward
        const dip = Math.sin(p * Math.PI) * 22;
        sparkY = targetY + (startY - targetY) * (1 - ease) + dip;

        sparkOpacity = 1;
        sparkScale = 1.0;

        // Record trail history for wake drawing
        trailHistory.push({ x: sparkX, y: sparkY, time: t });
      }

      // ======================================================================
      // SCENE 6: THE STAR FINDS HOME (1.50s – 1.90s)
      // Magnetic attraction to the crown star position.
      // The final few pixels slow down smoothly, locking into the official logo.
      // ======================================================================
      if (t >= 1.50 && t < 1.90) {
        sparkVisible = true;
        if (!soundPlayedRef.current.settle && audioEnabled) {
          soundPlayedRef.current.settle = true;
          preloaderAudio.playSettleChime();
        }

        const p = (t - 1.50) / 0.40;
        // Magnetic gentle ease-out to final pixels
        const easeOut = 1 - Math.pow(1 - p, 3);
        const lastX = startX + (targetX - startX);
        sparkX = lastX + (targetX - lastX) * easeOut;
        sparkY = targetY + (targetY - targetY) * (1 - easeOut);

        // Trail contracts into the star
        sparkOpacity = Math.max(0, 1 - p * 1.5);
        sparkScale = 1.0 - p * 0.3;

        trailHistory.push({ x: sparkX, y: sparkY, time: t });
      }

      // Purge trail points older than 0.18s
      while (trailHistory.length > 0 && t - trailHistory[0].time > 0.18) {
        trailHistory.shift();
      }

      // Draw the delicate spark and its subtle luminous wake on canvas
      if (sparkCanvasRef.current) {
        const canvas = sparkCanvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Handle retina display crispness
          const dpr = window.devicePixelRatio || 1;
          const displayW = window.innerWidth;
          const displayH = window.innerHeight;
          if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
            canvas.width = displayW * dpr;
            canvas.height = displayH * dpr;
          }
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.scale(dpr, dpr);

          if (sparkVisible && sparkOpacity > 0.01) {
            // Draw subtle luminous wake (energy briefly disturbing darkness)
            if (trailHistory.length > 1) {
              for (let i = 1; i < trailHistory.length; i++) {
                const p1 = trailHistory[i - 1];
                const p2 = trailHistory[i];
                const ageRatio = (i / trailHistory.length); // 0 at tail, 1 at head
                const trailAlpha = ageRatio * 0.5 * sparkOpacity;

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(242, 193, 78, ${trailAlpha})`;
                ctx.lineWidth = 0.5 + ageRatio * 1.2;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Inner core white hairline
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${trailAlpha * 0.8})`;
                ctx.lineWidth = 0.4 + ageRatio * 0.5;
                ctx.stroke();
              }
            }

            // Draw the point spark itself
            const radius = 3 * sparkScale;
            // Soft starlight aura
            const gradient = ctx.createRadialGradient(
              sparkX,
              sparkY,
              0,
              sparkX,
              sparkY,
              radius * 4.5
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${sparkOpacity})`);
            gradient.addColorStop(0.3, `rgba(255, 242, 178, ${sparkOpacity * 0.7})`);
            gradient.addColorStop(0.7, `rgba(242, 193, 78, ${sparkOpacity * 0.25})`);
            gradient.addColorStop(1, 'rgba(242, 193, 78, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, radius * 4.5, 0, Math.PI * 2);
            ctx.fill();

            // Crisp starlight diamond center
            ctx.fillStyle = `rgba(255, 255, 255, ${sparkOpacity})`;
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, Math.max(1.2, radius * 0.7), 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      // ======================================================================
      // SCENE 4 & 5: LOGO MATERIALIZATION & GRAVITATIONAL MOMENTUM (0.85s – 1.90s)
      // The Aarambh logo begins appearing in the spark's wake.
      // NOT a cheap left-to-right wipe, NO hard vertical edges.
      // Soft, feathered, organic gradient mask where the area behind the spark
      // transitions smoothly from darkness into the logo.
      // Simultaneously, the unified logo has momentum: starts slightly offset (-36px)
      // and scaled (0.96), gently resolving into exact center (0px, 1.00).
      // ======================================================================
      if (logoWrapperRef.current) {
        if (t < 0.85) {
          // Completely dark/hidden
          logoWrapperRef.current.style.opacity = '0';
          logoWrapperRef.current.style.transform = 'translateX(-36px) scale(0.96)';
          logoWrapperRef.current.style.webkitMaskImage = 'none';
          logoWrapperRef.current.style.maskImage = 'none';
        } else if (t >= 0.85 && t < 1.85) {
          const logoProg = (t - 0.85) / 1.0;
          const logoEase = 1 - Math.pow(1 - logoProg, 3);

          // Physical momentum: gentle deceleration into center
          const offsetX = (1 - logoEase) * -36;
          const scale = 0.96 + logoEase * 0.04;
          const opacity = Math.min(1, logoProg * 1.35);

          logoWrapperRef.current.style.transform = `translateX(${offsetX.toFixed(2)}px) scale(${scale.toFixed(4)})`;
          logoWrapperRef.current.style.opacity = `${opacity.toFixed(3)}`;

          // Organic feathered mask calculation:
          // Reveal travels across the logo as the spark journeys and settles
          const revealProg = Math.min(1.2, ((t - 0.85) / 0.95) * 1.15);
          const maskProgress = revealProg * 100;

          if (maskProgress >= 112) {
            logoWrapperRef.current.style.webkitMaskImage = 'none';
            logoWrapperRef.current.style.maskImage = 'none';
          } else {
            // Wide feather zone guarantees zero visible hard edges
            const featherStart = Math.max(0, maskProgress - 26);
            const featherMid = Math.max(0, maskProgress - 6);
            const featherEnd = Math.min(100, maskProgress + 18);

            const mask = `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${featherStart.toFixed(1)}%, rgba(0,0,0,0.6) ${featherMid.toFixed(1)}%, rgba(0,0,0,0) ${featherEnd.toFixed(1)}%)`;

            logoWrapperRef.current.style.webkitMaskImage = mask;
            logoWrapperRef.current.style.maskImage = mask;
          }
        } else if (t >= 1.85 && t < 4.35) {
          // Completed logo holds perfectly still in the exact center
          logoWrapperRef.current.style.opacity = '1';
          logoWrapperRef.current.style.transform = 'translateX(0px) scale(1)';
          logoWrapperRef.current.style.webkitMaskImage = 'none';
          logoWrapperRef.current.style.maskImage = 'none';
        } else if (t >= 4.35 && t <= 4.70) {
          // SCENE 9: THE HANDOFF
          // Logo gently dissolves (opacity 1 -> 0, scale 1 -> 0.985)
          const dissolveProg = (t - 4.35) / 0.35;
          const exitOpacity = Math.max(0, 1 - dissolveProg);
          const exitScale = 1 - dissolveProg * 0.015;

          logoWrapperRef.current.style.opacity = `${exitOpacity.toFixed(3)}`;
          logoWrapperRef.current.style.transform = `translateX(0px) scale(${exitScale.toFixed(4)})`;
        } else if (t > 4.70) {
          logoWrapperRef.current.style.opacity = '0';
        }
      }

      // ======================================================================
      // SCENE 7: THE MOMENT OF AARAMBH — ASYMMETRIC SHIMMER (2.25s – 2.80s)
      // Star performs one sophisticated shimmer:
      // Faint diagonal ray of light expands briefly, star brightness increases,
      // tiny sparkle glints across top-right edge, then returns to stillness.
      // ======================================================================
      if (shimmerSvgRef.current) {
        if (t >= 2.25 && t < 2.80) {
          if (!soundPlayedRef.current.glimmer && audioEnabled) {
            soundPlayedRef.current.glimmer = true;
            preloaderAudio.playGlimmerSparkle();
          }

          const shimmerP = (t - 2.25) / 0.55;
          const shimmerCurve = Math.sin(shimmerP * Math.PI);

          shimmerSvgRef.current.style.opacity = `${(shimmerCurve * 0.85).toFixed(3)}`;
          shimmerSvgRef.current.style.transform = `translate(-50%, -50%) scale(${(0.8 + shimmerCurve * 0.4).toFixed(3)})`;
        } else {
          shimmerSvgRef.current.style.opacity = '0';
        }
      }

      // ======================================================================
      // SCENE 8: THE WORLD BEHIND THE LOGO (3.10s – 4.00s)
      // The website emerges from behind the logo.
      // - Preloader background veil dissolves (opacity: 1 -> 0)
      // - Website emerges from depth in App.tsx (y: 20px -> 0px, scale: 1.03 -> 1.0)
      // - Aarambh logo remains in foreground (z-50), still, centered and sharp
      // ======================================================================
      if (t >= 3.10) {
        if (!isEmergingTriggered) {
          isEmergingTriggered = true;
          setWebsiteEmerging(true);
          if (audioEnabled) {
            preloaderAudio.playWebsiteEmergence();
          }
        }

        if (backdropRef.current) {
          const veilP = Math.min(1, (t - 3.10) / 0.90);
          const veilEase = 1 - Math.pow(1 - veilP, 2.5);
          backdropRef.current.style.opacity = `${(1 - veilEase).toFixed(3)}`;
        }
      }

      // ======================================================================
      // PRELOADER COMPLETION (4.70s)
      // Handoff is complete, preloader unmounts seamlessly.
      // ======================================================================
      if (t >= 4.70 && !isFinishedTriggered) {
        isFinishedTriggered = true;
        dismissPreloader();
        return;
      }

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    animationFrameId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPreloaderActive, prefersReducedMotion, audioEnabled, setWebsiteEmerging, dismissPreloader]);

  if (!isPreloaderActive) return null;

  return (
    <div
      id="aarambh-preloader-root"
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none pointer-events-none"
    >
      {/* =====================================================================
          BOTTOM LAYER (z-30): DARK PRELOADER ATMOSPHERE
          Scene 1 Void: darkest website tone (#05050A) with subtle purple depth.
          Dissolves smoothly in Scene 8 to reveal the live website behind it.
          ===================================================================== */}
      <div
        ref={backdropRef}
        id="aarambh-preloader-backdrop"
        className="fixed inset-0 z-30 pointer-events-none transition-opacity will-change-[opacity]"
        style={{
          backgroundColor: '#05050A',
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(32, 18, 54, 0.32) 0%, rgba(5, 5, 10, 1) 72%)',
          opacity: 1,
        }}
      />

      {/* =====================================================================
          TOP LAYER (z-50): AARAMBH LOGO & SHIMMER STAGE
          Acts as the foreground window anchoring the viewer into the world.
          Stationary, sharp, and dominant while the website emerges behind it!
          ===================================================================== */}
      <div
        id="aarambh-preloader-stage"
        className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4"
      >
        <div
          ref={logoContainerRef}
          id="aarambh-logo-container"
          className="relative w-[min(86vw,820px)] aspect-[1983/793] flex items-center justify-center pointer-events-none select-none"
        >
          {/* Unified official Aarambh logo with organic reveal & momentum */}
          <div
            ref={logoWrapperRef}
            id="aarambh-logo-wrapper"
            className="relative w-full h-full flex items-center justify-center will-change-[transform,opacity]"
            style={{
              opacity: 0,
              transform: 'translateX(-36px) scale(0.96)',
            }}
          >
            <img
              src={OFFICIAL_LOGO_SRC}
              alt="Aarambh"
              className="w-full h-full object-contain select-none pointer-events-none filter drop-shadow-[0_0_28px_rgba(107,70,193,0.32)]"
              draggable={false}
              loading="eager"
            />

            {/* Asymmetric Shimmer Overlay on the Crown Star (Scene 7) */}
            <svg
              ref={shimmerSvgRef}
              viewBox="0 0 100 100"
              className="absolute pointer-events-none select-none will-change-[opacity,transform]"
              style={{
                left: `${(CROWN_STAR_X_PCT * 100).toFixed(2)}%`,
                top: `${(CROWN_STAR_Y_PCT * 100).toFixed(2)}%`,
                width: '14%',
                aspectRatio: '1 / 1',
                transform: 'translate(-50%, -50%)',
                opacity: 0,
              }}
              fill="none"
            >
              {/* Slender diagonal ray of light (at 38° angle) */}
              <g transform="rotate(38 50 50)">
                <path
                  d="M10 50 L48 48.8 L90 50 L48 51.2 Z"
                  fill="url(#diagonal-ray-grad)"
                />
              </g>

              {/* Delicate starlight micro-glint along top-right facet */}
              <circle cx="56" cy="44" r="2.2" fill="#FFFFFF" opacity="0.9" />

              <defs>
                <linearGradient id="diagonal-ray-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F2C14E" stopOpacity="0" />
                  <stop offset="35%" stopColor="#FFF9D2" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="65%" stopColor="#FFF9D2" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#F2C14E" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SPARK & LUMINOUS WAKE CANVAS (z-55)
          Hardware-accelerated continuous stroke for the travelling spark
          ===================================================================== */}
      <canvas
        ref={sparkCanvasRef}
        id="aarambh-spark-canvas"
        className="fixed inset-0 z-[55] pointer-events-none w-full h-full"
      />

      {/* =====================================================================
          DISCREET AUDIO & ACCESSIBILITY CONTROLS (z-60)
          ===================================================================== */}
      <div className="absolute top-6 right-6 z-[60] flex items-center gap-3 pointer-events-auto">
        <button
          id="preloader-audio-toggle"
          onClick={toggleAudio}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white transition-colors duration-200 backdrop-blur-sm"
          title={audioEnabled ? 'Mute audio' : 'Enable audio'}
          aria-label={audioEnabled ? 'Mute audio' : 'Enable audio'}
        >
          {audioEnabled ? (
            <Volume2 className="w-4 h-4 text-accent-gold" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="absolute bottom-6 right-6 z-[60] pointer-events-auto">
        <button
          id="preloader-skip-button"
          onClick={handleSkip}
          className="text-[11px] tracking-[0.2em] uppercase font-mono text-white/20 hover:text-white/60 transition-colors duration-200 px-3 py-1.5 rounded"
        >
          Skip
        </button>
      </div>
    </div>
  );
};
