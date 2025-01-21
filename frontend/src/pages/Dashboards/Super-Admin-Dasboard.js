import CreateRole from "components/Users/CreateRole";
import UserGrid from "components/Users/DisplayUsers";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const SuperAdminDashboard = () => {
  const userData = useSelector((state) => state.users);
  const [showUsers, setShowPosts] = useState("allUsers");
  const handleToggle = (target) => {
    setShowPosts(target);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-gray-700">Welcome Admin! Here you can manage users.</p>

      <div className="w-full h-fit flex my-6 text-2xl font-bold py-2 justify-between ">
        <button
          className={`w-[24.5%] p-3 text-center rounded-l-xl ${showUsers === "allUsers" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => {
            handleToggle("allUsers");
          }}
        >
          All Users
        </button>
        <button
          className={`w-[24.5%] p-3 text-center ${showUsers === "createUser" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => {
            handleToggle("createUser");
          }}
        >
          Create User
        </button>
        <button
          className={`w-[24.5%] p-3 text-center ${showUsers === "allAdmins" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => {
            handleToggle("allAdmins");
          }}
        >
          All Admins
        </button>
        <button
          className={`w-[24.5%] p-3 text-center rounded-r-xl ${showUsers === "createAdmin" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => {
            handleToggle("createAdmin");
          }}
        >
          Create Admin
        </button>
      </div>

      {showUsers === "allUsers" ? (
        <UserGrid userId={userData?._id} isSuperAdmin={false} />
      ) : showUsers === "createUser" ? (
        <CreateRole role="User" />
      ) : showUsers === "createAdmin" ? (
        <CreateRole role="Admin" />
      ) : showUsers === "allAdmins" ? (
        <UserGrid userId={userData?._id} isSuperAdmin={true} />
      ) : null}
    </div>
  );
};

export default SuperAdminDashboard;
