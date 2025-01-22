import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserService } from "services/user/getUserService";

const UserGrid = ({ userId, onlyAdmins }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    try {
      const data = await getUserService({
        currentPage,
        search,
        userId,
        onlyAdmins,
      });
      console.log(data);

      setUsers(data.users);
      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, userId, onlyAdmins]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <div key={user?._id} className="border p-4 rounded shadow-md">
            <h3 className="mt-4 font-bold text-lg">Name: {user?.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Email: {user?.email}</p>
            <div className="w-full flex justify-between">
              <p className="text-sm text-gray-500 mt-1">Role: {user?.role}</p>
              {user?.role === "User" && (
                <Link
                  to={`Posts/${user._id}`}
                  className="text-sm font-bold  mt-1 text-blue-700 hover:underline"
                >
                  View Posts
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(totalUsers / 6))].map((_, index) => (
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

export default UserGrid;
