const express = require("express");
const contactController = require("../controllers/contactController");
const router = express.Router();

// Add contact
router.post("/contacts", contactController.createContact);

// Get contacts of a specific user
router.get("/contacts/:id", contactController.getContacts);

module.exports = router;
