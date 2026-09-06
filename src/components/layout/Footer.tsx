import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  // Check URL query parameters for modal state (e.g. ?club=...)
  const searchParams = new URLSearchParams(location.search);
  const isClubModalParamPresent = Boolean(searchParams.get('club'));

  // Active modal state is true if state, body flag, or URL parameter indicates modal is active
  const isClubModalOpen = isModalOpen || isClubModalParamPresent;

  useEffect(() => {
    const checkModalState = () => {
      const active =
        document.body.classList.contains('modal-open') ||
        document.body.getAttribute('data-modal-open') === 'true' ||
        Boolean(document.querySelector('[role="dialog"]'));
      setIsModalOpen(active);
    };

    checkModalState();

    const handleModalEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen?: boolean }>;
      const open = customEvent.detail?.isOpen ?? false;
      setIsModalOpen(open);
    };

    const observer = new MutationObserver(() => {
      checkModalState();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-modal-open'],
      childList: true,
      subtree: true,
    });

    window.addEventListener('modal-state-change', handleModalEvent);

    return () => {
      observer.disconnect();
      window.removeEventListener('modal-state-change', handleModalEvent);
    };
  }, [location]);

  return (
    <footer
      className={`site-footer border-t border-white/10 bg-background-dark/75 backdrop-blur-md py-12 mt-16 relative transition-all duration-200 ease-smooth ${
        isClubModalOpen
          ? 'opacity-0 invisible pointer-events-none -z-10'
          : 'opacity-100 visible z-0'
      }`}
      aria-hidden={isClubModalOpen}
    >
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
