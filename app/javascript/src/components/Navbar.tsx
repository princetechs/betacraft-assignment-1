// src/components/Navbar.tsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Navbar.css';
import GoogleLoginButton from './GoogleLoginButton';
const Navbar: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-link">
            Kulu App
          </Link>
        </div>

        <div className="navbar-links">
          {user ? (
            <div className="navbar-user">
              <Link to="/profile" className="navbar-profile">
                <div className="avatar">
                  <span className="avatar-text">{user.first_name[0]}</span>
                </div>
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="navbar-logout"
              >
                Sign Out
              </button>
            </div>
          ) : (
            
              <GoogleLoginButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
