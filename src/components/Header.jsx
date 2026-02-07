import React from 'react';

const Header = () => {
  return (
    <header className="bg-fn-bg text-white py-4 px-8 flex justify-between items-center border-b border-white/10">
      <div className="text-2xl font-bold tracking-wider">
        FUNDED<span className="text-blue-400">NEXT</span>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <a href="#" className="hover:text-blue-400">Home</a>
        <a href="#" className="hover:text-blue-400">Models</a>
        <a href="#" className="hover:text-blue-400">FAQ</a>
        <a href="#" className="hover:text-blue-400">Contact</a>
      </nav>
      <div className="flex gap-4">
        <button className="text-sm font-medium hover:text-blue-400">Login</button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
