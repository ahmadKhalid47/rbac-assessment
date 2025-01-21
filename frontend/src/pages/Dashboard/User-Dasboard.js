import PostGrid from "components/DisplayPosts";
import LogoutButton from "components/Logout";
import CreatePost from "components/UploadPost";
import React from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const userData = useSelector((state) => state.users);

  return (
    <div className="p-6">
      <LogoutButton />
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <p className="text-gray-700">
        Welcome User! Here you can manage your posts and profile.
      </p>
      <CreatePost />
      <PostGrid userId={userData?._id} isAdmin={false} />
    </div>
  );
};

export default UserDashboard;
