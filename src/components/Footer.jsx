import React from 'react';
import { TrendingUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <TrendingUp size={20} />
              </div>
              <h3 className="footer-logo-text">NewsHub</h3>
            </div>
            <p className="footer-tagline">
              Your trusted source for breaking news and in-depth analysis.
            </p>
          </div>
          <div className="footer-links-horizontal">
            <a href="#about">About Us</a>
            <span className="footer-separator">•</span>
            <a href="#team">Our Team</a>
            <span className="footer-separator">•</span>
            <a href="#careers">Careers</a>
            <span className="footer-separator">•</span>
            <a href="#contact">Contact</a>
            <span className="footer-separator">•</span>
            <a href="#terms">Terms & Conditions</a>
            <span className="footer-separator">•</span>
            <a href="#privacy">Privacy Policy</a>
            <span className="footer-separator">•</span>
            <a href="#cookies">Cookie Policy</a>
            <span className="footer-separator">•</span>
            <a href="#guidelines">Editorial Guidelines</a>
            <span className="footer-separator">•</span>
            <a href="#help">Help Center</a>
            <span className="footer-separator">•</span>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © {currentYear} NewsHub. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="#twitter">Twitter</a>
            <span className="footer-separator">•</span>
            <a href="#facebook">Facebook</a>
            <span className="footer-separator">•</span>
            <a href="#instagram">Instagram</a>
            <span className="footer-separator">•</span>
            <a href="#linkedin">LinkedIn</a>
          </div>
          <p className="footer-attribution">
            Powered by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">NewsAPI.org</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;