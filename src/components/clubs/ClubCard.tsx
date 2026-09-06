import { useState } from 'react';
import type { Club } from '../../types';

interface ClubCardProps {
  club: Club;
  onClick?: (club: Club) => void;
}

export const ClubCard = ({ club, onClick }: ClubCardProps) => {
  const [imgError, setImgError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(club);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(club);
    }
  };

  const displayName = club.shortName || club.name;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group flex flex-col items-center text-center cursor-pointer focus:outline-none select-none w-full max-w-[150px] sm:max-w-[170px] mx-auto"
      aria-label={`View details for ${displayName}`}
    >
      {/* Circular Emblem / Disc */}
      <div className="relative w-full aspect-square rounded-full flex items-center justify-center p-3.5 sm:p-4 md:p-5 transition-transform duration-300 ease-smooth transform-gpu group-hover:scale-105 group-active:scale-95">
        {/* Disc background with warm radial gradient & delicate border matching reference */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2E1D19]/90 via-[#1C1210]/95 to-[#120A09]/95 border border-[#7A4B2E]/50 shadow-[0_10px_26px_-4px_rgba(0,0,0,0.7)] group-hover:border-accent-gold/70 group-hover:shadow-[0_0_30px_rgba(242,193,78,0.28)] transition-all duration-300 ease-smooth backdrop-blur-sm" />

        {/* Subtle top-left specular highlight */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(242,193,78,0.12)_0%,transparent_60%)] pointer-events-none" />

        {/* Club Logo */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5 sm:p-3">
          {!imgError && club.logoUrl ? (
            <img 
              src={club.logoUrl} 
              alt={`${displayName} logo`} 
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-300 ease-smooth transform-gpu"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-2xl sm:text-3xl font-serif font-bold text-accent-gold">
              {displayName.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Club Name Label in Serif font matching reference screenshot */}
      <h3 className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-[15px] font-serif font-semibold text-white/95 group-hover:text-accent-gold transition-colors duration-250 leading-snug tracking-normal text-center line-clamp-3">
        {displayName}
      </h3>
    </div>
  );
};

