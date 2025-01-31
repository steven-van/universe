const Message = require("../models/messageModel");

exports.createmessage = async ({ text_message,status_message,sender_id, receiver_id, conversation_id }) => {
    
    const newMessage = await Message.create({
        text_message,
        date_message: new Date(),
        status_message,
        sender_id,
        receiver_id,
        conversation_id,
      });

    return newMessage;
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
        throw new Error('Error retrieving messages: ' + error.message);
    }
}