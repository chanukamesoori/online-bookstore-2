import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/navigation.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo/Brand */}
        <Link to="/" className="nav-logo">
          <img src="/logo.webp" alt="PageTurn Logo" className="nav-logo-img" />
          <span>PageTurn</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          
          <Link 
            to="/browse" 
            className={`nav-link ${isActive('/browse')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-search"></i>
            <span>Browse Books</span>
          </Link>
          
          <Link 
            to="/buy-sell" 
            className={`nav-link ${isActive('/buy-sell')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-exchange-alt"></i>
            <span>Buy & Sell</span>
          </Link>
          
          <Link 
            to="/create-account" 
            className={`nav-link ${isActive('/create-account')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-user-plus"></i>
            <span>Sign Up</span>
          </Link>

          {/* Additional Navigation Items */}
          <div className="nav-link dropdown">
            <i className="fas fa-ellipsis-h"></i>
            <span>More</span>
            <div className="dropdown-content">
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-info-circle"></i>
                About Us
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-envelope"></i>
                Contact
              </Link>
              <Link to="/help" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-question-circle"></i>
                Help
              </Link>
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div className="nav-actions">
          <Link to="/buy-sell?section=buy" className="nav-action-btn cart-btn">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{getTotalItems()}</span>
          </Link>
          
          <button className="nav-action-btn profile-btn">
            <i className="fas fa-user"></i>
          </button>
          
          <Link to="/login" className="nav-action-btn login-btn">
            <i className="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
