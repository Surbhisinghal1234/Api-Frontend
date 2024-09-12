import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
     <div className="text-center text-gray-200">
          &copy; {new Date().getFullYear()}  All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
