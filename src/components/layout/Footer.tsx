import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-background-dark/75 backdrop-blur-md py-12 mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center space-y-6">
        <Link to="/" className="inline-block group transition-transform duration-200 ease-smooth hover:scale-105 active:scale-95 transform-gpu">
          <img 
            src="/logo.png" 
            alt="Aarambh" 
            className="h-9 sm:h-10 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200 ease-smooth drop-shadow-[0_0_12px_rgba(242,193,78,0.25)]" 
          />
        </Link>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm font-display tracking-wider uppercase text-text-muted">
          <Link to="/" className="hover:text-accent-gold transition-colors duration-200 ease-smooth">Home</Link>
          <span className="text-white/20 select-none">&bull;</span>
          <Link to="/clubs" className="hover:text-accent-gold transition-colors duration-200 ease-smooth">Clubs</Link>
          <span className="text-white/20 select-none">&bull;</span>
          <Link to="/agenda" className="hover:text-accent-gold transition-colors duration-200 ease-smooth">Agenda</Link>
          <span className="text-white/20 select-none">&bull;</span>
          <Link to="/about" className="hover:text-accent-gold transition-colors duration-200 ease-smooth">About</Link>
        </div>

        <div className="w-16 h-px bg-white/10" />

        <p className="text-text-muted text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Institute of Technical Education &amp; Research (ITER). All rights reserved.
        </p>
      </div>
    </footer>
  );
};
