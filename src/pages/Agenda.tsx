import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { schedule } from '../data/schedule';
import { clubs } from '../data/clubs';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

export const Agenda = () => {
  // Get unique days, sorted
  const days = Array.from(new Set(schedule.map(e => e.day))).sort();
  
  // Default to today if live, else first day
  const todayDateStr = new Date().toISOString().split('T')[0];
  const defaultDay = days.includes(todayDateStr) ? todayDateStr : (days[0] || '');
  
  const [selectedDay, setSelectedDay] = useState(defaultDay);

  const dayEvents = schedule
    .filter(e => e.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-white">Event Agenda</h1>
          <p className="text-text-muted">Find out when and where your favorite clubs are showcasing.</p>
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
                    <Link 
                      key={event.id}
                      to={`/clubs/${event.clubId}`}
                      className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div className="flex-shrink-0 w-20 text-center sm:text-left">
                          <div className="text-xl font-bold text-white">{event.startTime}</div>
                          {event.endTime && (
                            <div className="text-sm text-text-muted">{event.endTime}</div>
                          )}
                        </div>
                        
                        <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/10 border border-white/10 items-center justify-center overflow-hidden flex-shrink-0 p-1">
                          {club?.logoUrl ? (
                            <img src={club.logoUrl} alt="" className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-lg font-bold text-text-muted">{club?.name.charAt(0) || '?'}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-accent-blue mb-1">{event.eventTitle}</h3>
                          <div className="text-white font-medium mb-2">{club?.name || 'Unknown Club'}</div>
                          
                          <div className="flex items-center text-sm text-text-muted space-x-4">
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-1" />
                              {event.venue}
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1" />
                              {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
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
    </PageWrapper>
  );
};
