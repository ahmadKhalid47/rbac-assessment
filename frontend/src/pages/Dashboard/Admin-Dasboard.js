import CreateRole from "components/Create-Role";
import PostGrid from "components/DisplayPosts";
import React from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const userData = useSelector((state) => state.users);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">
        Welcome Admin! Here you can manage all users and posts.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Create User</h2>
      <CreateRole role="User" />
      <PostGrid userId={userData?._id} isAdmin={true} />
    </div>
  );
};

export default AdminDashboard;
