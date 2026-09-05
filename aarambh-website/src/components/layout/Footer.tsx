import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-background-dark/50 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center space-y-4">
        <Link to="/" className="inline-block group">
          <img 
            src="/logo.png" 
            alt="Aarambh" 
            className="h-9 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_12px_rgba(242,193,78,0.25)]" 
          />
        </Link>
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} Institute of Technical Education & Research. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
