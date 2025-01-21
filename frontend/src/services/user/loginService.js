import api from "utils/api";

export const loginService = async (email, password) => {
  try {
    const response = await api.post(
      "/api/user/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
