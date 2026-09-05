import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { clubs } from '../data/clubs';
import type { Category } from '../types';
import { ArrowLeft, ExternalLink, Check, Award } from 'lucide-react';
import { useState } from 'react';

const CATEGORY_TAG_STYLES: Record<Category, string> = {
  Technical: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Cultural: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  Dance: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  Music: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Literary: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Other: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
};

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const ClubDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const club = clubs.find(c => c.id === slug);

  if (!club) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">Club not found</h1>
          <p className="text-text-muted">The club you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/clubs')} variant="primary">
            Back to Clubs Directory
          </Button>
        </div>
      </PageWrapper>
    );
  }

  const tagStyle = CATEGORY_TAG_STYLES[club.category] || "bg-white/10 text-text-muted border-white/20";

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-text-muted hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Clubs
        </button>

        {/* Club Header Hero Box */}
        <div className="glass-card p-6 sm:p-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto sm:mx-0 p-3 shadow-inner transition-transform duration-300 ease-smooth hover:scale-105 transform-gpu">
            {!imgError && club.logoUrl ? (
              <img 
                src={club.logoUrl} 
                alt={`${club.name} logo`} 
                className="w-full h-full object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-5xl font-bold text-accent-gold">
                {club.name.charAt(0)}
              </span>
            )}
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${tagStyle}`}>
                {club.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mt-2">
                {club.name}
              </h1>
              {club.tagline && (
                <p className="text-accent-gold text-base sm:text-lg font-medium italic mt-1">
                  "{club.tagline}"
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-wrap gap-3 justify-center sm:justify-start items-center">
              {club.applyFormUrl ? (
                <Button href={club.applyFormUrl} external variant="primary">
                  Apply / Join Now
                  <ExternalLink size={15} className="ml-2" />
                </Button>
              ) : (
                <Button disabled variant="secondary">
                  Applications Opening Soon
                </Button>
              )}
              
              {club.instagramUrl && (
                <a 
                  href={club.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/15 transition-glass duration-200 ease-smooth active:scale-95 font-medium text-sm"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  Instagram
                  <ExternalLink size={14} className="opacity-70" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Club Details Content */}
        <div className="space-y-6">
          <section className="glass-card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>Know Your Club</span>
            </h2>
            <div className="text-text-primary/90 text-sm sm:text-base leading-relaxed space-y-4">
              <p className="whitespace-pre-line">{club.about}</p>
            </div>
          </section>

          {club.achievements && club.achievements.length > 0 && (
            <section className="glass-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award size={20} className="text-accent-gold" />
                <span>Highlights &amp; Key Achievements</span>
              </h2>
              <div className="grid grid-cols-1 gap-2.5">
                {club.achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm text-text-primary">
                    <div className="p-1 rounded bg-accent-purple/30 text-accent-gold flex-shrink-0 mt-0.5">
                      <Check size={14} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
