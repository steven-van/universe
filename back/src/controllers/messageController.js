const messageService = require('../services/messageService');

exports.createMessage = async (req, res) => {
  const { texte_message, expediteurID, destinataireID, conversationID } = req.body;

  try {
    if (!texte_message || !expediteurID || !destinataireID || !conversationID) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const newMessage = messageService.createmessage({ texte_message, expediteurID, destinataireID, conversationID });

    // if message is created, send 201 status code
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Erreur lors de la création du message :', error);
    res.status(500).json({ error: 'Erreur lors de la création du message.' });
  }
};
