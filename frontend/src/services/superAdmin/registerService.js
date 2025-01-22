import api from "utils/api";

export const verifyTokenService = async ({ name, email, password }) => {
  console.log("name____--------___", { name, email, password });

  try {
    const response = await api.post("/api/superAdmin/verify-token", {
      name,
      email,
      password,
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
