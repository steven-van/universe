const Friend = require("../models/friendModel");
const User = require("../models/userModel");

exports.addFriend = async (userID, friendID) => {
    const newFriend = await Friend.create({ userID, friendID });
    return newFriend;
  };
  
exports.getFriends = async (userID) => {
  const friends = await Friend.findAll({
    where: { userID },
    attributes: ['friendID'] // On récupère uniquement les friendID
  });

  const friendIDs = friends.map(friend => friend.friendID);

  const friendUsers = await User.findAll({
    where: {
      userID: friendIDs
    },
    attributes: ['userID', 'name', 'email'] // On veut récupérer ces attributs de l'ami
  });

  return friendUsers;
};

exports.isFriend = async (userID, friendID) => {
    const friend = await Friend.findOne({ where: { userID, friendID } });
    return friend !== null;
};