import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comet {
  id: number;
  startX: number; // percentage across the width
  startY: number; // percentage down from top
  length: number; // tail length in px
  duration: number; // flight time in seconds
  distance: number; // travel distance in px
  angleDeg: number; // angle in screen degrees (0 = right, 90 = down, 135 = down-left)
  colorType: 'gold' | 'cyan' | 'purple';
}

export const ShootingComet = () => {
  const [comets, setComets] = useState<Comet[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const spawnComet = useCallback(() => {
    if (document.visibilityState === 'hidden') return;

    const id = Date.now() + Math.random();
    // Start along top-right edge for full-screen trajectory
    const startX = 55 + Math.random() * 55; // 55% to 110%
    const startY = -15 + Math.random() * 35; // -15% to 20%
    const length = 240 + Math.random() * 180; // 240px - 420px for visible full-screen trail
    const duration = 1.1 + Math.random() * 0.7; // 1.1s - 1.8s
    const distance = 1100 + Math.random() * 700; // 1100px - 1800px to sweep across screen
    // Angle: shooting diagonally down and to the left (e.g. 130° to 145°)
    const angleDeg = 135 + (Math.random() * 16 - 8);
    const colors: ('gold' | 'cyan' | 'purple')[] = ['gold', 'cyan', 'purple'];
    const colorType = colors[Math.floor(Math.random() * colors.length)];

    const newComet: Comet = {
      id,
      startX,
      startY,
      length,
      duration,
      distance,
      angleDeg,
      colorType,
    };

    setComets((prev) => [...prev.slice(-3), newComet]);

    // Remove comet after its animation completes
    setTimeout(() => {
      setComets((prev) => prev.filter((c) => c.id !== id));
    }, (duration + 0.4) * 1000);
  }, []);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(isReduced);

    if (isReduced) return;

    // Spawn first comet quickly on load
    const initialTimer = setTimeout(spawnComet, 700);

    // Schedule continuous periodic comets
    let isSubscribed = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      if (!isSubscribed) return;
      const nextDelay = 3500 + Math.random() * 3500; // every 3.5s - 7s
      timeoutId = setTimeout(() => {
        spawnComet();
        scheduleNext();
      }, nextDelay);
    };

    scheduleNext();

    return () => {
      isSubscribed = false;
      clearTimeout(initialTimer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [spawnComet]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {comets.map((comet) => {
          // Radians in screen coordinates (+X right, +Y down)
          const rad = (comet.angleDeg * Math.PI) / 180;
          const deltaX = Math.cos(rad) * comet.distance;
          const deltaY = Math.sin(rad) * comet.distance;

          const isGold = comet.colorType === 'gold';
          const isCyan = comet.colorType === 'cyan';

          const tailGradient = isGold
            ? 'linear-gradient(90deg, transparent 0%, rgba(232,184,75,0.15) 30%, rgba(232,184,75,0.8) 80%, #ffffff 100%)'
            : isCyan
            ? 'linear-gradient(90deg, transparent 0%, rgba(43,61,250,0.15) 30%, rgba(43,61,250,0.8) 80%, #ffffff 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(123,63,242,0.15) 30%, rgba(232,184,75,0.75) 80%, #ffffff 100%)';

          const glowColor = isGold ? '#e8b84b' : isCyan ? '#2b3dfa' : '#7b3ff2';

          return (
            <motion.div
              key={comet.id}
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0.6,
              }}
              animate={{
                opacity: [0, 0.95, 1, 0.8, 0],
                x: deltaX,
                y: deltaY,
                scale: [0.6, 1.1, 1, 0.85, 0.5],
              }}
              transition={{
                duration: comet.duration,
                ease: [0.25, 1, 0.5, 1], // swooping celestial momentum
              }}
              style={{
                position: 'absolute',
                left: `${comet.startX}%`,
                top: `${comet.startY}%`,
                transformOrigin: 'right center',
                rotate: `${comet.angleDeg}deg`,
              }}
              className="flex items-center"
            >
              {/* Comet Tail */}
              <div
                style={{
                  width: `${comet.length}px`,
                  height: '2.5px',
                  background: tailGradient,
                  filter: `drop-shadow(0 0 8px ${glowColor})`,
                  borderRadius: '9999px',
                }}
              />

              {/* Glowing Head leading the trajectory */}
              <div
                className="relative -ml-1.5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  width: '9px',
                  height: '9px',
                  backgroundColor: '#ffffff',
                  boxShadow: `0 0 10px 2px ${glowColor}, 0 0 24px 6px ${glowColor}99, 0 0 40px 12px #ffffff80`,
                }}
              >
                {/* Starburst crossflare */}
                <div
                  className="absolute w-5 h-5"
                  style={{
                    background: `radial-gradient(circle, #ffffff 10%, ${glowColor} 60%, transparent 80%)`,
                    filter: 'blur(0.5px)',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
