const contactService = require("../services/contactService");

exports.addContact = async (req, res) => {
  const { user_id, contact_id } = req.body;
  try {
    if (!user_id || !contact_id) {
      return res
        .status(400)
        .json({ error: "user_id and contact_id are required" });
    }
    if (user_id === contact_id) {
      return res
        .status(400)
        .json({ error: "You can't add yourself as a contact" });
    }
    if (await contactService.isContact(user_id, contact_id)) {
      return res.status(400).json({ error: "You are already contacts" });
    }
    const contact = await contactService.addContact(user_id, contact_id);
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
