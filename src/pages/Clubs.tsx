import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClubCard } from '../components/clubs/ClubCard';
import { Badge } from '../components/ui/Badge';
import { clubs } from '../data/clubs';
import type { Category } from '../types';

const CATEGORIES: Category[] = ["Technical", "Cultural", "Dance", "Music", "Literary", "Other"];

export const Clubs = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredClubs = selectedCategory 
    ? clubs.filter(c => c.category === selectedCategory)
    : clubs;

  return (
    <PageWrapper>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-white">Explore Clubs</h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Discover the vibrant community at ITER. Find your tribe, pursue your passion, and make your mark.
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
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-xl font-medium text-white mb-2">No clubs found</h3>
            <p className="text-text-muted">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
