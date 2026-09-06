import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClubModal } from '../components/clubs/ClubModal';
import { schedule } from '../data/schedule';
import { clubs } from '../data/clubs';
import type { Club, Category } from '../types';
import { MapPin, Clock, ArrowUpRight, Search, X, Sparkles } from 'lucide-react';

const POSTER_ABBREVIATIONS: Record<string, string> = {
  "soa-literary-club": "SLC",
  "gfg-iter": "GFG",
  "iec": "IEC",
  "soa-radio-club": "SRC",
  "gdg-iter": "GDG",
  "nss": "NSS",
  "odanza": "Odanza",
  "srishti": "Srishti",
  "soa-flying-club": "SFC",
  "vogue": "Vogue",
  "ieee-iter": "IEEE",
  "jaago": "Jaago",
  "codex": "Codex",
  "virtual-show-reel": "VS",
  "soa-english-cafe": "SEC",
  "soa-music-club": "SMC",
  "spc": "SPC",
  "iter-robotics": "IRC",
  "toneelstuk": "TSK",
  "coding-ninjas": "CN",
  "danza": "Danza",
  "ncc": "NCC"
};

const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Technical",
  "Cultural",
  "Dance",
  "Music",
  "Literary",
  "Other"
];

interface DayTab {
  day: string;
  label: string;
  displayDate: string;
  isComingSoon?: boolean;
}

const SCHEDULE_DAYS: DayTab[] = [
  { day: "2026-09-07", label: "Day 1", displayDate: "Mon, Sep 7" },
  { day: "2026-09-08", label: "Day 2", displayDate: "Tue, Sep 8" },
  { day: "2026-09-09", label: "Day 3", displayDate: "Wed, Sep 9", isComingSoon: true },
  { day: "2026-09-10", label: "Day 4", displayDate: "Thu, Sep 10", isComingSoon: true },
];

const formatTime12h = (time24: string) => {
  if (!time24) return '';
  const [hStr, mStr] = time24.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  const hours12 = h % 12 || 12;
  return `${hours12}:${String(m).padStart(2, '0')} ${period}`;
};

