const { Op } = require("sequelize");
const Contact = require("../models/contactModel");
const User = require("../models/userModel");

exports.addContact = async (userID, contactID) => {
    const newContact = await Contact.create({ userID, contactID });
    return newContact;
  };
  
exports.getContacts = async (userID) => {
  const contacts = await Contact.findAll({
    where: {
      [Op.or]: [
        { userID: userID }, // Matches if userID is userID
        { contactID: userID }, // Matches if userID is contactID
      ],
    },
    attributes: ['userID', 'contactID']
  });

  const contactIDs = contacts.map(contact => {
    return contact.userID == userID ? contact.contactID : contact.userID;
  }) // Only retrieves the ID that is different from userID passed in parameter

  const contactUsers = await User.findAll({
    where: {
      userID: contactIDs
    },
    attributes: ['userID', 'name', 'email'] // Only retrieves userID, name, email
  });

  return contactUsers;
};

exports.isContact = async (userID, contactID) => {
    const contact = await Contact.findOne({ where: { userID, contactID } });
    return contact !== null;
};