import api from "utils/api";

export const logoutService = async () => {
  try {
    const response = await api.post("/api/user/logout");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
