import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginPopup from '../LoginPopup/LoginPopup';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const storedUserName = localStorage.getItem('userName');
    setIsLoggedIn(!!token);
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserName("");
    window.location.reload();
  };

  // Add click outside handler
  const handleClickOutside = (e) => {
    if (isMenuOpen && !e.target.closest('.navbar')) {
      setIsMenuOpen(false);
    }
  };

  // Add effect to handle click outside
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Add handler to close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" onClick={handleLinkClick}>TaskTracker</Link>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link to="/" onClick={handleLinkClick}>Home</Link>
            <Link to="/todo" onClick={handleLinkClick}>Todo</Link>
            <Link to="/activity" onClick={handleLinkClick}>Activity</Link>
          </div>

          <div className="auth-section">
            {isLoggedIn ? (
              <>
                <span className="user-name">Hello👋, {userName}</span>
                <button className="auth-button" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="auth-button" onClick={() => setShowLoginPopup(true)}>Login</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {showLoginPopup && (
        <LoginPopup 
          isOpen={showLoginPopup}
          onClose={() => setShowLoginPopup(false)}
          onLoginSuccess={() => setIsLoggedIn(true)}
        />
      )}
    </>
  );
};

export default Navbar;