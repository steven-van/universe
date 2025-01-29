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