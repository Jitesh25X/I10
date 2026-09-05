import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { clubs } from '../data/clubs';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export const ClubDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const club = clubs.find(c => c.id === slug);

  if (!club) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
          <h1 className="text-4xl font-serif font-bold text-white">Club not found</h1>
          <p className="text-text-muted">The club you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/clubs')} variant="primary">
            Back to Clubs Directory
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto space-y-8">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center md:text-left md:flex md:items-start md:space-x-8">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto md:mx-0 mb-6 md:mb-0 p-4">
            {!imgError && club.logoUrl ? (
              <img 
                src={club.logoUrl} 
                alt={`${club.name} logo`} 
                className="w-full h-full object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-5xl font-bold text-text-muted">
                {club.name.charAt(0)}
              </span>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <Badge>{club.category}</Badge>
              <h1 className="text-4xl font-bold text-white mt-3">{club.name}</h1>
              {club.tagline && (
                <p className="text-xl text-text-muted mt-2">{club.tagline}</p>
              )}
            </div>

            <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
              {club.applyFormUrl ? (
                <Button href={club.applyFormUrl} external variant="primary">
                  Apply to this Club
                </Button>
              ) : (
                <Button disabled variant="secondary">
                  Applications opening soon
                </Button>
              )}
              
              {club.instagramUrl && (
                <a 
                  href={club.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-3 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <ExternalLink size={24} />
                Next
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Know Your Club</h2>
            <div className="prose prose-invert max-w-none text-text-muted">
              <p className="whitespace-pre-wrap">{club.about}</p>
            </div>
          </section>

          {club.achievements && club.achievements.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Highlights & Achievements</h2>
              <ul className="list-disc list-inside text-text-muted space-y-2">
                {club.achievements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
