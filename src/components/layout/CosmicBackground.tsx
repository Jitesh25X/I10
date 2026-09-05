import { StarField } from '../hero/StarField';
import { ShootingComet } from '../hero/ShootingComet';

export const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Cosmic Ambient Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background-mid/50 via-background-dark/95 to-background-dark pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[1100px] h-[400px] md:h-[650px] bg-accent-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-accent-gold/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent-blue/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Full-screen star field & shooting comets */}
      <StarField />
      <ShootingComet />
    </div>
  );
};
