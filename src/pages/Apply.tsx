import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { clubs } from '../data/clubs';
import { Button } from '../components/ui/Button';
import { Search } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const Apply = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-white">Apply to Clubs</h1>
          <p className="text-text-muted">Found the clubs you want to join? Apply directly here.</p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-background-dark/50 text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue sm:text-sm"
            placeholder="Search clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredClubs.length > 0 ? (
            filteredClubs.map(club => (
              <div 
                key={club.id} 
                className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                    {club.logoUrl ? (
                      <img src={club.logoUrl} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-bold text-text-muted">{club.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{club.name}</h3>
                    <Badge>{club.category}</Badge>
                  </div>
                </div>

                <div>
                  {club.applyFormUrl ? (
                    <Button href={club.applyFormUrl} external variant="primary" className="w-full sm:w-auto">
                      Apply Now
                    </Button>
                  ) : (
                    <Button disabled variant="secondary" className="w-full sm:w-auto">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
              <p className="text-text-muted">No clubs found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
