import api from "utils/api";

export const superAdminTokenService = async ({token}) => {
console.log("token______________---___", token);

  try {
    const response = await api.post("/api/superAdmin/verify-token", {
      token: token,
    });

    if (response.status === 200) {
      return response.data; // Return the response data if the token is valid
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw error; // Throw the error to be handled by the component
  }
};
