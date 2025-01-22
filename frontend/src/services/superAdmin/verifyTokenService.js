import api from "utils/api";

export const verifyTokenService = async ({ token }) => {
  console.log("token______________---___", token);

  try {
    const response = await api.post("/api/superAdmin/verify-token", {
      token: token,
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
