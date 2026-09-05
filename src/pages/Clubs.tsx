import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClubCard } from '../components/clubs/ClubCard';
import { ClubModal } from '../components/clubs/ClubModal';
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
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Explore Clubs
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Discover the vibrant community at ITER. Click any club to learn more, check showcase schedules, and join!
          </p>
        </div>

        {/* Category Filter Pills Box */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 glass-pill max-w-fit mx-auto shadow-md">
          <button 
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-glass duration-200 ease-smooth active:scale-95 ${
              selectedCategory === null
                ? 'bg-accent-gold text-background-dark shadow-sm'
                : 'text-text-muted hover:text-white hover:bg-white/10'
            }`}
          >
            All ({clubs.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = clubs.filter(c => c.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button 
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-glass duration-200 ease-smooth active:scale-95 ${
                  isSelected
                    ? 'bg-accent-gold text-background-dark shadow-sm'
                    : 'text-text-muted hover:text-white hover:bg-white/10'
                }`}
              >
                {cat} <span className="text-[11px] opacity-75 ml-0.5">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Club Cards Grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {filteredClubs.map(club => (
              <ClubCard 
                key={club.id} 
                club={club} 
                onClick={handleOpenClub}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">No clubs found</h3>
            <p className="text-text-muted text-sm">Try selecting a different category.</p>
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
