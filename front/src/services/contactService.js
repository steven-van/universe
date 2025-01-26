import axios from "axios";

export const getUserContactsService = async (userId) => {
  const response = await axios.get(`http://localhost:8000/contacts/${userId}`);
  return response.data
};
