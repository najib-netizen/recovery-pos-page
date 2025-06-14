
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800/50 backdrop-blur-sm border-t border-white/10 mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-gray-400 text-sm">
            © 2024 POS Management System. All rights reserved by Fiacre.
          </div>
          <div className="text-gray-400 text-sm">
            Made with ❤️ in Rwanda
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
