const friendService = require('../services/friendService');

exports.addFriend = async (req, res) => {
    const { userID, friendID } = req.body;
    try {
        if (!userID || !friendID) {
            return res.status(400).json({ error: "userID and friendID are required" });
        }
        if (userID === friendID) {
            return res.status(400).json({ error: "You can't add yourself as a friend" });
        }
        if (await friendService.isFriend(userID, friendID)) {
            return res.status(400).json({ error: "You are already friends" });
        }
        const friend = await friendService.addFriend(userID, friendID);
        res.status(201).json(friend);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFriends = async (req, res) => {
    const { userID } = req.params;
    try {
        if (!userID) {
            return res.status(400).json({ error: "userID is required" });
        }
        const friends = await friendService.getFriends(userID);
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
