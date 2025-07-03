import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-zinc-900 text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center">
        <span className="font-bold text-2xl tracking-wide">URL Shortener</span>
      </div>
      <div className="flex items-center">
        <button
          className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200 shadow"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
