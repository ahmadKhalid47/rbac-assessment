import CreateRole from "components/Users/CreateRole";
import PostGrid from "components/Posts/DisplayPosts";
import React from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const userData = useSelector((state) => state.users);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-gray-700">
        Welcome Admin! Here you can manage users.
      </p>
      <CreateRole role="User" />
      <PostGrid userId={userData?._id} isAdmin={true} />
    </div>
  );
};

export default AdminDashboard;
