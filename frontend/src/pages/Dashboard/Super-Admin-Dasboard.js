import CreateRole from "components/Create-Role";
import React from "react";

const SuperAdminDashboard = () => {
  return (
    <div>
      <h1>Super Admin Dashboard</h1>
      <p>
        Welcome Super Admin! You have the highest level of access to the system.
      </p>
      <h2>Create Admin</h2>
      <CreateRole role={"Admin"} />
      <h2>Create User</h2>
      <CreateRole role={"User"} />
    </div>
  );
};

export default SuperAdminDashboard;
