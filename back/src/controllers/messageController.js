const Message = require('../models/Message');

const createMessage = async (req, res) => {
  const { texte_message, expediteurID, destinataireID, conversationID } = req.body;

  try {
    if (!texte_message || !expediteurID || !destinataireID || !conversationID) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const newMessage = await Message.create({
      texte_message,
      expediteurID,
      destinataireID,
      conversationID,
      status_message: null, // sera modifié plus tard
    });

    // Renvoi du message créé en réponse
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Erreur lors de la création du message :', error);
    res.status(500).json({ error: 'Erreur lors de la création du message.' });
  }
};

module.exports = {
  createMessage
};
