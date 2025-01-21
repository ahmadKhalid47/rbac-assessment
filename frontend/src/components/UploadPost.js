import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const userData = useSelector((state) => state.users);
  console.log(userData);
  console.log(
    "userData?_id_______________________________________",
    userData?._id
  );
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: "",
    author: userData?._id, // Replace with actual author ID in a real app
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/posts/create",
        formData
      );
      setMessage(response.data.message);
      setFormData({
        title: "",
        content: "",
        thumbnail: "",
        author: userData?._id,
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Post
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail URL
            </label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
          {message && (
            <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
