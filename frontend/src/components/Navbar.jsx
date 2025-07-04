import React from "react";

const Navbar = () => {
  return (
    <nav className="backdrop-blur-md bg-white/30 shadow-md sticky top-0 z-50">
      <div className="max-w-full px-15 py-3 flex justify-between items-center">
        {/* Left Branding */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-indigo-500 to-pink-500 p-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 010 5.656l-1.414 1.414a4 4 0 01-5.656-5.656l1.414-1.414M10.172 13.828a4 4 0 010-5.656l1.414-1.414a4 4 0 015.656 5.656l-1.414 1.414"
              />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-gray-800 tracking-wide">
            Linkify
          </span>
        </div>

        {/* Right Side Button */}
        <div>
          {/* <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium shadow hover:scale-105 transition-transform duration-200">
            Login
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
