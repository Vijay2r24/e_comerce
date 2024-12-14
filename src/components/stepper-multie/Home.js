
import React, { useState, useEffect } from "react";
import { FaNetworkWired, FaThLarge, FaTags, FaPalette, FaBox } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "step1", label: "Brand", Icon: FaNetworkWired, activeColorClass: "text-pacific-500", inactiveColorClass: "text-red-600" },
    { id: "step2", label: "Categories", Icon: FaThLarge, activeColorClass: "text-pacific-500", inactiveColorClass: "text-green-600" },
    { id: "step3", label: "ProductType", Icon: FaTags, activeColorClass: "text-pacific-500", inactiveColorClass: "text-gray-600" },
    { id: "step4", label: "Colors", Icon: FaPalette, activeColorClass: "text-pacific-500", inactiveColorClass: "text-yellow-600" },
    { id: "step5", label: "Size", Icon: FaBox, activeColorClass: "text-pacific-500", inactiveColorClass: "text-indigo-600" },
  ];

  const activeTab = location.pathname.split("/")[2] || "step1";

  const nestedTabs = (() => {
    const defaultNestedTabs = [
      { id: 1, label: "Create" },
      { id: 2, label: "List" },
    ];

    if (activeTab === "step1" && location.pathname.includes("editCreateBrand")) {
      return [
        { id: 1, label: "Update" },
        { id: 2, label: "List" },
      ];
    }

    if (activeTab === "step2" && location.pathname.includes("editCategory")) {
      return [
        { id: 1, label: "Update" },
        { id: 2, label: "List" },
      ];
    }

    if (activeTab === "step3" && location.pathname.includes("editProductType")) {
      return [
        { id: 1, label: "Update" },
        { id: 2, label: "List" },
      ];
    }
    if (activeTab === "step4" && location.pathname.includes("editCreateColor")) {
      return [
        { id: 1, label: "Update" },
        { id: 2, label: "List" },
      ];
    }
    if (activeTab === "step5" && location.pathname.includes("editCreateSize")) {
      return [
        { id: 1, label: "Update" },
        { id: 2, label: "List" },
      ];
    }
    return defaultNestedTabs;
  })();

  const activeNestedTab = (() => {
    if (location.pathname.includes("create")) return 1;
    if (
      location.pathname.includes("editCreateBrand") ||
      location.pathname.includes("editCategory") ||
      location.pathname.includes("editProductType") ||
      location.pathname.includes("editCreateColor") ||
      location.pathname.includes("editCreateSize")
    )
      return 1;
    if (location.pathname.includes("list")) return 2;
    return 2;
  })();

  const handleTabChange = (id) => {
    navigate(`/Browse/${id}/list`);
  };

  const handleNestedTabChange = (nestedTabId) => {
    if (activeTab === "step3") {
      if (nestedTabId === 1) {
        if (location.pathname.includes("editProductType")) {
          navigate(`/Browse/${activeTab}/editProductType/1`);
        } else {
          navigate(`/Browse/${activeTab}/create`);
        }
      } else if (nestedTabId === 2) {
        navigate(`/Browse/${activeTab}/list`);
      }
    } else if (
      ["step1", "step2", "step4", "step5"].includes(activeTab) &&
      nestedTabId === 1 &&
      location.pathname.includes("editProduct")
    ) {
      navigate(`/Browse/${activeTab}/editProduct/1`);
    } else {
      navigate(`/Browse/${activeTab}/${nestedTabId === 1 ? "create" : "list"}`);
    }
  };

  const renderNestedTabContent = () => <Outlet />;

  return (
    <div className="flex flex-col md:flex-row w-full max-w-screen-2xl mx-auto bg-white rounded-lg">
      <ToastContainer />
      <div className="flex flex-row md:flex-col w-full md:w-1/5 p-4 bg-gray-50 border-r border-gray-200 rounded-l-lg">
        <ul className="space-y-0 md:space-y-5 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          {tabs.map(({ id, label, Icon, activeColorClass, inactiveColorClass }) => (
            <li key={id} className="mr-2 md:mr-0">
              <button
                onClick={() => handleTabChange(id)}
                className={`flex items-center justify-start px-4 py-3 md:px-5 md:py-3 w-full md:rounded-md transition-all duration-300 ${activeTab === id
                  ? `${activeColorClass} font-semibold md:border-l-4 border-pacific-500 bg-gray-100`
                  : "text-black hover:bg-gray-200 hover:text-gray-900"
                  }`}
              >
                <Icon size={20} className={`mr-3 ${activeTab === id ? activeColorClass : inactiveColorClass}`} />
                <span className={`font-medium whitespace-nowrap ${activeTab === id ? activeColorClass : "text-black"}`}>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4 md:p-6 bg-white border-t md:border-t-0 border-gray-300 rounded-r-lg">
        <div className="flex w-full mb-4 gap-2">
          {nestedTabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNestedTabChange(id)}
              className={`flex-1 px-6 py-3 text-center rounded-lg transition-all duration-300 
          ${activeNestedTab === id
                  ? "bg-gradient-to-r from-pacific-500 to-pacific-600 text-white font-semibold shadow-lg"
                  : "bg-gray-100 text-black hover:bg-pacific-100 hover:text-pacific-500 hover:shadow-md"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
        {renderNestedTabContent()}
      </div>


    </div>
  );
};

export default Home;












