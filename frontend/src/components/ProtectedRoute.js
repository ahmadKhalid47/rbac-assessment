import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/verify-token", {
          withCredentials: true, // Ensure the HTTP-only cookies are sent
        });

        if (response.status === 200) {
          const data = response.data;
          if (data.role) {
            setRole(data.role);
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthorized(false);
      }
    };

    verifyToken();
  }, [role]);

  if (isAuthorized === null) {
    // Optional: Add a loading spinner while verifying the token
    return <div>Loading...</div>;
  }

  return isAuthorized ? (
    <Component role={role} {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
