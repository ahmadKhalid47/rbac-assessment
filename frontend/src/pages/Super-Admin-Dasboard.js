import CreateUserForm from "components/Create-Admin";
import React from "react";

const SuperAdminDashboard = () => {
  return (
    <div>
      <h1>Super Admin Dashboard</h1>
      <p>
        Welcome Super Admin! You have the highest level of access to the system.
      </p>

      <CreateUserForm />
      
    </div>
  );
};

export default SuperAdminDashboard;
