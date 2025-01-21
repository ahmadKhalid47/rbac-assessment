import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_id, setEmail, setName, setRole } from "store/slices/userSlice";
import Navbar from "./Common/Navbar";
import api from "utils/api";
import { verifyTokenService } from "services/auth/verifyTokenService";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users);

  const verifyToken = async () => {
    try {
      const data = await verifyTokenService();
      if (data.role) {
        dispatch(setRole(data.role));
        dispatch(setName(data.name));
        dispatch(setEmail(data.email));
        dispatch(set_id(data._id));
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [dispatch, userData?.role]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? (
    <>
      <Navbar />
      <Component role={userData?.role} {...rest} />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
