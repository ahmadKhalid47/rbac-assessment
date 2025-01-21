import api from "utils/api";

export const createPostService = async (formDataToSend) => {
  try {
    const response = await api.post("/api/post/createPost", formDataToSend, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
