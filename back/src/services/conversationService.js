const { Op } = require("sequelize");
const Conversation = require("../models/conversationModel"); // Modèle Sequelize
const User = require("../models/userModel");

exports.createConversation = async (user1Id, user2Id) => {
  try {
    const conversation = await Conversation.create({
      user1_id: user1Id,
      user2_id: user2Id,
    });

    return conversation;
  } catch (error) {
    throw new Error("Error in creating conversation: " + error.message);
  }
};

exports.getUserConversations = async (userId) => {
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [{ user1_id: userId }, { user2_id: userId }],
      },
    });

    const newconvs = await Promise.all(
      conversations.map(async (conversation) => {
        const contactId =
          conversation.user1_id == userId
            ? conversation.user2_id
            : conversation.user1_id;
        const user_info = await User.findOne({
          where: { user_id: contactId },
          attributes: ["user_id", "firstname", "lastname", "email"],
        });

        return {
          conversation: conversation,
          user_info: user_info,
        };
      }),
    );

    return newconvs;
  } catch (error) {
    throw new Error("Error retrieving conversations: " + error.message);
  }
};
