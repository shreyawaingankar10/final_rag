import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import DataCollection from './components/DataCollection';
import ArI from './components/ArI';
import AlertsReports from './components/AlertsReports';
import User from './components/User';
import SystemSettings from './components/SystemSettings';
import PrivateRoute from './components/PrivateRoute';

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="app-container">
      {/* Show Navbar only if not on the Login page */}
      {!isLoginPage && <Navbar />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/ai-analysis" element={<PrivateRoute element={<ArI />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/data-collection" element={<PrivateRoute element={<DataCollection />} />} />
          <Route path="/alerts-reports" element={<PrivateRoute element={<AlertsReports />} />} />
          <Route path="/settings" element={<PrivateRoute element={<SystemSettings />} />} />
          <Route path="/user" element={<PrivateRoute element={<User currentUserRole="Admin" />} />} />
        </Routes>
      </main>

      {/* Show Footer only if not on the Login page */}
      {!isLoginPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
