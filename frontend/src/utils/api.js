import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://127.0.0.1:5000", // Use environment variable for flexibility
});

export default api;
