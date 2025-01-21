import CreateRole from "components/Create-Role";
import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin! Here you can manage all users and posts.</p>
      {/* Add admin-specific content like user management, post management, etc. */}
        <h2>Create User</h2>
        <CreateRole role={"User"} />
    </div>
  );
};

export default AdminDashboard;
