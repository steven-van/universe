import axios from "axios";

export const getUserConversationsService = async (userId) => {
  const response = await axios.get(`http://localhost:8000/conversations/${userId}`);
  return response.data
};
