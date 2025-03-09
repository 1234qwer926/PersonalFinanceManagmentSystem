import React from "react";
import "../PageCss/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>Personal Finance</h2>
          <p>
            Manage your finances efficiently with our system. Track expenses,
            set budgets, and secure your future.
          </p>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: pk7386510581@gmail.com</p>
          <p>Phone: +91 7386510581</p>
        </div>

        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Personal Finance Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
