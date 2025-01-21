import api from "utils/api";

export const getPostService = async ({
  currentPage,
  search,
  userId,
  isAdmin,
}) => {
  try {
    const response = await api.get(`/api/post/getPosts`, {
      withCredentials: true,
      params: {
        page: currentPage,
        search,
        userId,
        isAdmin,
      },
    });
    return response.data; // Return response data directly
  } catch (error) {
    throw error; // Throw the error to be handled by the component
  }
};
