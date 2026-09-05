import { Link } from 'react-router-dom';
import type { Club } from '../../types';
import { Badge } from '../ui/Badge';
import { } from 'lucide-react';
import { useState } from 'react';

export const ClubCard = ({ club }: { club: Club }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Link 
      to={`/clubs/${club.id}`}
      className="group block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
    >
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
          {!imgError && club.logoUrl ? (
            <img 
              src={club.logoUrl} 
              alt={`${club.name} logo`} 
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-3xl font-bold text-text-muted">
              {club.name.charAt(0)}
            </span>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-blue transition-colors">
            {club.name}
          </h3>
          <Badge>{club.category}</Badge>
        </div>
        
        {club.tagline && (
          <p className="text-text-muted text-sm line-clamp-2">
            {club.tagline}
          </p>
        )}
      </div>
    </Link>
  );
};
