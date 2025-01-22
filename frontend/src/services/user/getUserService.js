import api from "utils/api";

export const getUserService = async ({
  currentPage,
  search,
  userId,
  viewAdmins,
}) => {
  try {
    const response = await api.get(`/api/user/getUsers`, {
      withCredentials: true,
      params: {
        page: currentPage,
        search,
        userId,
        viewAdmins,
      },
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};
