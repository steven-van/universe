const express = require('express');
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post('/createmessage', messageController.createMessage);
router.get('/messages/:conversationId', messageController.getConversationMessages);

module.exports = router;
