import PostGrid from "components/Posts/DisplayPosts";
import CreatePost from "components/Posts/CreatePost";
import React from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const userData = useSelector((state) => state.users);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <p className="text-gray-700">
        Welcome User! Here you can manage your posts.
      </p>
      <CreatePost />
      <PostGrid userId={userData?._id} isAdmin={false} />
    </div>
  );
};

export default UserDashboard;
