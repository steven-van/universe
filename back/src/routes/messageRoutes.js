const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/messageController');
const Message = require('../models/Message');

router.post('/messages', createMessage);

module.exports = router;
