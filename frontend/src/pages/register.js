import React, { useState } from "react";
import { register } from "../services/auth.service";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/slices/authSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register({ name, email, password });
    dispatch(setAuth({ token: data.token, user: data.user }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={"name"}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={"fsdf@email.com"}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={"password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
