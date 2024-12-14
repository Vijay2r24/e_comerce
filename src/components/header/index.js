import React from "react";
import { FaBell, FaCog } from "react-icons/fa";

const Header = ({ title, toggleSidebar }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <span className="text-2xl">☰</span>
        </button>
        <h1 className="text-xl font-bold ml-2">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <FaBell size={24} className="text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        <button>
          <FaCog size={20} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;
