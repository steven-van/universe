const Message = require("../models/messageModel");

exports.createmessage = async ({ text_message,status_message,senderID, recipientID, conversationID }) => {
    
    const newMessage = await Message.create({
        text_message,
        date_message: new Date(),
        status_message,
        senderID,
        recipientID,
        conversationID,
      });

    return newMessage;
  };