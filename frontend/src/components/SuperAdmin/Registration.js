import Loader from "components/Ui/Loader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { superAdminTokenService } from "services/superAdmin/verifyTokenService";
import api from "utils/api";

const Registration = () => {
  const { token } = useParams();

  console.log(token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(null);
  console.log(isAuthorized);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/superAdmin/register", {
        token,
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Super Admin Registration</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Registration;
