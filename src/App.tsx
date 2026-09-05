import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Clubs } from './pages/Clubs';
import { ClubDetail } from './pages/ClubDetail';
import { Agenda } from './pages/Agenda';
import { Apply } from './pages/Apply';
import { About } from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:slug" element={<ClubDetail />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
