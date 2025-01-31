const contactService = require("../services/contactService");

exports.createContact = async (req, res) => {
  const { userId, contactId } = req.body;
  try {
    if (!userId || !contactId) {
      return res
        .status(400)
        .json({ error: "userId and contactId are required" });
    }
    if (userId === contactId) {
      return res
        .status(400)
        .json({ error: "You can't add yourself as a contact" });
    }
    if (await contactService.isContact(userId, contactId)) {
      return res.status(400).json({ error: "You are already contacts" });
    }
    const contact = await contactService.createContact(userId, contactId);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getContacts = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }
    const contacts = await contactService.getContacts(id);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
