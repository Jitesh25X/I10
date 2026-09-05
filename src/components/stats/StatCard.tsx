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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasTriggered]);

  return (
    <div 
      ref={ref}
      className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm transition-transform hover:scale-105"
    >
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-text-muted font-display tracking-widest text-sm uppercase text-center">
        {stat.label}
      </div>
    </div>
  );
};
