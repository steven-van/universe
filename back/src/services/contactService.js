const Contact = require("../models/contactModel");
const User = require("../models/userModel");

exports.addContact = async (userID, contactID) => {
    const newContact = await Contact.create({ userID, contactID });
    return newContact;
  };
  
exports.getContacts = async (userID) => {
  const contacts = await Contact.findAll({
    where: { userID },
    attributes: ['contactID'] // On récupère uniquement les contactID
  });

  const contactIDs = contacts.map(contact => contact.contactID);

  const contactUsers = await User.findAll({
    where: {
      userID: contactIDs
    },
    attributes: ['userID', 'name', 'email'] // On veut récupérer ces attributs du contact
  });

  return contactUsers;
};

exports.isContact = async (userID, contactID) => {
    const contact = await Contact.findOne({ where: { userID, contactID } });
    return contact !== null;
};