import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { Sparkles, Users, Calendar } from 'lucide-react';

export const About = () => {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            About Aarambh
          </h1>
          <p className="text-text-muted text-base sm:text-lg">
            The official clubs orientation festival of Institute of Technical Education &amp; Research.
          </p>
        </div>

        {/* Main Overview Glass Card */}
        <div className="glass-card p-6 sm:p-10 relative overflow-hidden space-y-8">
          {/* Symmetrical Partner Emblems */}
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center p-3 shadow-inner transition-transform duration-300 ease-smooth hover:scale-105 transform-gpu">
              <img 
                src="/logo.png" 
                alt="Aarambh" 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(242,193,78,0.3)]" 
              />
            </div>
            
            <div className="h-10 w-px bg-white/20" />
            
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center p-3 shadow-inner transition-transform duration-300 ease-smooth hover:scale-105 transform-gpu">
              <img 
                src="/clubs/soa.png" 
                alt="Siksha 'O' Anusandhan" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-4 text-text-muted text-base sm:text-lg leading-relaxed">
            <p>
              <strong className="text-white font-semibold">Aarambh</strong> is the annual clubs orientation event hosted by the 
              <span className="text-accent-gold font-medium"> Institute of Technical Education &amp; Research (ITER)</span>.
            </p>
            <p>
              Every year, ITER's vibrant ecosystem of technical, cultural, literary, and sports societies comes together to showcase their work, achievements, and roadmap to the new incoming batch of students.
            </p>
            <p>
              Whether you are passionate about competitive coding, robotics, musical jams, street dance, photography, or debating, Aarambh provides the springboard to discover your interests and join the community.
            </p>
          </div>
        </div>

        {/* 3 Pillars Highlight Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card-interactive p-6 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center">
              <Users size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">40+ Student Clubs</h3>
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
              From developer chapters and robotics labs to music bands and drama societies across campus.
            </p>
          </div>

          <div className="glass-card-interactive p-6 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-accent-gold/20 text-accent-gold border border-accent-gold/30 flex items-center justify-center">
              <Calendar size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">2 Days of Action</h3>
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
              Live demos, combat bots, acoustic sessions, open cyphers, and hands-on workshops.
            </p>
          </div>

          <div className="glass-card-interactive p-6 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
              <Sparkles size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Direct Inductions</h3>
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
              Direct access to club recruitments, team leads, Google application forms, and social handles.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Button href="/clubs" variant="primary" className="w-full sm:w-auto min-w-[170px]">
            Explore Clubs
          </Button>
          <Button href="/agenda" variant="secondary" className="w-full sm:w-auto min-w-[170px]">
            View Agenda
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};
