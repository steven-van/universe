const { Op } = require('sequelize');
const Conversation = require('../models/conversationModel'); // Modèle Sequelize
const User = require("../models/userModel");

exports.getOrCreateConversation = async (user1_id,user2_id) => {
  try {
    let conversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          { user1_id: user1_id, user2_id: user2_id },
          { user1_id: user2_id, user2_id: user1_id },
        ],
      },
    });

    // Si aucune conversation n'est trouvée, en créer une
    if (!conversation) {
      conversation = await Conversation.create({
        user1_id: user1_id,
        user2_id: user2_id,
      });
    }

    return conversation;
  } catch (error) {
    throw new Error('Error in getOrCreateConversation: ' + error.message);
  }
};

// return all user conversation in a list

exports.getUserConversations = async (userId) => {
  
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { user1_id: userId },
          { user2_id: userId },
        ],
      },
    }
  );

  const newconvs = await Promise.all(conversations.map(async (conversation) => {
    const contactId = conversation.user1_id == userId ? conversation.user2_id : conversation.user1_id;
    const user_info = await User.findOne({
      where: { user_id: contactId },
      attributes: ['firstname', 'lastname', 'email']
    });
  
    return {
      conversation: conversation,
      user_info: user_info
    };
  }));
  
  console.log(newconvs);
  return newconvs;
  
  } catch (error) {
    throw new Error('Error retrieving conversations: ' + error.message);
  }
};
