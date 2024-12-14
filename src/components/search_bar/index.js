import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;
