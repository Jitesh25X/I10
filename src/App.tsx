import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from './pages/Home';
import { Clubs } from './pages/Clubs';
import { Agenda } from './pages/Agenda';
import { About } from './pages/About';
import { PreloaderProvider, usePreloader } from './context/PreloaderContext';
import { Preloader } from './components/layout/Preloader';

const WebsiteApp = () => {
  const { isPreloaderActive, isWebsiteEmerging } = usePreloader();
  const isHiddenUnderPreloader = isPreloaderActive && !isWebsiteEmerging;

  return (
    <motion.div
      id="aarambh-website-root"
      initial={false}
      animate={{
        opacity: isHiddenUnderPreloader ? 0 : 1,
        y: isHiddenUnderPreloader ? 20 : 0,
        scale: isHiddenUnderPreloader ? 1.03 : 1,
      }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative z-40 w-full min-h-screen transform-gpu"
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:slug" element={<Clubs />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </motion.div>
  );
};

function App() {
  return (
    <PreloaderProvider>
      <Preloader />
      <WebsiteApp />
    </PreloaderProvider>
  );
}

export default App;
