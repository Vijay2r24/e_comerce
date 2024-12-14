import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const AdminSignupPage = () => {
  const [formData, setFormData] = useState({
    CompanyName: "",
    CompanyCode: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    GSTno: "",
    AddressLine: "",
    CityID: "",
    StateID: "",
    CountryID: "",
    Pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = () => {
    console.log("Admin Signup Data:", formData);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-pacific-100 to-pacific-500">
      {/* Left Section with Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-4xl font-semibold text-center text-pacific-600 mb-6">
            Admin Signup
          </h2>

          {/* Form Fields */}
          <div className="space-y-4">
            <input
              type="text"
              name="CompanyName"
              placeholder="Company Name"
              value={formData.CompanyName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
            />
            <input
              type="number"
              name="CompanyCode"
              placeholder="Company Code"
              value={formData.CompanyCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
            />
            <input
              type="email"
              name="Email"
              placeholder="Email Address"
              value={formData.Email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
            />
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
            />
            <input
              type="tel"
              name="PhoneNumber"
              placeholder="Phone Number"
              value={formData.PhoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
            />
            <input
              type="text"
              name="GSTno"
              placeholder="GST Number"
              value={formData.GSTno}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
            />
            <input
              type="text"
              name="AddressLine"
              placeholder="Address Line"
              value={formData.AddressLine}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                name="CityID"
                placeholder="City ID"
                value={formData.CityID}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
              />
              <input
                type="number"
                name="StateID"
                placeholder="State ID"
                value={formData.StateID}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
              />
              <input
                type="number"
                name="CountryID"
                placeholder="Country ID"
                value={formData.CountryID}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
              />
            </div>
            <input
              type="number"
              name="Pincode"
              placeholder="Pincode"
              value={formData.Pincode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pacific-500"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full mt-6 py-3 bg-pacific-600 text-white font-semibold rounded-lg hover:bg-pacific-700 transition duration-300"
          >
            Sign Up
          </button>

          {/* Social Login */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="p-3 bg-white border border-gray-300 rounded-full text-red-500 hover:bg-pacific-100 transition duration-300">
              <FaGoogle size={24} />
            </button>
            <button className="p-3 bg-white border border-gray-300 rounded-full text-blue-600 hover:bg-pacific-100 transition duration-300">
              <FaFacebook size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Section with Admin Icon */}
      <div className="hidden md:flex w-1/2 bg-pacific-500 justify-center items-center">
        <MdAdminPanelSettings size={200} color="white" />
      </div>
    </div>
  );
};

export default AdminSignupPage;

