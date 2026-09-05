import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';

export const About = () => {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-white">About Aarambh</h1>
          <p className="text-xl text-text-muted">The beginning of your extra-curricular journey.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/poster-assets/stars.svg')] opacity-20"></div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 relative z-10">
            <img 
              src="/logo.png" 
              alt="Aarambh" 
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(242,193,78,0.35)]" 
            />
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/10 flex items-center justify-center p-2 backdrop-blur-sm">
              <img src="/clubs/soa.png" alt="Siksha 'O' Anusandhan" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="relative z-10 prose prose-invert max-w-none text-text-muted space-y-6">
            <p className="text-lg leading-relaxed">
              <strong>Aarambh</strong> is the annual clubs-orientation event hosted by the 
              <span className="text-white font-medium"> Institute of Technical Education & Research (ITER)</span>.
            </p>
            <p>
              Every year, ITER's vibrant ecosystem of technical, cultural, literary, and sports clubs 
              comes together to showcase their work, achievements, and vision to the new incoming batch 
              of students. It is a festival of talent, innovation, and community.
            </p>
            <p>
              Whether you are passionate about building robots, competitive coding, dancing, music, or 
              debating, Aarambh provides you the perfect platform to discover your interests and find 
              the right community to nurture your skills.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button href="/clubs" variant="primary">Explore Clubs</Button>
          <Button href="/agenda" variant="secondary">View Agenda</Button>
        </div>
      </div>
    </PageWrapper>
  );
};
