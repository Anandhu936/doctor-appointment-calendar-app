import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import CalendarPage from './components/CalendarPage';


function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('loggedIn') === 'true');
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/calendar" /> : <Login />} />
      <Route path="/calendar" element={isLoggedIn ? <CalendarPage onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;