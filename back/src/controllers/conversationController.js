const conversationservice = require("../services/conversationService");

exports.getUserConversations = async (req, res) => {
  const { id } = req.params;
  try {
    const conversations =
      await conversationservice.getUserConversations(id);
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createConversation = async (req, res) => {
  const { user1Id, user2Id } = req.body;
  try {
    const conversation = await conversationservice.createConversation(
      user1Id,
      user2Id,
    );
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
