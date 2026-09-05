import { PageWrapper } from '../components/layout/PageWrapper';
import { useCountdown } from '../hooks/useCountdown';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { ShootingStarFromLogo } from '../components/hero/ShootingStarFromLogo';
import { StatsSection } from '../components/stats/StatsSection';
import { ChevronDown } from 'lucide-react';

const EVENT_START_DATE = '2026-10-12T09:00:00'; // Match schedule data

export const Home = () => {
  const { days, hours, minutes, seconds, isLive } = useCountdown(EVENT_START_DATE);

  return (
    <PageWrapper fullWidth>
      {/* Full-Screen Immersive Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-8 relative z-10 my-auto"
        >
          <p className="text-xs sm:text-sm md:text-base font-display font-medium tracking-[0.25em] text-text-muted uppercase">
            Institute of Technical Education &amp; Research presents
          </p>

          <div className="relative inline-block max-w-xs sm:max-w-xl md:max-w-3xl mx-auto px-4">
            <img
              src="/logo.png"
              alt="Aarambh"
              className="w-full h-auto max-h-48 sm:max-h-64 md:max-h-72 object-contain mx-auto filter drop-shadow-[0_0_35px_rgba(107,70,193,0.55)] drop-shadow-[0_0_18px_rgba(242,193,78,0.4)]"
            />
            <ShootingStarFromLogo />
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-text-primary/90 font-light max-w-2xl mx-auto leading-relaxed">
            The annual clubs orientation event. Discover your tribe, pursue your passion, and make your mark.
          </p>

          {/* Symmetrical Glass Countdown Box */}
          <div className="py-2 sm:py-4">
            {isLive ? (
              <div className="inline-flex flex-col items-center gap-3 bg-white/5 border border-accent-gold/30 rounded-2xl px-8 py-5 backdrop-blur-sm shadow-lg shadow-accent-gold/5">
                <div className="flex items-center gap-2 text-accent-gold font-display font-bold text-lg sm:text-xl uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-ping" />
                  Happening Now
                </div>
                <p className="text-text-muted text-xs sm:text-sm">Aarambh 2026 is live on campus!</p>
                <Button href="/agenda" variant="primary">
                  Today's Lineup
                </Button>
              </div>
            ) : (
              <div className="inline-flex items-center justify-center gap-2 sm:gap-4 md:gap-5 glass-card p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.12)]">
                {/* Days */}
                <div className="flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 shadow-inner p-1 sm:p-2 transition-transform duration-300 ease-smooth hover:scale-[1.03] transform-gpu">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
                    {String(days).padStart(2, '0')}
                  </span>
                  <span className="text-text-muted text-[10px] sm:text-xs font-display tracking-widest uppercase mt-0.5 sm:mt-1">
                    Days
                  </span>
                </div>

                <span className="text-lg sm:text-3xl font-bold text-accent-gold/40 select-none -mt-2 sm:-mt-3">:</span>

                {/* Hours */}
                <div className="flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 shadow-inner p-1 sm:p-2 transition-transform duration-300 ease-smooth hover:scale-[1.03] transform-gpu">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
                    {String(hours).padStart(2, '0')}
                  </span>
                  <span className="text-text-muted text-[10px] sm:text-xs font-display tracking-widest uppercase mt-0.5 sm:mt-1">
                    Hours
                  </span>
                </div>

                <span className="text-lg sm:text-3xl font-bold text-accent-gold/40 select-none -mt-2 sm:-mt-3">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 shadow-inner p-1 sm:p-2 transition-transform duration-300 ease-smooth hover:scale-[1.03] transform-gpu">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
                    {String(minutes).padStart(2, '0')}
                  </span>
                  <span className="text-text-muted text-[10px] sm:text-xs font-display tracking-widest uppercase mt-0.5 sm:mt-1">
                    Mins
                  </span>
                </div>

                <span className="text-lg sm:text-3xl font-bold text-accent-gold/40 select-none -mt-2 sm:-mt-3">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 shadow-inner p-1 sm:p-2 transition-transform duration-300 ease-smooth hover:scale-[1.03] transform-gpu">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-accent-gold tracking-tight tabular-nums">
                    {String(seconds).padStart(2, '0')}
                  </span>
                  <span className="text-text-muted text-[10px] sm:text-xs font-display tracking-widest uppercase mt-0.5 sm:mt-1">
                    Secs
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-2 w-full max-w-sm sm:max-w-none mx-auto">
            <Button href="/clubs" variant="primary" className="w-full sm:w-auto min-w-[170px]">
              Explore Clubs
            </Button>
            {!isLive && (
              <Button href="/agenda" variant="secondary" className="w-full sm:w-auto min-w-[170px]">
                See Agenda
              </Button>
            )}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
          <motion.a
            href="#explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center text-center text-text-muted hover:text-white transition-colors group cursor-pointer"
          >
            <span className="text-[10px] font-display tracking-widest uppercase mb-1.5 group-hover:text-accent-gold transition-colors">
              Scroll Down
            </span>
            <div className="p-1 rounded-full border border-white/15 group-hover:border-accent-gold/50 transition-colors">
              <ChevronDown size={16} className="text-accent-gold" />
            </div>
          </motion.a>
        </div>
      </section>

      {/* Main Content Body */}
      <div id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <StatsSection />
      </div>
    </PageWrapper>
  );
};
