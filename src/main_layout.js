import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Avatar from "./assets/images/avatar.jpg";
import Header from "./components/header";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: Avatar,
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSelectItem={setSelectedItem}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} title={selectedItem} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
