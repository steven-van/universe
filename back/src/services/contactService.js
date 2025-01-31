const { Op } = require("sequelize");
const Contact = require("../models/contactModel");
const User = require("../models/userModel");

exports.addContact = async (userId, contactId) => {
  const newContact = await Contact.create({
    user_id: userId,
    contact_id: contactId,
  });
  return newContact;
};

exports.getContacts = async (userId) => {
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
};

exports.isContact = async (userId, contactId) => {
  const contact = await Contact.findOne({
    where: {
      [Op.or]: [
        { user_id: userId, contact_id: contactId },
        { user_id: contactId, contact_id: userId },
      ],
    },
  });
  return contact !== null;
};
