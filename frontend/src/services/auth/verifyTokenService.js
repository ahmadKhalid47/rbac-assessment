import api from "utils/api";

export const verifyTokenService = async () => {
  try {
    const response = await api.get("/api/auth/verify-token", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw error; 
  }
};
