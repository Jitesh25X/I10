import { StarField } from '../hero/StarField';
import { ShootingComet } from '../hero/ShootingComet';

export const CosmicBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Deep cosmic night-sky base: near-black navy (#05050f to #0a0a1f) */}
      <div className="absolute inset-0 bg-void pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-95"
        style={{
          background:
            'radial-gradient(140% 110% at 50% -10%, #0a0a1f 0%, #06060f 60%, #05050f 100%)',
        }}
      />

      {/* 2. Soft Glowing Nebula Aurora Ribbons (Drifting Diagonally Across Viewport Corners) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-85">
        {/* Top-Left Corner: Electric Blue Aurora Ribbon & Radial Bloom */}
        <div
          className="absolute -top-[14%] -left-[12%] w-[600px] sm:w-[900px] lg:w-[1300px] h-[160px] sm:h-[220px] lg:h-[280px] rounded-[100%] blur-[90px] sm:blur-[120px] lg:blur-[140px] motion-safe:animate-aurora-1 will-change-transform pointer-events-none"
          style={{
            background:
              'linear-gradient(130deg, transparent 0%, rgba(43, 61, 250, 0.28) 35%, rgba(123, 63, 242, 0.18) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[130px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 15% 15%, rgba(43, 61, 250, 0.20) 0%, transparent 65%)',
          }}
        />

        {/* Top-Right Corner: Violet / Purple Aurora Ribbon & Radial Bloom */}
        <div
          className="absolute -top-[12%] -right-[12%] w-[620px] sm:w-[950px] lg:w-[1350px] h-[170px] sm:h-[240px] lg:h-[300px] rounded-[100%] blur-[95px] sm:blur-[125px] lg:blur-[145px] motion-safe:animate-aurora-2 will-change-transform pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, transparent 0%, rgba(123, 63, 242, 0.32) 35%, rgba(43, 61, 250, 0.16) 75%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full blur-[100px] sm:blur-[130px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 85% 15%, rgba(123, 63, 242, 0.22) 0%, transparent 65%)',
          }}
        />

        {/* Bottom-Right Corner: Warm Gold Celestial Aurora Ribbon & Radial Bloom */}
        <div
          className="absolute -bottom-[12%] -right-[8%] w-[520px] sm:w-[850px] lg:w-[1200px] h-[150px] sm:h-[210px] lg:h-[270px] rounded-[100%] blur-[85px] sm:blur-[115px] lg:blur-[135px] motion-safe:animate-aurora-3 will-change-transform pointer-events-none"
          style={{
            background:
              'linear-gradient(125deg, transparent 0%, rgba(232, 184, 75, 0.22) 30%, rgba(245, 217, 138, 0.15) 65%, transparent 100%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full blur-[90px] sm:blur-[120px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 85% 85%, rgba(232, 184, 75, 0.16) 0%, transparent 60%)',
          }}
        />

        {/* Bottom-Left Corner: Electric Blue & Soft Violet Aurora Streak */}
        <div
          className="absolute -bottom-[14%] -left-[10%] w-[540px] sm:w-[860px] lg:w-[1220px] h-[160px] sm:h-[220px] lg:h-[270px] rounded-[100%] blur-[90px] sm:blur-[120px] lg:blur-[140px] motion-safe:animate-aurora-4 will-change-transform pointer-events-none"
          style={{
            background:
              'linear-gradient(140deg, transparent 0%, rgba(43, 61, 250, 0.22) 35%, rgba(123, 63, 242, 0.18) 75%, transparent 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[130px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 15% 85%, rgba(43, 61, 250, 0.16) 0%, transparent 60%)',
          }}
        />

        {/* Ethereal Mid-Viewport Diagonal Aurora Filament bridging violet and warm gold */}
        <div
          className="absolute top-[35%] left-[8%] w-[700px] sm:w-[1100px] h-[120px] sm:h-[180px] rounded-[100%] blur-[100px] sm:blur-[130px] opacity-40 rotate-[25deg] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(123, 63, 242, 0.14) 40%, rgba(232, 184, 75, 0.10) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* 3. Scattered faint small white and blue star dots at low opacity */}
      <StarField />

      {/* 4. Diagonal shooting celestial comets */}
      <ShootingComet />
    </div>
  );
};
