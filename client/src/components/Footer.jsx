// src/Footer.js
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import "../static/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_main">
        <div className="contact_info">
          <h1 className="title">Contact Us</h1>
          <p>
            <strong>Address</strong>
          </p>
          <p>
            <strong>Cell Phone:</strong>0123456789
          </p>
        </div>
        <div className="social_links">
          <h1 className="title">Social</h1>
          <div className="links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="fa" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <BsInstagram className="fa" />
            </a>
            <a
              href="https://youtube.com/us"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <BsYoutube className="fa" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer_rights">
        <p>All Rights Reserved | Arbitrochain | CopyRights @ 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
