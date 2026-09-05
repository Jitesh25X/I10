import { useState } from 'react';
import type { Club } from '../../types';
import { Badge } from '../ui/Badge';
import { ArrowUpRight } from 'lucide-react';

interface ClubCardProps {
  club: Club;
  onClick?: (club: Club) => void;
}

export const ClubCard = ({ club, onClick }: ClubCardProps) => {
  const [imgError, setImgError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(club);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(club);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group text-left bg-white/5 border border-white/10 hover:border-accent-gold/40 rounded-xl overflow-hidden hover:bg-white/10 hover:shadow-[0_0_25px_rgba(242,193,78,0.12)] transition-all duration-300 cursor-pointer flex flex-col justify-between h-full focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
    >
      <div className="p-6 flex flex-col items-center text-center space-y-4 flex-1">
        <div className="w-24 h-24 rounded-full bg-white/10 border border-white/15 group-hover:border-accent-gold/40 flex items-center justify-center overflow-hidden flex-shrink-0 p-2 shadow-inner transition-colors">
          {!imgError && club.logoUrl ? (
            <img 
              src={club.logoUrl} 
              alt={`${club.name} logo`} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-3xl font-bold text-accent-gold">
              {club.name.charAt(0)}
            </span>
          )}
        </div>
        
        <div className="w-full">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-gold transition-colors line-clamp-1">
            {club.name}
          </h3>
          <Badge>{club.category}</Badge>
        </div>
        
        {club.tagline && (
          <p className="text-text-muted text-sm line-clamp-2 italic">
            "{club.tagline}"
          </p>
        )}
      </div>

      <div className="px-5 py-3 bg-white/[0.03] group-hover:bg-white/[0.08] border-t border-white/10 flex items-center justify-between text-xs text-text-muted group-hover:text-accent-gold transition-colors">
        <span>Know your club</span>
        <span className="inline-flex items-center font-medium gap-0.5">
          View & Join
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};
