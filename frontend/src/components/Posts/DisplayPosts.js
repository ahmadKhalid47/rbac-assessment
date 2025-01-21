import React, { useState, useEffect } from "react";
import { getPostService } from "services/post/getPostService";

const PostGrid = ({ userId, isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = async () => {
    try {
      const data = await getPostService({
        currentPage,
        search,
        userId,
        isAdmin,
      });
      setPosts(data.posts);
      setTotalPosts(data.totalPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, search, userId, isAdmin]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded shadow-md">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-4 font-bold text-lg">{post.title}</h3>
            <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500 mt-2">By {post.author.name}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(totalPosts / 10))].map((_, index) =>
         (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
