import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // For navigation

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="/logo.jpg" alt="logo" className="logo" />
        </div>
        <div className="navbar-links">
          <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
          <Link to="/data-collection" className={location.pathname === '/data-collection' ? 'active' : ''}>Data Collection</Link>
          <Link to="/ai-analysis" className={location.pathname === '/ai-analysis' ? 'active' : ''}>AI Analysis</Link>
          <Link to="/alerts-reports" className={location.pathname === '/alerts-reports' ? 'active' : ''}>Alerts and Reports</Link>
          <Link to="/user" className={location.pathname === '/user' ? 'active' : ''}>User Management</Link>
          <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>System Settings</Link>
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>

          {/* Logout button */}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
