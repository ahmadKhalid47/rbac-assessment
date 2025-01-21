import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_id, setEmail, setName, setRole } from "store/slices/userSlice";
import Navbar from "./Common/Navbar";
import { verifyTokenService } from "services/auth/verifyTokenService";
import Loader from "./Common/Loader";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const  {_id}  = useParams();
  console.log(_id);

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
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loader />
      </div>
    );
  }

  return isAuthorized ? (
    <>
      <Navbar />
      <Component role={userData?.role} {...rest} _id={_id} />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
