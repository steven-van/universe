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
  const { user1_id, user2_id } = req.body;
  try {
    const conversation = await conversationservice.createConversation(
      user1_id,
      user2_id,
    );
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
