import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Clubs } from './pages/Clubs';
import { Agenda } from './pages/Agenda';
import { About } from './pages/About';
import { PreloaderProvider } from './context/PreloaderContext';
import { Preloader } from './components/layout/Preloader';

function App() {
  return (
    <PreloaderProvider>
      <Preloader />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:slug" element={<Clubs />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </PreloaderProvider>
  );
}

export default App;
