const express = require('express');
const contactController = require('../controllers/contactController');
const router = express.Router();

// Add contact 
router.post("/addContact", contactController.addContact);

// Get contacts of a specific user
router.get("/contacts/:userID", contactController.getContacts);

module.exports = router;