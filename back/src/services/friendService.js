const Friend = require("../models/friendModel");
const User = require("../models/userModel");

exports.addFriend = async (userID, friendID) => {
    const newFriend = await Friend.create({ userID, friendID });
    return newFriend;
  };
  
exports.getFriends = async (userID) => {
    const friends = await Friend.findAll({ where: { userID }, include: [
        {
          model: User,
          as: 'friendUser',
          attributes: ['userID', 'name', 'email'] // On veut récupérer ces attributs de l'utilisateur
        }
      ]});
    return friends;
};

exports.isFriend = async (userID, friendID) => {
    const friend = await Friend.findOne({ where: { userID, friendID } });
    return friend !== null;
};