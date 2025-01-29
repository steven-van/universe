const { Op } = require('sequelize');
const Conversation = require('../models/conversation'); // Modèle Sequelize

//get or create a conversation with 
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
        [Sequelize.Op.or]: [
          { user1_id: userId },
          { user2_id: userId },
        ],
      },
    });
    return conversations; // conversation list
  } catch (error) {
    throw new Error('Error retrieving conversations: ' + error.message);
  }
};
