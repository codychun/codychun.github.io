import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import './Footer.css';

function Header() {
  return (
    <header className="header">
        <div className="header-content">
        <h1>Cody Chun</h1>
        <p>University of Notre Dame | Computer Engineering</p>
        </div>
    </header>

  );
}

export default Header;