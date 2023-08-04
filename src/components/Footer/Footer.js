// Footer.js

import React from 'react';
import './Footer.css'; // Importa los estilos CSS para el footer
import logoUTN from "../../img/UTN.png";
const Footer = () => {
  return (
    <footer className="footer">
      <a href="https://www.utn.ac.cr/" target="_blank" rel="noopener noreferrer">
        <img src={logoUTN} alt="UTN" className="footer-logo" />
      </a>
      <div className="footer-text">
        <p>UTN | Universidad Técnica Nacional</p>
        <p>Luis Diego Solano</p>
      </div>
    </footer>
  );
};

export default Footer;
