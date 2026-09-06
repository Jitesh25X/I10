import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { Clubs } from './pages/Clubs';
import { Agenda } from './pages/Agenda';
import { About } from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:slug" element={<Clubs />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
