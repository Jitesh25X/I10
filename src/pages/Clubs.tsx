import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClubCard } from '../components/clubs/ClubCard';
import { ClubModal } from '../components/clubs/ClubModal';
import { Badge } from '../components/ui/Badge';
import { clubs } from '../data/clubs';
import type { Category, Club } from '../types';

const CATEGORIES: Category[] = ["Technical", "Cultural", "Dance", "Music", "Literary", "Other"];

export const Clubs = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [manualClub, setManualClub] = useState<Club | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  // Derive active club from URL parameter (:slug or ?club=id) or manual selection
  const targetId = slug || searchParams.get('club');
  const urlClub = (!isClosed && targetId) 
    ? (clubs.find(c => c.id.toLowerCase() === targetId.toLowerCase()) ?? null) 
    : null;
  const activeClub = manualClub ?? urlClub;

  const handleOpenClub = (club: Club) => {
    setIsClosed(false);
    setManualClub(club);
    if (slug) {
      navigate(`/clubs?club=${club.id}`, { replace: true });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('club', club.id);
      setSearchParams(newParams, { replace: true });
    }
  };

  const handleCloseClub = () => {
    setIsClosed(true);
    setManualClub(null);
    if (slug) {
      navigate('/clubs', { replace: true });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('club');
      setSearchParams(newParams, { replace: true });
    }
  };

  const filteredClubs = selectedCategory 
    ? clubs.filter(c => c.category === selectedCategory)
    : clubs;

  return (
    <PageWrapper>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-white">Explore Clubs</h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Discover the vibrant community at ITER. Click any club to learn more, check showcase schedules, and join!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Badge 
            active={selectedCategory === null} 
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {CATEGORIES.map(cat => (
            <Badge 
              key={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredClubs.map(club => (
              <ClubCard 
                key={club.id} 
                club={club} 
                onClick={handleOpenClub}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-xl font-medium text-white mb-2">No clubs found</h3>
            <p className="text-text-muted">Try selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Club Details & Join Popup Modal */}
      <ClubModal 
        club={activeClub} 
        isOpen={!!activeClub} 
        onClose={handleCloseClub} 
      />
    </PageWrapper>
  );
};
