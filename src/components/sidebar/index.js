import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaCog,
  FaInbox,
  FaChartBar,
  FaTimes,
  FaTabletAlt,
  FaBoxOpen,
  FaTh,
} from "react-icons/fa";
import { MdOutlineBusiness } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';

const Sidebar = ({ user, isOpen, setIsOpen, onSelectItem, toggleSidebar }) => {
  const sidebarItems = [
    { icon: <FaShoppingCart />, label: "Dashboard", path: "/dashboard" },
    { icon: <GiShoppingBag />, label: "Browse", path: "/Browse/step1/create" },
    { icon: <FaInbox />, label: "Orders", path: "/orders" },
    { icon: <FaTabletAlt />, label: "Add Products", path: "/products" },
    { icon: <FaBoxOpen />, label: "All Products", path: "/all-products" },
  ];

  return (
    <>
      {/* Sidebar overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar component */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen p-2 w-64 bg-white text-gray-600 z-20 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        {/* Logo and Close Icon for small screens */}
        <div className="flex justify-between items-center p-2.5 border-b-2">
          <h2 className="text-2xl text-pacific-500">Logo</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {user && (
          <div className="flex justify-center items-center gap-2 my-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex flex-col text-left">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        )}

        <ul className="space-y-6 mx-4 p-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center space-x-2 hover:text-purple-800 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  onSelectItem(item.label);
                  setIsOpen(false);
                }}
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
