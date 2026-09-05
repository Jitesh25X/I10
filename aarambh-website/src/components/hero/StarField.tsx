import { useEffect, useState } from 'react';

interface AmbientStar {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  animationDelay: string;
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

    // Ambient twinkling stars
    const ambient: AmbientStar[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${(Math.random() * 100).toFixed(2)}%`,
      top: `${(Math.random() * 100).toFixed(2)}%`,
      size: Math.random() > 0.8 ? 2 : 1,
      opacity: 0.2 + Math.random() * 0.7,
      animationDelay: `${(Math.random() * 4).toFixed(1)}s`,
    }));
    setAmbientStars(ambient);

    if (!isReduced) {
      // Sparse falling stars drifting diagonally
      const falling: FallingStar[] = Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${(Math.random() * 110).toFixed(2)}%`,
        top: `${(-20 - Math.random() * 40).toFixed(2)}%`,
        delay: `${(Math.random() * 6).toFixed(1)}s`,
        duration: `${(6 + Math.random() * 8).toFixed(1)}s`,
      }));
      setFallingStars(falling);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Ambient twinkling stars */}
      {ambientStars.map((star) => (
        <div
          key={`ambient-${star.id}`}
          className="absolute rounded-full bg-white transition-opacity"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: star.size > 1 ? '0 0 4px 1px rgba(255, 255, 255, 0.7)' : 'none',
            animation: !prefersReducedMotion ? `pulse 3s infinite ease-in-out ${star.animationDelay}` : 'none',
          }}
        />
      ))}

      {/* Sparse falling stars */}
      {!prefersReducedMotion &&
        fallingStars.map((star) => (
          <div
            key={`falling-${star.id}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-0 shadow-[0_0_6px_#fff] motion-safe:animate-falling-star"
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
