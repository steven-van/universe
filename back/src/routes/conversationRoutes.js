const express = require('express');
const router = express.Router();
const conversationController = require("../controllers/conversationController");

router.get("/conversations/:userId", conversationController.getUserconversations);

module.exports = router;
