import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>Moodify</Link>
        {/* Add the conditional 'active' class here */}
        <div className={`navbar-toggle ${menuOpen ? 'active' : ''}`} onClick={handleToggle} aria-label="Toggle navigation" tabIndex={0} role="button">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About</Link></li>
          <li><Link to="/upload" className={location.pathname === '/upload' ? 'active' : ''} onClick={closeMenu}>Upload song</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;