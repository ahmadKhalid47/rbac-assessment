import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { set_id, setEmail, setName, setRole } from "store/slices/userSlice";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/verify-token", {
          withCredentials: true, // Ensure the HTTP-only cookies are sent
        });

        if (response.status === 200) {
          const data = response.data;
          if (data.role) {
            dispatch(setRole(data.role));
            dispatch(setName(data.name));
            dispatch(setEmail(data.email));
            dispatch(set_id(data._id));
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
  }, [dispatch, userData?.role]);

  if (isAuthorized === null) {
    // Optional: Add a loading spinner while verifying the token
    return <div>Loading...</div>;
  }

  return isAuthorized ? (
    <Component role={userData?.role} {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
