import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setemail] = useState("superAdmin@gmail.com");
  const [password, setPassword] = useState("fsdfs");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login",
        { email, password },
        { withCredentials: true } // Send cookies
      );
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response?.data || "Error occurred");
      console.log(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", padding: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            email:
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
