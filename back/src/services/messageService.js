const Message = require("../models/messageModel");

exports.createMessage = async ({
  text_message,
  status_message,
  sender_id,
  receiver_id,
  conversation_id,
}) => {
  try {
    const newMessage = await Message.create({
      text_message,
      date_message: new Date(),
      status_message,
      sender_id,
      receiver_id,
      conversation_id,
    });
    return newMessage;
  } catch (error) {
    console.error("Create Message Error:", error.message);
    throw new Error("Error creating message");
  }
};

exports.getConversationMessages = async (conversationId) => {
  try {
    const messages = await Message.findAll({
      where: {
        conversation_id: conversationId,
      },
    });
    return messages;
  } catch (error) {
    console.error("Get Conversation Messages Error:", error.message);
    throw new Error("Error retrieving messages: " + error.message);
  }
};
