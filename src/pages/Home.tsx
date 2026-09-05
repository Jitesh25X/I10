import { PageWrapper } from '../components/layout/PageWrapper';
import { useCountdown } from '../hooks/useCountdown';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { StarField } from '../components/hero/StarField';
import { ShootingComet } from '../components/hero/ShootingComet';
import { ShootingStarFromLogo } from '../components/hero/ShootingStarFromLogo';
import { StatsSection } from '../components/stats/StatsSection';
import { ChevronDown } from 'lucide-react';

const EVENT_START_DATE = '2026-10-12T09:00:00'; // Match schedule data

export const Home = () => {
  const { days, hours, minutes, isLive } = useCountdown(EVENT_START_DATE);

  return (
    <PageWrapper fullWidth>
      {/* Full-Screen Immersive Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* Cosmic Ambient Background Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background-mid/50 via-background-dark/95 to-background-dark pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[1100px] h-[400px] md:h-[650px] bg-accent-purple/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-accent-gold/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent-blue/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Full-screen star field & shooting comets */}
        <StarField />
        <ShootingComet />

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

          <div className="py-4 sm:py-6">
            {isLive ? (
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-display tracking-widest font-bold text-accent-gold uppercase">
                  Happening Now
                </h2>
                <Button href="/agenda" variant="primary">
                  Today's Lineup
                </Button>
              </div>
            ) : (
              <div className="flex justify-center space-x-6 sm:space-x-10 md:space-x-16 text-center">
                <div className="flex flex-col">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                    {days}
                  </span>
                  <span className="text-text-muted text-xs sm:text-sm font-display tracking-widest uppercase mt-2">
                    Days
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                    {hours}
                  </span>
                  <span className="text-text-muted text-xs sm:text-sm font-display tracking-widest uppercase mt-2">
                    Hours
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                    {minutes}
                  </span>
                  <span className="text-text-muted text-xs sm:text-sm font-display tracking-widest uppercase mt-2">
                    Mins
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Button href="/clubs" variant="primary" className="w-full sm:w-auto">
              Explore Clubs
            </Button>
            {!isLive && (
              <Button href="/agenda" variant="secondary" className="w-full sm:w-auto">
                See Agenda
              </Button>
            )}
            <Button href="/apply" variant="outline" className="w-full sm:w-auto">
              Apply Now
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-text-muted hover:text-white transition-colors group z-20 cursor-pointer"
        >
          <span className="text-[10px] font-display tracking-[0.25em] uppercase mb-1 group-hover:text-accent-gold transition-colors">
            Scroll Down
          </span>
          <ChevronDown size={18} className="text-accent-gold" />
        </motion.a>
      </section>

      {/* Main Content Body */}
      <div id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StatsSection />
      </div>
    </PageWrapper>
  );
};
