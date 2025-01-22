import api from "utils/api";

export const createUserService = async (formData) => {
  try {
    const response = await api.post("/api/user/createUser", formData, {
      withCredentials: true,
    });
      alert("User Created");
    return response;
  } catch (err) {
    throw err;
  }
};

