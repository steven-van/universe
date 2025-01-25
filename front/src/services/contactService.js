import axios from "axios";

export const getUserContactsService = async (userID) => {
  const response = await axios.get(`http://localhost:8000/contacts/${userID}`);
  return response.data
};
