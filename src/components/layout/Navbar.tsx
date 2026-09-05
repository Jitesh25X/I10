import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const showLogo = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const leftLinks = [
    { name: 'Clubs', path: '/clubs' },
    { name: 'Agenda', path: '/agenda' },
  ];
  
  const rightLinks = [
    { name: 'About', path: '/about' },
  ];
  
  const allLinks = [...leftLinks, ...rightLinks];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    closeMenu();
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 pt-4 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto relative">
        
        {/* Left Pill (Desktop) */}
        <div className="hidden md:flex items-center space-x-1 glass-pill px-4 py-2">
          {leftLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={`px-4 py-2 rounded-full text-xs font-display tracking-widest uppercase transition-colors ${
                location.pathname === link.path
                  ? 'bg-white/20 text-white'
                  : 'text-text-muted hover:text-white hover:bg-white/10'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Link to="/" onClick={handleLogoClick} className="block group">
                  <img 
                    src="/logo.png" 
                    alt="Aarambh" 
                    className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_12px_rgba(242,193,78,0.35)]" 
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Mobile Hamburger */}
        <div className="md:hidden glass-pill p-2 ml-auto">
          <button
            onClick={toggleMenu}
            className="text-text-muted hover:text-white focus:outline-none p-1"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Right Pill (Desktop) */}
        <div className="hidden md:flex items-center space-x-1 glass-pill px-4 py-2">
          {rightLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={`px-4 py-2 rounded-full text-xs font-display tracking-widest uppercase transition-colors ${
                location.pathname === link.path
                  ? 'bg-white/20 text-white'
                  : 'text-text-muted hover:text-white hover:bg-white/10'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-pill p-4 pointer-events-auto">
          <div className="flex flex-col space-y-2">
            {allLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-full text-sm font-display tracking-widest uppercase text-center transition-colors ${
                  location.pathname === link.path
                    ? 'bg-white/20 text-white'
                    : 'text-text-muted hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
