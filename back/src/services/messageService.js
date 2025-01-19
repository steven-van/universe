const Message = require("../models/messageModel");

exports.createmessage = async ({ texte_message,status_message,expediteurID, destinataireID, conversationID }) => {
    
    const newMessage = await Message.create({
        texte_message,
        date_message: new Date(),
        status_message,
        expediteurID,
        destinataireID,
        conversationID: null,
      });

    return newMessage;
  };