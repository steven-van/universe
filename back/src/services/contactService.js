const { Op } = require("sequelize");
const Contact = require("../models/contactModel");
const User = require("../models/userModel");

exports.createContact = async (userId, contactId) => {
  try {
    const newContact = await Contact.create({
      user_id: userId,
      contact_id: contactId,
    });
    return newContact;
  } catch (error) {
    console.error("Create Contact Error:", error.message);
    throw new Error("Error creating contact");
  }
};

exports.getContacts = async (userId) => {
  try {
    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [{ user_id: userId }, { contact_id: userId }],
      },
      attributes: ["user_id", "contact_id"],
    });

    const contactIds = contacts.map((contact) => {
      return contact.user_id == userId ? contact.contact_id : contact.user_id;
    });

    const contactUsers = await User.findAll({
      where: {
        user_id: contactIds,
      },
      attributes: [
        "user_id",
        "firstname",
        "lastname",
        "email",
        "birthday",
        "phone",
      ],
    });

    return contactUsers;
  } catch (error) {
    console.error("Get Contacts Error:", error.message);
    throw new Error("Error fetching contacts");
  }
};

exports.isContact = async (userId, contactId) => {
  try {
    const contact = await Contact.findOne({
      where: {
        [Op.or]: [
          { user_id: userId, contact_id: contactId },
          { user_id: contactId, contact_id: userId },
        ],
      },
    });
    return contact !== null;
  } catch (error) {
    console.error("Is Contact Error:", error.message);
    throw new Error("Error checking if contact exists");
  }
};
