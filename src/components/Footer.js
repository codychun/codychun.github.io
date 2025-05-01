import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/education">Education</Link>
          <Link to="/hobbies">Hobbies</Link>
          <Link to="/contact">Contact</Link>
        </div>
        
        <div className="social-links">
          <a href="https://github.com/codychun" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/cody-chun-056ab4286/" target="_blank" rel="noopener noreferrer">LinkedIn</a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;