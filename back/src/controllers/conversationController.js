const conversationservice = require("../services/conversationService");

exports.getUserconversations = async (req, res) => {
    const userId = req.body; // Assure-toi de bien récupérer l'ID utilisateur
    try {
      const conversations = await conversationservice.getUserConversations(userId);
      res.status(200).json(conversations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getOrCreateConversation = async (req, res) => {
    const { user1Id, user2ID } = req.body;
    try {
      const conversation = await conversationservice.getOrCreateConversation(user1Id, user2ID);
      res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }