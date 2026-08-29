/**
 * Question Mart & Cafe - Main App Component
 * Root component with routing setup
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './context';
import { LoyaltyPage } from './pages/loyalty';
import { LoginPage } from './pages/auth';

function App() {
  const { direction } = useTheme();

  return (
    <Router>
      <div className="App" dir={direction}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          <Route path="/" element={<Navigate to="/loyalty" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
