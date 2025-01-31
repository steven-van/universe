const messageService = require("../services/messageService");

exports.createMessage = async (req, res) => {
  const { text_message, sender_id, receiver_id, conversation_id } = req.body;

  try {
    if (!text_message || !sender_id || !receiver_id || !conversation_id) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const newMessage = messageService.createmessage({
      text_message,
      sender_id,
      receiver_id,
      conversation_id,
    });

    // if message is created, send 201 status code
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Erreur lors de la création du message :", error);
    res.status(500).json({ error: "Erreur lors de la création du message." });
  }
};

exports.getConversationMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages =
      await messageService.getConversationMessages(conversationId);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des messages." });
  }
};
