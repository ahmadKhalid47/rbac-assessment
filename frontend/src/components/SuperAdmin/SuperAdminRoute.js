import Loader from "components/Ui/Loader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { superAdminTokenService } from "services/superAdmin/verifyTokenService";
import AccessDenied from "./AccessDenied";
import Registration from "./Registration";

const SuperAdminRoute = () => {
  const { token } = useParams();
  console.log("route_________________",token);
  const [isAuthorized, setIsAuthorized] = useState(null);

  const verifyToken = async () => {
    try {
      const data = await superAdminTokenService({ token });
      if (data.role) {
      } else {
        setIsAuthorized(false);
      }
      setIsAuthorized(true);
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (isAuthorized === null) {
    return (
      <div className="w-[100vw] h-[100vh]">
        <Loader />
      </div>
    );
  }

  return isAuthorized ? <Registration /> : <AccessDenied />;
};

export default SuperAdminRoute;
