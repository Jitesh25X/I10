import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import type { Stat } from '../../types';

export const StatCard = ({ stat }: { stat: Stat }) => {
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const count = useCountUp(stat.value, 1500, hasTriggered);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasTriggered]);

  return (
    <div 
      ref={ref}
      className="relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 glass-card-interactive select-none group"
    >
      {/* Ambient background glow behind the texts */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0"
        aria-hidden="true"
      >
        <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-accent-purple/30 via-accent-blue/20 to-accent-gold/20 blur-2xl group-hover:scale-125 group-hover:opacity-100 opacity-75 transition-all duration-500 ease-smooth" />
        <div className="absolute w-24 h-24 rounded-full bg-white/15 blur-xl group-hover:bg-white/25 transition-all duration-500 ease-smooth" />
      </div>

      <div className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums drop-shadow-[0_0_24px_rgba(255,255,255,0.45)]">
        {count}{stat.suffix}
      </div>
      <div className="relative z-10 text-white font-display tracking-widest text-xs sm:text-sm uppercase text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
        {stat.label}
      </div>
    </div>
  );
};
