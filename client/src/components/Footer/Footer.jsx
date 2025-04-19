import React from 'react';
import './Footer.css';
import { footerLinks } from '../../assets/assets';
import { assets } from '../../assets/assets'; // for logo

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        {/* Logo and Description Column */}
        <div className="footer-section footer-brand">
          <img src={assets.logo2} alt="GreenCart Logo" className="footer-logo" />
          <p>Your trusted destination for fresh groceries and unbeatable deals.</p>
        </div>

        {/* Other Links */}
        {footerLinks.map((section, index) => (
          <div key={index} className="footer-section">
            <h4>{section.title}</h4>
            <ul>
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
