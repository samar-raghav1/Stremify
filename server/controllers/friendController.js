import FriendRequest from "../models/FriendRequest.js";

export const deleteFriends=async (req, res) => {
  const { senderId, recipientId } = req.params;
  try {
    const result = await FriendRequest.deleteOne({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId }
      ]
    });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Friendship deleted' });
    }
    else {
      res.status(404).json({ message: 'Friendship not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

