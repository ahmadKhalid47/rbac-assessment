import CreatePost from "components/UploadPost";
import React from "react";

const UserDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <p className="text-gray-700">
        Welcome User! Here you can manage your posts and profile.
      </p>
      <CreatePost />
    </div>
  );
};

export default UserDashboard;
