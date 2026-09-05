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
      className="flex flex-col items-center justify-center p-6 sm:p-8 glass-card-interactive select-none"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-2 tabular-nums">
        {count}{stat.suffix}
      </div>
      <div className="text-text-muted font-display tracking-widest text-xs sm:text-sm uppercase text-center">
        {stat.label}
      </div>
    </div>
  );
};
