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

  const handleCreateProject = () => {
    navigate('/projects/new');  // Adjust the route for creating a new project
  };

  const handleViewProjects = () => {
    navigate('/projects');  // Adjust the route to view all projects
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
              <button onClick={handleCreateProject} className="navbar-button">
                Create Project
              </button>
              <button onClick={handleViewProjects} className="navbar-button">
                View Projects
              </button>
              <Link to="/profile" className="navbar-profile">
                <div className="avatar">
                  <span className="avatar-text">{user.first_name[0]}</span>
                </div>
                <span>Profile</span>
              </Link>
              <button onClick={handleLogout} className="navbar-logout">
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
