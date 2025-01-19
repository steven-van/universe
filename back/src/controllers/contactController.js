const contactService = require('../services/contactService');

exports.addContact = async (req, res) => {
    const { userID, contactID } = req.body;
    try {
        if (!userID || !contactID) {
            return res.status(400).json({ error: "userID and contactID are required" });
        }
        if (userID === contactID) {
            return res.status(400).json({ error: "You can't add yourself as a contact" });
        }
        if (await contactService.isContact(userID, contactID)) {
            return res.status(400).json({ error: "You are already contacts" });
        }
        const contact = await contactService.addContact(userID, contactID);
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getContacts = async (req, res) => {
    const { userID } = req.params;
    try {
        if (!userID) {
            return res.status(400).json({ error: "userID is required" });
        }
        const contacts = await contactService.getContacts(userID);
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
