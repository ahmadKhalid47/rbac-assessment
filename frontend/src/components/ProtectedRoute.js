import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const token = "token";
  console.log(token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role; // Extract user role from the JWT token

    if (role && userRole === role) {
      // Redirect to a default dashboard if role doesn't match
      return <Component />;
    } else {
      return <Navigate to="/Login" />;
    }
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
