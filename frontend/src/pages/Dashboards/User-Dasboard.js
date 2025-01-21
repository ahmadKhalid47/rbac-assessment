import PostGrid from "components/Posts/DisplayPosts";
import CreatePost from "components/Posts/CreatePost";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const userData = useSelector((state) => state.users);
  const [showPosts, setShowPosts] = useState(false);

  const handleToggle = () => {
    setShowPosts(!showPosts);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-1">User Dashboard</h1>
      <p className="text-gray-700">
        Welcome User! Here you can manage your posts.
      </p>

      <div className="w-full h-fit flex my-6 text-2xl font-bold p-2 justify-around ">
        <button
          className={`w-[49%] p-3 text-center rounded-l-xl ${!showPosts ? "bg-gray-100" : "bg-blue-500 text-white"}`}
          onClick={handleToggle}
        >
          All Posts
        </button>
        <button
          className={`w-[49%] p-3 text-center rounded-r-xl ${showPosts ? "bg-gray-100" : "bg-blue-500 text-white"}`}
          onClick={handleToggle}
        >
          Create Post
        </button>
      </div>
      {!showPosts ? (
        <CreatePost />
      ) : (
        <PostGrid userId={userData?._id} isAdmin={false} />
      )}
    </div>
  );
};

export default UserDashboard;
