import axios from "axios";

export const getConversationMessageService = async (conversationId) => {
  const response = await axios.get(`http://localhost:8000/messages/${conversationId}`);
  return response.data
};
