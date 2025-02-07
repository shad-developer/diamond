import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-black p-4 text-center">
      © {currentYear} <b>Diamond Management Store</b> - All rights reserved
    </footer>
  );
};

export default Footer;
