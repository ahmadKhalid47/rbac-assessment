import CreateRole from "components/Users/CreateRole";
import PostGrid from "components/Posts/DisplayPosts";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserGrid from "components/Users/DisplayUsers";

const AdminDashboard = () => {
  const userData = useSelector((state) => state.users);
  const [showUsers, setShowPosts] = useState(true);
  const handleToggle = () => {
    setShowPosts(!showUsers);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-gray-700">Welcome Admin! Here you can manage users.</p>

      <div className="w-full h-fit flex my-6 text-2xl font-bold py-2 justify-between ">
        <button
          className={`w-[49.5%] p-3 text-center rounded-l-xl ${!showUsers ? "bg-gray-100" : "bg-blue-500 text-white"}`}
          onClick={handleToggle}
        >
          All User
        </button>
        <button
          className={`w-[49.5%] p-3 text-center rounded-r-xl ${showUsers ? "bg-gray-100" : "bg-blue-500 text-white"}`}
          onClick={handleToggle}
        >
          Create User
        </button>
      </div>

      {!showUsers ? (
        <CreateRole role="User" />
      ) : (
        <UserGrid userId={userData?._id} isSuperAdmin={false} />
      )}
    </div>
  );
};

export default AdminDashboard;
