import CreateRole from "components/UserRoles/CreateRole";
import React from "react";

const SuperAdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Super Admin Dashboard</h1>
      <p className="text-gray-700 mb-4">
        Welcome Super Admin! You have the highest level of access to the system.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Create Admin</h2>
      <CreateRole role="Admin" />
      <h2 className="text-2xl font-semibold mt-6 mb-4">Create User</h2>
      <CreateRole role="User" />
    </div>
  );
};

export default SuperAdminDashboard;
