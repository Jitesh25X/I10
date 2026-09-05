import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ClubModal } from '../components/clubs/ClubModal';
import { schedule } from '../data/schedule';
import { clubs } from '../data/clubs';
import type { Club } from '../types';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';

export const Agenda = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [manualClub, setManualClub] = useState<Club | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  // Get unique days, sorted
  const days = Array.from(new Set(schedule.map(e => e.day))).sort();
  
  // Default to today if live, else first day
  const todayDateStr = new Date().toISOString().split('T')[0];
  const defaultDay = days.includes(todayDateStr) ? todayDateStr : (days[0] || '');
  
  const [selectedDay, setSelectedDay] = useState(defaultDay);

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

  const dayEvents = schedule
    .filter(e => e.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Event Agenda
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Find out when and where your favorite clubs are showcasing. Click any event or club to view details and join!
          </p>
        </div>

        {days.length > 0 ? (
          <>
            {/* Centered Date Switcher Pill Container */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 glass-pill max-w-fit mx-auto shadow-md">
              {days.map((day, idx) => {
                const dateObj = new Date(day);
                const displayDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-glass duration-200 ease-smooth active:scale-95 ${
                      isSelected 
                        ? 'bg-accent-gold text-background-dark shadow-sm' 
                        : 'text-text-muted hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Day {idx + 1} &bull; {displayDate}
                  </button>
                );
              })}
            </div>

            {/* Event Cards List */}
            <div className="space-y-4">
              {dayEvents.length > 0 ? (
                dayEvents.map((event) => {
                  const club = clubs.find(c => c.id === event.clubId);
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
                      className="group block text-left glass-card-interactive p-5 sm:p-6 select-none focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        
                        {/* Time Box */}
                        <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center w-full sm:w-28 flex-shrink-0 bg-white/5 sm:bg-white/[0.03] border border-white/10 rounded-xl p-2.5 sm:py-3 sm:px-2 text-center transition-colors duration-250 ease-smooth">
                          <span className="text-base sm:text-lg font-bold text-white group-hover:text-accent-gold transition-colors duration-250 ease-smooth tabular-nums">
                            {event.startTime}
                          </span>
                          {event.endTime && (
                            <span className="text-xs text-text-muted mt-0.5 sm:mt-1 tabular-nums">
                              until {event.endTime}
                            </span>
                          )}
                        </div>

                        {/* Club Logo */}
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 group-hover:border-accent-gold/40 flex items-center justify-center overflow-hidden flex-shrink-0 p-1.5 transition-colors duration-250 ease-smooth shadow-inner">
                          {club?.logoUrl ? (
                            <img src={club.logoUrl} alt="" className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-lg font-bold text-accent-gold">{club?.name.charAt(0) || '?'}</span>
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                            <h3 className="text-lg sm:text-xl font-bold text-accent-blue group-hover:text-accent-gold transition-colors duration-250 ease-smooth truncate">
                              {event.eventTitle}
                            </h3>
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
                              <span>{event.startTime} {event.endTime ? `– ${event.endTime}` : ''}</span>
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
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-text-muted">No events scheduled for this day.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-text-muted">Agenda coming soon.</p>
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
