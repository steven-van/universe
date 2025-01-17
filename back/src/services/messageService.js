exports.createmessage = async ({ texte_message, expediteurID, destinataireID, conversationID }) => {
    
    const newMessage = await Message.create({
        texte_message,
        expediteurID,
        destinataireID,
        conversationID,
        status_message: null, // will be modified later
      });

    return newMessage;
  };