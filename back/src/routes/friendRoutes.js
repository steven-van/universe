const express = require('express');
const friendController = require('../controllers/friendController');
const router = express.Router();

// Add friend 
router.post("/addFriend", friendController.addFriend);

// Get friends of a specific user
router.get("/friends/:userID", friendController.getFriends);

module.exports = router;