export const Agenda = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [manualClub, setManualClub] = useState<Club | null>(null);
  const [isClosed, setIsClosed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<"All" | Category>("All");

  // Default to today if live, else first day
  const todayDateStr = new Date().toISOString().split('T')[0];
  const dayKeys = SCHEDULE_DAYS.map(d => d.day);
  const defaultDay = dayKeys.includes(todayDateStr) ? todayDateStr : dayKeys[0];
  
  const [selectedDay, setSelectedDay] = useState(defaultDay);

  const currentTab = SCHEDULE_DAYS.find(d => d.day === selectedDay) || SCHEDULE_DAYS[0];
  const isComingSoon = currentTab.isComingSoon ?? false;

  // Derive active club from search params (?club=id) or manual click
  const clubParam = searchParams.get('club');
  const urlClub = (!isClosed && clubParam) 
    ? (clubs.find(c => c.id.toLowerCase() === clubParam.toLowerCase()) ?? null) 
    : null;
  const activeClub = manualClub ?? urlClub;

  const handleOpenClub = (club: Club) => {
    setIsClosed(false);
    setManualClub(club);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('club', club.id);
    setSearchParams(newParams, { replace: true });
  };

  const handleCloseClub = () => {
    setIsClosed(true);
    setManualClub(null);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('club');
    setSearchParams(newParams, { replace: true });
  };

  const filteredEvents = useMemo(() => {
    return schedule
      .filter(e => e.day === selectedDay)
      .filter(e => {
        const club = clubs.find(c => c.id === e.clubId);
        const abbr = POSTER_ABBREVIATIONS[e.clubId] || '';

        // Category filter
        if (selectedCategory !== 'All' && club?.category !== selectedCategory) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = e.eventTitle.toLowerCase().includes(q);
          const matchClubName = club?.name.toLowerCase().includes(q);
          const matchAbbr = abbr.toLowerCase().includes(q);
          const matchVenue = e.venue.toLowerCase().includes(q);
          const matchTagline = club?.tagline?.toLowerCase().includes(q);
          return matchTitle || matchClubName || matchAbbr || matchVenue || matchTagline;
        }

        return true;
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [selectedDay, selectedCategory, searchQuery]);

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-gold/10 text-accent-gold border border-accent-gold/20 mb-1">
            <Sparkles size={13} />
            <span>Official Club Orientation Schedule</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Event Agenda
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Find out when your favorite clubs are showcasing at the Main Auditorium. Click any slot to view full club info and application links!
          </p>
        </div>

        {/* Centered Date Switcher Pill Container */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 glass-pill max-w-fit mx-auto shadow-md">
          {SCHEDULE_DAYS.map((tab) => {
            const isSelected = selectedDay === tab.day;
            return (
              <button
                key={tab.day}
                type="button"
                onClick={() => setSelectedDay(tab.day)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-glass duration-200 ease-smooth active:scale-95 flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-accent-gold text-background-dark shadow-sm' 
                    : 'text-text-muted hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.label} &bull; {tab.displayDate}</span>
                {tab.isComingSoon && (
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-background-dark/20 text-background-dark' : 'bg-white/10 text-accent-gold/90 border border-accent-gold/30'
                  }`}>
                    Coming Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Day Content: Coming Soon State or Active Schedule */}
        {isComingSoon ? (
          <div className="text-center py-20 px-6 glass-card rounded-3xl border border-accent-gold/20 max-w-lg mx-auto space-y-4 shadow-xl shadow-black/40">
            <div className="w-16 h-16 rounded-2xl bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center mx-auto text-accent-gold shadow-inner">
              <Sparkles size={28} />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-gold/15 text-accent-gold border border-accent-gold/30">
                {currentTab.label} &bull; {currentTab.displayDate}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Schedule Coming Soon
              </h3>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                The events, workshops, and activities for {currentTab.label} are currently being finalized. Stay tuned for official announcements!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Filter and Search Bar */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                {/* Search Input */}
                <div className="relative w-full sm:w-80">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search club or code (e.g. SLC, GDG)..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-muted/60 text-xs sm:text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white p-0.5"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                  {CATEGORIES.map(cat => {
                    const isCatSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                          isCatSelected
                            ? 'bg-white/20 text-white border border-white/30'
                            : 'text-text-muted hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Event Cards List */}
            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => {
                  const club = clubs.find(c => c.id === event.clubId);
                  const posterAbbr = POSTER_ABBREVIATIONS[event.clubId];
                  const formattedStartTime = formatTime12h(event.startTime);
                  const formattedEndTime = event.endTime ? formatTime12h(event.endTime) : '';

                  return (
                    <div 
                      key={event.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => club && handleOpenClub(club)}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && club) {
                          e.preventDefault();
                          handleOpenClub(club);
                        }
                      }}
                      className="group block text-left glass-card-interactive p-5 sm:p-6 select-none focus:outline-none focus:ring-2 focus:ring-accent-gold/50 relative overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        
                        {/* Time Box */}
                        <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center w-full sm:w-28 flex-shrink-0 bg-white/5 sm:bg-white/[0.03] border border-white/10 rounded-xl p-2.5 sm:py-3 sm:px-2 text-center transition-colors duration-250 ease-smooth">
                          <span className="text-base sm:text-lg font-bold text-white group-hover:text-accent-gold transition-colors duration-250 ease-smooth tabular-nums">
                            {formattedStartTime}
                          </span>
                          {formattedEndTime && (
                            <span className="text-xs text-text-muted mt-0.5 sm:mt-1 tabular-nums">
                              until {formattedEndTime}
                            </span>
                          )}
                          <span className="text-[10px] text-accent-gold/70 mt-1 uppercase font-semibold tracking-wider">
                            Slot {index + 1}
                          </span>
                        </div>

                        {/* Club Logo */}
                        <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/15 group-hover:border-accent-gold/40 flex items-center justify-center overflow-hidden flex-shrink-0 p-2 transition-colors duration-250 ease-smooth shadow-inner">
                          {club?.logoUrl ? (
                            <img src={club.logoUrl} alt="" className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-lg font-bold text-accent-gold">{club?.name.charAt(0) || '?'}</span>
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg sm:text-xl font-bold text-accent-blue group-hover:text-accent-gold transition-colors duration-250 ease-smooth">
                                {event.eventTitle}
                              </h3>
                              {posterAbbr && (
                                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-accent-gold/15 text-accent-gold border border-accent-gold/30">
                                  {posterAbbr}
                                </span>
                              )}
                            </div>
                            <span className="inline-flex items-center text-xs font-semibold text-text-muted group-hover:text-accent-gold gap-1 self-start sm:self-center flex-shrink-0 transition-colors duration-250 ease-smooth">
                              View Club &amp; Join
                              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250 ease-smooth transform-gpu" />
                            </span>
                          </div>
                          
                          <div className="text-white font-medium text-sm sm:text-base mb-2">
                            {club?.name || 'Unknown Club'}
                          </div>
                          
                          <div className="flex flex-wrap items-center text-xs sm:text-sm text-text-muted gap-x-4 gap-y-1.5">
                            <div className="flex items-center">
                              <MapPin size={15} className="mr-1 text-accent-gold flex-shrink-0" />
                              <span>{event.venue}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={15} className="mr-1 text-accent-blue flex-shrink-0" />
                              <span>{formattedStartTime} {formattedEndTime ? `– ${formattedEndTime}` : ''} (15 mins)</span>
                            </div>
                            {club?.category && (
                              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-text-muted border border-white/10">
                                {club.category}
                              </span>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                  <p className="text-text-muted">No events match your current filter or search.</p>
                  {(searchQuery || selectedCategory !== 'All') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
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
