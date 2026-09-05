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
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-white">Event Agenda</h1>
          <p className="text-text-muted">
            Find out when and where your favorite clubs are showcasing. Click any event or club to view details and join!
          </p>
        </div>

        {days.length > 0 ? (
          <>
            <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar">
              {days.map(day => {
                const dateObj = new Date(day);
                const displayDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      selectedDay === day 
                        ? 'border-accent-blue text-accent-blue' 
                        : 'border-transparent text-text-muted hover:text-white hover:border-white/30'
                    }`}
                  >
                    {displayDate}
                  </button>
                );
              })}
            </div>

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
                      className="group block text-left bg-white/5 border border-white/10 hover:border-accent-gold/40 rounded-xl p-6 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(242,193,78,0.1)] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div className="flex-shrink-0 w-20 text-center sm:text-left">
                          <div className="text-xl font-bold text-white group-hover:text-accent-gold transition-colors">
                            {event.startTime}
                          </div>
                          {event.endTime && (
                            <div className="text-sm text-text-muted">{event.endTime}</div>
                          )}
                        </div>
                        
                        <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/10 border border-white/10 group-hover:border-accent-gold/40 items-center justify-center overflow-hidden flex-shrink-0 p-1 transition-colors">
                          {club?.logoUrl ? (
                            <img src={club.logoUrl} alt="" className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-lg font-bold text-accent-gold">{club?.name.charAt(0) || '?'}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xl font-bold text-accent-blue group-hover:text-accent-gold transition-colors mb-1">
                              {event.eventTitle}
                            </h3>
                            <span className="hidden sm:inline-flex items-center text-xs text-text-muted group-hover:text-accent-gold gap-1 transition-colors">
                              View Club & Join
                              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                          </div>
                          <div className="text-white font-medium mb-2">{club?.name || 'Unknown Club'}</div>
                          
                          <div className="flex flex-wrap items-center text-sm text-text-muted gap-x-4 gap-y-1">
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-1 text-accent-gold" />
                              {event.venue}
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1 text-accent-blue" />
                              {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
                            </div>
                            <span className="sm:hidden inline-flex items-center text-xs text-accent-gold ml-auto">
                              Details & Join →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-text-muted">No events scheduled for this day.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
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
