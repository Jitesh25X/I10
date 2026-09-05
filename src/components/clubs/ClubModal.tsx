import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, MapPin, Clock, Award, Sparkles, Check, Share2 } from 'lucide-react';
import type { Club, Category } from '../../types';
import { schedule } from '../../data/schedule';

interface ClubModalProps {
  club: Club | null;
  isOpen: boolean;
  onClose: () => void;
}

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  Technical: { bg: "bg-blue-500/20", text: "text-blue-300", border: "border-blue-500/30" },
  Cultural: { bg: "bg-rose-500/20", text: "text-rose-300", border: "border-rose-500/30" },
  Dance: { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/30" },
  Music: { bg: "bg-amber-500/20", text: "text-amber-300", border: "border-amber-500/30" },
  Literary: { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/30" },
  Other: { bg: "bg-indigo-500/20", text: "text-indigo-300", border: "border-indigo-500/30" },
};

export const ClubModal: React.FC<ClubModalProps> = ({ club, isOpen, onClose }) => {
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prevClubId, setPrevClubId] = useState<string | null>(club?.id ?? null);

  // Sync state during render when club changes
  if (club && club.id !== prevClubId) {
    setPrevClubId(club.id);
    setImgError(false);
    setCopied(false);
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!club) return null;

  const clubEvents = schedule.filter(e => e.clubId === club.id);
  const categoryStyle = CATEGORY_COLORS[club.category] || {
    bg: "bg-white/10",
    text: "text-white/80",
    border: "border-white/20"
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/clubs?club=${club.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="club-modal-title"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translate3d(0,0,0)', willChange: 'opacity' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 350, mass: 0.75 }}
            style={{ transform: 'translate3d(0,0,0)', willChange: 'transform, opacity' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#16102e]/95 backdrop-blur-2xl border border-accent-gold/30 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.15)] overflow-hidden z-10"
          >
            {/* Top decorative gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-accent-purple via-accent-gold to-accent-blue flex-shrink-0" />

            {/* Header with Close & Share */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-5 pb-3.5 border-b border-white/10 flex-shrink-0 bg-background-dark/50">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}>
                  {club.category}
                </span>
                {club.applyFormUrl ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                    Applications Open
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-text-muted border border-white/15">
                    Showcasing at Aarambh
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copy link to this club"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors border border-white/10 text-xs flex items-center gap-1.5"
                >
                  {copied ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
                  <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-text-muted hover:text-white transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body with smooth scrolling */}
            <div className="px-6 py-6 overflow-y-auto space-y-6 custom-scrollbar text-left">
              {/* Club Identity Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 border border-accent-gold/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-3 shadow-lg shadow-black/40">
                  {!imgError && club.logoUrl ? (
                    <img
                      src={club.logoUrl}
                      alt={`${club.name} logo`}
                      className="w-full h-full object-contain"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span className="text-4xl font-bold text-accent-gold">
                      {club.name.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <h2 id="club-modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {club.name}
                  </h2>
                  {club.tagline && (
                    <p className="text-accent-gold font-medium text-sm sm:text-base italic">
                      "{club.tagline}"
                    </p>
                  )}
                  <p className="text-text-muted text-xs sm:text-sm">
                    Institute of Technical Education & Research (ITER)
                  </p>
                </div>
              </div>

              {/* Join & Connect Action Box */}
              <div className="bg-gradient-to-r from-accent-purple/25 via-background-mid/50 to-accent-gold/15 border border-accent-gold/30 rounded-xl p-5 shadow-lg space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <Sparkles size={16} className="text-accent-gold" />
                      Join {club.name}
                    </h3>
                    <p className="text-text-muted text-xs mt-0.5">
                      {club.applyFormUrl 
                        ? "Recruitment & registration form is active. Fill to apply now!" 
                        : "Official memberships & recruitments will open during Aarambh fest."}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-2 sm:pt-0">
                    {club.applyFormUrl ? (
                      <a
                        href={club.applyFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 inline-flex items-center justify-center gap-2 px-5 rounded-xl bg-accent-gold hover:bg-yellow-400 text-background-dark font-bold text-sm shadow-md hover:shadow-accent-gold/25 transition-all"
                      >
                        Apply / Join Now
                        <ExternalLink size={15} />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="h-10 inline-flex items-center justify-center px-4 rounded-xl bg-white/10 text-text-muted font-medium text-sm cursor-not-allowed opacity-75"
                      >
                        Applications Opening Soon
                      </button>
                    )}

                    {club.instagramUrl && (
                      <a
                        href={club.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/15 transition-colors"
                      >
                        <InstagramIcon className="w-4 h-4 text-pink-400" />
                        Instagram
                        <ExternalLink size={13} className="opacity-70" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* About the Club Section */}
              <div className="space-y-2.5">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-accent-gold flex items-center gap-2">
                  <span>Know Your Club</span>
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
                  <p className="text-text-primary/90 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {club.about}
                  </p>
                </div>
              </div>

              {/* Highlights & Achievements */}
              {club.achievements && club.achievements.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-accent-gold flex items-center gap-2">
                    <Award size={16} className="text-accent-gold" />
                    <span>Highlights & Key Achievements</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {club.achievements.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm text-text-primary"
                      >
                        <div className="p-1 rounded bg-accent-purple/30 text-accent-gold flex-shrink-0 mt-0.5">
                          <Check size={14} />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Festival Showcase Schedule */}
              {clubEvents.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-accent-gold flex items-center gap-2">
                    <Calendar size={16} className="text-accent-gold" />
                    <span>Showcase Schedule at Aarambh</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {clubEvents.map((event) => (
                      <div
                        key={event.id}
                        className="bg-white/5 border border-accent-blue/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="font-semibold text-white text-sm sm:text-base">
                            {event.eventTitle}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <Calendar size={13} className="text-accent-blue" />
                              {new Date(event.day).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={13} className="text-accent-blue" />
                              {event.startTime} {event.endTime ? `– ${event.endTime}` : ''}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={13} className="text-accent-gold" />
                              {event.venue}
                            </span>
                          </div>
                        </div>
                        <span className="self-start sm:self-center px-2.5 py-1 rounded-full bg-accent-blue/20 text-accent-blue border border-accent-blue/30 text-xs font-semibold whitespace-nowrap">
                          Live Event
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-background-dark/60 flex items-center justify-between flex-shrink-0">
              <span className="text-xs text-text-muted">
                Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white border border-white/20">ESC</kbd> or click outside to close
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
