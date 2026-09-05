import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShootingStarFromLogo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(isReduced);

    if (!isReduced) {
      const triggerStar = () => {
        if (document.visibilityState === 'visible') {
          setIsVisible(true);
          setTimeout(() => setIsVisible(false), 1000);
        }
        
        // Random interval between 4s and 8s
        const nextInterval = 4000 + Math.random() * 4000;
        setTimeout(triggerStar, nextInterval);
      };

      const initialTimeout = setTimeout(triggerStar, 2000);
      return () => clearTimeout(initialTimeout);
    }
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2, x: '58%', y: '10%' }}
            animate={{ opacity: [0, 1, 0], scale: [0.2, 1.5, 0.4], x: ['58%', '78%'], y: ['10%', '-15%'] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute"
          >
             <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 0L32.5 27.5L60 30L32.5 32.5L30 60L27.5 32.5L0 30L27.5 27.5L30 0Z" fill="url(#paint0_radial)"/>
                <defs>
                  <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30 30) rotate(90) scale(30)">
                    <stop stopColor="#F2C14E"/>
                    <stop offset="1" stopColor="#F2C14E" stopOpacity="0"/>
                  </radialGradient>
                </defs>
              </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
