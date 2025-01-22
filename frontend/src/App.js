import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboards/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPosts from "pages/UserPosts";
import SuperAdminRoute from "components/SuperAdmin/SuperAdminRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/SuperAdminRegistration/:token"
            element={<SuperAdminRoute />}
          />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route
            path="/dashboard/Posts/:_id"
            element={<ProtectedRoute component={UserPosts} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
