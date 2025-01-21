import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// Import Components
// import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import UserDashboard from "./pages/User-Dasboard";
import AdminDashboard from "./pages/Admin-Dasboard";
import SuperAdminDashboard from "./pages/Super-Admin-Dasboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}

          {/* Protected Routes for User, Admin, Super Admin */}
          <Route
            path="/user-dashboard"
            element={<ProtectedRoute role="user" component={UserDashboard} />}
          />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute role="admin" component={AdminDashboard} />}
          />
          <Route
            path="/super-admin-dashboard"
            element={
              <ProtectedRoute
                role="superAdmin"
                component={SuperAdminDashboard}
              />
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
