const { default: AdminDashboard } = require("./Admin-Dasboard");
const { default: SuperAdminDashboard } = require("./Super-Admin-Dasboard");
const { default: UserDashboard } = require("./User-Dasboard");

const Dashboard = ({ role }) => {
  // Dashboard according to roles
  if (role === "User") {
    return <UserDashboard />;
  } else if (role === "Admin") {
    return <AdminDashboard />;
  } else if (role === "SuperAdmin") {
    return <SuperAdminDashboard />;
  }
};
export default Dashboard;
