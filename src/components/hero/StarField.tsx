import { useEffect, useState } from 'react';

interface AmbientStar {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  color: string;
  glow?: string;
  animationDelay: string;
  animationDuration: string;
}

interface FallingStar {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
}

export const StarField = () => {
  const [fallingStars, setFallingStars] = useState<FallingStar[]>([]);
  const [ambientStars, setAmbientStars] = useState<AmbientStar[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(isReduced);

    // Palette of faint white, soft off-white, and electric/celestial blue star dots
    const starColors = [
      { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.4)' },
      { color: '#f4f2ec', glow: 'rgba(244, 242, 236, 0.35)' },
      { color: '#93c5fd', glow: 'rgba(147, 197, 253, 0.45)' }, // soft light blue
      { color: '#bfdbfe', glow: 'rgba(191, 219, 254, 0.4)' },  // pale ice blue
      { color: '#a5b4fc', glow: 'rgba(165, 180, 252, 0.35)' }, // blue-violet tint
      { color: '#60a5fa', glow: 'rgba(96, 165, 250, 0.4)' },   // electric blue star
      { color: '#fef08a', glow: 'rgba(254, 240, 138, 0.3)' },  // subtle starlight gold
    ];

    // Scatter ~110 faint small white and blue star dots at low opacity
    const ambient: AmbientStar[] = Array.from({ length: 110 }).map((_, i) => {
      const colorProfile = starColors[Math.floor(Math.random() * starColors.length)];
      // Size distribution: mostly tiny pinpricks (1px), few 1.5px, rare 2px
      const randSize = Math.random();
      const size = randSize > 0.9 ? 2 : randSize > 0.7 ? 1.5 : 1;
      // Faint low opacity: 0.12 - 0.42
      const baseOpacity = parseFloat((0.12 + Math.random() * 0.3).toFixed(2));

      return {
        id: i,
        left: `${(Math.random() * 100).toFixed(2)}%`,
        top: `${(Math.random() * 100).toFixed(2)}%`,
        size,
        opacity: baseOpacity,
        color: colorProfile.color,
        glow: size > 1.2 ? colorProfile.glow : undefined,
        animationDelay: `${(Math.random() * 5).toFixed(1)}s`,
        animationDuration: `${(3.5 + Math.random() * 3.5).toFixed(1)}s`,
      };
    });
    setAmbientStars(ambient);

    if (!isReduced) {
      // Sparse falling stars drifting diagonally
      const falling: FallingStar[] = Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${(Math.random() * 110).toFixed(2)}%`,
        top: `${(-20 - Math.random() * 40).toFixed(2)}%`,
        delay: `${(Math.random() * 8).toFixed(1)}s`,
        duration: `${(7 + Math.random() * 8).toFixed(1)}s`,
      }));
      setFallingStars(falling);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Scattered faint small white and blue star dots */}
      {ambientStars.map((star) => (
        <div
          key={`ambient-${star.id}`}
          className="absolute rounded-full transition-opacity will-change-transform"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            boxShadow: star.glow ? `0 0 3px 1px ${star.glow}` : 'none',
            animation: !prefersReducedMotion
              ? `pulse ${star.animationDuration} infinite ease-in-out ${star.animationDelay}`
              : 'none',
          }}
        />
      ))}

      {/* Sparse subtle falling star streaks */}
      {!prefersReducedMotion &&
        fallingStars.map((star) => (
          <div
            key={`falling-${star.id}`}
            className="absolute w-1 h-1 bg-white/80 rounded-full opacity-0 shadow-[0_0_4px_#93c5fd] motion-safe:animate-falling-star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
    </div>
  );
};
