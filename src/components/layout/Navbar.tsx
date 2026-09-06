import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const isNavigating = useRef(false);

  // Check URL query parameters for modal state (e.g. /clubs?club=... or /agenda?club=...)
  const searchParams = new URLSearchParams(location.search);
  const isClubModalParamPresent = Boolean(searchParams.get('club'));

  // Active modal state is true if state, body flag, or URL parameter indicates modal is active
  const isClubModalOpen = isModalOpen || isClubModalParamPresent;

  // Route change synchronization: reset scroll, lock scroll listener during transition, and ensure logo is shown
  useEffect(() => {
    isNavigating.current = true;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    lastScrollY.current = 0;

    // Release navigation lock and ensure logo is shown after layout settles
    const rafId = requestAnimationFrame(() => {
      setIsScrolled(false);
      isNavigating.current = false;
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  // Directional scroll listener with requestAnimationFrame throttling and hysteresis
  useEffect(() => {
    const updateScrollDirection = () => {
      if (isNavigating.current) {
        ticking.current = false;
        return;
      }

      const currentScrollY = Math.max(0, window.scrollY);
      const prevScrollY = lastScrollY.current;
      const scrollDiff = currentScrollY - prevScrollY;

      // Always show logo at or near top
      if (currentScrollY <= 20) {
        setIsScrolled(false);
      } 
      // Scrolling down past threshold with intentional movement: smoothly hide logo
      else if (scrollDiff > 6 && currentScrollY > 60) {
        setIsScrolled(true);
      } 
      // Scrolling up with intentional movement: smoothly reveal logo
      else if (scrollDiff < -6) {
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current && !isNavigating.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Monitor club details modal state via DOM attributes, events, and MutationObserver
  useEffect(() => {
    const checkModalState = () => {
      const active =
        document.body.classList.contains('modal-open') ||
        document.body.getAttribute('data-modal-open') === 'true' ||
        Boolean(document.querySelector('[role="dialog"]'));
      setIsModalOpen(active);
      if (active) {
        setIsOpen(false); // Close mobile hamburger menu if open
      }
    };

    checkModalState();

    // Listen for custom modal state change events
    const handleModalEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen?: boolean }>;
      const open = customEvent.detail?.isOpen ?? false;
      setIsModalOpen(open);
      if (open) {
        setIsOpen(false);
      }
    };

    // Observe document body for modal class/attribute changes and dialog insertion
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

  // Automatically close open mobile hamburger menu if modal becomes active
  useEffect(() => {
    if (isClubModalOpen && isOpen) {
      setIsOpen(false);
    }
  }, [isClubModalOpen, isOpen]);

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
    <nav className={`fixed top-0 inset-x-0 z-50 pt-4 sm:pt-5 px-4 pointer-events-none transition-opacity duration-200 ${isClubModalOpen ? 'max-md:hidden' : ''}`}>
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Desktop Centered Floating Navigation Dock */}
        <motion.div 
          layout
          className="hidden md:flex items-center gap-1.5 sm:gap-2 glass-pill px-3.5 py-2 pointer-events-auto transition-[background-color,border-color,box-shadow] duration-300 ease-smooth"
        >
          <AnimatePresence initial={false}>
            {!isScrolled && (
              <motion.div
                key="desktop-header-logo"
                initial={{ opacity: 0, width: 0, scale: 0.9 }}
                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
                    width="120"
                    height="32"
                    className="h-7 sm:h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(242,193,78,0.35)] shrink-0" 
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
        <div 
          className={`md:hidden w-full max-w-md mx-auto flex justify-end pointer-events-none mobile-nav-header transition-all duration-200 ${
            isClubModalOpen ? 'hidden !pointer-events-none' : ''
          }`}
          aria-hidden={isClubModalOpen}
        >
          <motion.div 
            layout
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className={`flex items-center pointer-events-auto transition-[background-color,border-color,box-shadow] duration-300 ease-smooth ${
              !isScrolled 
                ? 'w-full justify-between glass-pill px-4 py-2 rounded-full' 
                : 'w-11 h-11 justify-center glass-pill rounded-full p-0 shadow-lg'
            }`}
          >
            <AnimatePresence initial={false}>
              {!isScrolled && (
                <motion.div
                  key="mobile-header-logo"
                  initial={{ opacity: 0, width: 0, scale: 0.9 }}
                  animate={{ opacity: 1, width: 'auto', scale: 1 }}
                  exit={{ opacity: 0, width: 0, scale: 0.85 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden whitespace-nowrap flex items-center"
                >
                  <Link to="/" onClick={handleLogoClick} className="flex items-center group transition-transform duration-200 ease-smooth active:scale-95 shrink-0" aria-label="Aarambh Home">
                    <img 
                      src="/logo.png" 
                      alt="Aarambh" 
                      width="100"
                      height="28"
                      className="h-7 w-auto object-contain drop-shadow-[0_0_10px_rgba(242,193,78,0.35)] shrink-0" 
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={toggleMenu}
              className={`hamburger-btn text-text-muted hover:text-white focus:outline-none transition-glass duration-200 ease-smooth active:scale-90 flex items-center justify-center ${
                !isScrolled 
                  ? 'p-1.5 rounded-lg hover:bg-white/10' 
                  : 'w-full h-full rounded-full hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Dropdown Menu Box */}
        <AnimatePresence>
          {isOpen && !isClubModalOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", damping: 26, stiffness: 350, mass: 0.75 }}
              style={{ transform: 'translate3d(0,0,0)', willChange: 'transform, opacity' }}
              className="md:hidden w-full max-w-md mx-auto mt-2 glass-panel p-2.5 pointer-events-auto overflow-hidden mobile-nav-menu"
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
