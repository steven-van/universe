const { Op } = require('sequelize');
const Conversation = require('../models/conversation'); // Modèle Sequelize

//get or create a conversation with 
exports.getOrCreateConversation = async (user1Id,user2ID) => {
  try {
    let conversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          { user1ID: user1Id, user2ID: user2ID },
          { user1ID: user2ID, user2ID: user1Id },
        ],
      },
    });

    // Si aucune conversation n'est trouvée, en créer une
    if (!conversation) {
      conversation = await Conversation.create({
        user1ID: user1Id,
        user2ID: user2ID,
      });
    }

    return conversation;
  } catch (error) {
    throw new Error('Error in getOrCreateConversation: ' + error.message);
  }
};

// return all user conversation in a list
exports.getAllUserConversations = async (userId) => {
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Sequelize.Op.or]: [
          { user1ID: userId },
          { user2ID: userId },
        ],
      },
    });
    return conversations; // conversation list
  } catch (error) {
    throw new Error('Error retrieving conversations: ' + error.message);
  }
};
