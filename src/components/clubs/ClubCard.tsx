import { useState } from 'react';
import type { Club, Category } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface ClubCardProps {
  club: Club;
  onClick?: (club: Club) => void;
}

const CATEGORY_TAG_STYLES: Record<Category, string> = {
  Technical: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Cultural: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  Dance: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  Music: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Literary: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Other: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
};

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

  const tagStyle = CATEGORY_TAG_STYLES[club.category] || "bg-white/10 text-text-muted border-white/20";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group text-left glass-card-interactive overflow-hidden flex flex-col justify-between h-full focus:outline-none focus:ring-2 focus:ring-accent-gold/50 select-none"
    >
      <div className="p-6 flex flex-col items-center text-center flex-1">
        {/* Logo Container with fixed size & rounded-2xl geometry */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 border border-white/15 group-hover:border-accent-gold/40 flex items-center justify-center overflow-hidden flex-shrink-0 p-2.5 shadow-inner transition-colors duration-300 ease-smooth mb-4">
          {!imgError && club.logoUrl ? (
            <img 
              src={club.logoUrl} 
              alt={`${club.name} logo`} 
              className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-350 ease-smooth transform-gpu"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-3xl font-bold text-accent-gold">
              {club.name.charAt(0)}
            </span>
          )}
        </div>
        
        {/* Club Name with fixed height container for consistent horizontal alignment */}
        <div className="w-full h-14 flex items-center justify-center text-center px-1 mb-2">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent-gold transition-colors duration-250 ease-smooth line-clamp-2 leading-snug">
            {club.name}
          </h3>
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors duration-200 ${tagStyle}`}>
            {club.category}
          </span>
        </div>
        
        {/* Tagline with fixed height container */}
        <div className="h-10 flex items-center justify-center text-center w-full px-1">
          {club.tagline ? (
            <p className="text-text-muted text-xs sm:text-sm line-clamp-2 italic leading-tight">
              "{club.tagline}"
            </p>
          ) : (
            <p className="text-text-muted/40 text-xs italic">
              Official student club at ITER
            </p>
          )}
        </div>
      </div>

      {/* Card Action Footer Bar */}
      <div className="px-5 py-3 bg-white/[0.03] group-hover:bg-white/[0.08] border-t border-white/10 flex items-center justify-between text-xs text-text-muted group-hover:text-accent-gold transition-colors duration-250 ease-smooth">
        <span>Know your club</span>
        <span className="inline-flex items-center font-medium gap-1">
          View &amp; Join
          <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250 ease-smooth transform-gpu" />
        </span>
      </div>
    </div>
  );
};
