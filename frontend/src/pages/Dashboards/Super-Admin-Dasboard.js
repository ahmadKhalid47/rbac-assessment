import CreateRole from "components/Users/CreateRole";
import UserGrid from "components/Users/DisplayUsers";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const SuperAdminDashboard = () => {
  const userData = useSelector((state) => state.users);
  const [activeTab, setActiveTab] = useState("allUsers");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
        Admin Dashboard
      </h1>
      <p className="text-gray-700">Welcome Admin! Here you can manage users.</p>

      {/* Responsive Tab Buttons */}
      <div className="flex flex-wrap gap-1 justify-between md:gap-0 my-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
        <button
          className={`w-full sm:w-[48%] md:w-[24.5%] p-3 text-center rounded-xl md:rounded-xl ${activeTab === "allUsers" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => handleTabClick("allUsers")}
        >
          All Users
        </button>
        <button
          className={`w-full sm:w-[48%] md:w-[24.5%] p-3 text-center rounded-xl ${activeTab === "createUser" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => handleTabClick("createUser")}
        >
          Create User
        </button>
        <button
          className={`w-full sm:w-[48%] md:w-[24.5%] p-3 text-center rounded-xl ${activeTab === "allAdmins" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => handleTabClick("allAdmins")}
        >
          All Admins
        </button>
        <button
          className={`w-full sm:w-[48%] md:w-[24.5%] p-3 text-center rounded-xl md:rounded-r-xl ${activeTab === "createAdmin" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => handleTabClick("createAdmin")}
        >
          Create Admin
        </button>
      </div>

      {/* Conditional Rendering based on Active Tab */}
      {activeTab === "allUsers" && (
        <UserGrid userId={userData?._id} onlyAdmins={false} />
      )}
      {activeTab === "createUser" && <CreateRole role="User" />}
      {activeTab === "createAdmin" && <CreateRole role="Admin" />}
      {activeTab === "allAdmins" && (
        <UserGrid userId={userData?._id} onlyAdmins={true} />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
