import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Clubs', path: '/clubs' },
    { name: 'Agenda', path: '/agenda' },
    { name: 'About', path: '/about' },
  ];

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
    <nav className="fixed top-0 inset-x-0 z-50 pt-4 sm:pt-5 px-4 pointer-events-none">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Desktop Centered Floating Navigation Dock */}
        <motion.div 
          layout
          className="hidden md:flex items-center gap-1.5 sm:gap-2 glass-pill px-3.5 py-2 pointer-events-auto transition-glass duration-300 ease-smooth"
        >
          <AnimatePresence initial={false}>
            {!isScrolled && (
              <motion.div
                key="desktop-header-logo"
                initial={{ opacity: 0, width: 0, scale: 0.9 }}
                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex items-center overflow-hidden whitespace-nowrap"
              >
                <Link
                  to="/"
                  onClick={handleLogoClick}
                  className="flex items-center gap-2 pl-1 pr-2 group transition-transform duration-200 ease-smooth hover:scale-105 active:scale-95 shrink-0"
                  aria-label="Aarambh Home"
                >
                  <img 
                    src="/logo.png" 
                    alt="Aarambh" 
                    className="h-7 sm:h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(242,193,78,0.35)]" 
                  />
                </Link>

                <div className="h-4 w-px bg-white/20 mx-1 mr-1.5 shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`px-4 py-1.5 rounded-full text-xs font-display font-semibold tracking-widest uppercase transition-glass duration-200 ease-smooth active:scale-95 ${
                    isActive
                      ? 'bg-accent-gold text-background-dark shadow-sm'
                      : 'text-text-muted hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Mobile Navigation Header Bar */}
        <motion.div 
          layout
          className={`md:hidden flex items-center ${!isScrolled ? 'justify-between' : 'justify-end'} w-full max-w-md mx-auto glass-pill px-4 py-2 pointer-events-auto transition-glass duration-300 ease-smooth`}
        >
          <AnimatePresence initial={false}>
            {!isScrolled && (
              <motion.div
                key="mobile-header-logo"
                initial={{ opacity: 0, width: 0, scale: 0.9 }}
                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden whitespace-nowrap flex items-center"
              >
                <Link to="/" onClick={handleLogoClick} className="flex items-center group transition-transform duration-200 ease-smooth active:scale-95 shrink-0" aria-label="Aarambh Home">
                  <img 
                    src="/logo.png" 
                    alt="Aarambh" 
                    className="h-7 w-auto object-contain drop-shadow-[0_0_10px_rgba(242,193,78,0.35)]" 
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={toggleMenu}
            className="text-text-muted hover:text-white focus:outline-none p-1.5 rounded-lg hover:bg-white/10 transition-glass duration-200 ease-smooth active:scale-90"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>

        {/* Mobile Dropdown Menu Box */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", damping: 26, stiffness: 350, mass: 0.75 }}
              style={{ transform: 'translate3d(0,0,0)', willChange: 'transform, opacity' }}
              className="md:hidden w-full max-w-md mx-auto mt-2 glass-panel p-2.5 pointer-events-auto overflow-hidden"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-xl text-sm font-display font-semibold tracking-widest uppercase text-center transition-glass duration-200 ease-smooth active:scale-[0.98] ${
                        isActive
                          ? 'bg-accent-gold text-background-dark shadow-md'
                          : 'text-text-muted hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
