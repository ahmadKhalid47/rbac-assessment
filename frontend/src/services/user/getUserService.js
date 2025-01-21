import api from "utils/api";

export const getUserService = async ({
  currentPage,
  search,
  userId,
  onlyAdmins,
}) => {
  try {
    const response = await api.get(`/api/user/getUsers`, {
      withCredentials: true,
      params: {
        page: currentPage,
        search,
        userId,
        onlyAdmins,
      },
    });
    return response.data; // Return response data directly
  } catch (error) {
    throw error; // Throw the error to be handled by the component
  }
};
