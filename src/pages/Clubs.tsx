import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClubCard } from '../components/clubs/ClubCard';
import { ClubModal } from '../components/clubs/ClubModal';
import { clubs } from '../data/clubs';
import type { Category, Club } from '../types';
import { Cpu, Palette, Sparkles, Music, BookOpen, Users, Search, X } from 'lucide-react';

const CATEGORIES: Category[] = ["Technical", "Cultural", "Dance", "Music", "Literary", "Other"];

const CATEGORY_CONFIG: Record<Category, { title: string; subtitle: string; tagStyle: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  Technical: {
    title: "Technical Clubs",
    subtitle: "Coding, competitive programming, robotics, aeromodelling, open source, and developer ecosystems.",
    tagStyle: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    icon: Cpu
  },
  Cultural: {
    title: "Cultural & Creative Arts",
    subtitle: "Dramatics, filmmaking, visual arts, photography, and runway fashion.",
    tagStyle: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    icon: Palette
  },
  Dance: {
    title: "Dance Societies",
    subtitle: "Western street choreographies, breaking cyphers, and classical Odissi heritage.",
    tagStyle: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    icon: Sparkles
  },
  Music: {
    title: "Music Societies",
    subtitle: "Acoustic ensembles, rock bands, vocalists, and instrumental percussionists.",
    tagStyle: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    icon: Music
  },
  Literary: {
    title: "Literary & Oratory Clubs",
    subtitle: "Parliamentary debates, public speaking, poetry, Model UN, and language fluency.",
    tagStyle: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    icon: BookOpen
  },
  Other: {
    title: "Communities & Social Welfare",
    subtitle: "Entrepreneurship, community radio, youth welfare initiatives, NCC, and NSS.",
    tagStyle: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    icon: Users
  }
};

export const Clubs = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter clubs by search query
  const searchedClubs = useMemo(() => {
    if (!searchQuery.trim()) return clubs;
    const q = searchQuery.toLowerCase().trim();
    return clubs.filter(c => 
      c.name.toLowerCase().includes(q) ||
      (c.shortName && c.shortName.toLowerCase().includes(q)) ||
      (c.tagline && c.tagline.toLowerCase().includes(q)) ||
      c.about.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Determine active categories to display
  const visibleCategories = useMemo(() => {
    if (selectedCategory) {
      return [selectedCategory];
    }
    return CATEGORIES;
  }, [selectedCategory]);

  const hasAnyClubs = visibleCategories.some(cat => 
    searchedClubs.some(c => c.category === cat)
  );

  return (
    <PageWrapper>
      <div className="space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Explore Clubs
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Discover all 22 official student societies and clubs at ITER, categorized by domain. Click any emblem to view details, showcase schedules, and join!
          </p>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by club name or keyword..."
                className="w-full pl-9 pr-8 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-text-muted/60 text-xs sm:text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>
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
        </div>

        {/* Categorized Clubs Sections */}
        {hasAnyClubs ? (
          <div className="space-y-12 sm:space-y-16 pt-2">
            {visibleCategories.map(cat => {
              const catClubs = searchedClubs.filter(c => c.category === cat);
              if (catClubs.length === 0) return null;
              const config = CATEGORY_CONFIG[cat];
              const IconComponent = config.icon;

              return (
                <section key={cat} className="space-y-6">
                  {/* Category Header Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${config.tagStyle} shadow-inner`}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                            {config.title}
                          </h2>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-accent-gold/90 border border-white/10">
                            {catClubs.length} {catClubs.length === 1 ? 'Club' : 'Clubs'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-text-muted mt-1">
                          {config.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Club Emblems Grid for this category */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 items-start justify-items-center py-2">
                    {catClubs.map(club => (
                      <ClubCard 
                        key={club.id} 
                        club={club} 
                        onClick={handleOpenClub}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 max-w-md mx-auto space-y-3">
            <h3 className="text-xl font-bold text-white">No clubs found</h3>
            <p className="text-text-muted text-sm">
              No clubs match your current search or filter.
            </p>
            {(searchQuery || selectedCategory !== null) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Reset Filters
              </button>
            )}
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
