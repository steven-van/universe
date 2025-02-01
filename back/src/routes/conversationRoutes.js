const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");

router.get("/conversations/:id", conversationController.getUserConversations);

router.post("/conversations", conversationController.createConversation);

module.exports = router;
