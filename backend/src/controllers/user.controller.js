import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = req.user;
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: userId } },
        { _id: { $nin: user.friends } },
        { isOnboarded: true },
      ],
    }).select("fullName email profilePic nativeLanguage learningLanguage");
    res.status(200).json(recommendedUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("friends").populate({
      path: "friends",
      select: "fullName profilePic nativeLanguage learningLanguage",
    });
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const recipientId = req.params.id;
    if (senderId === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself." });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient user not found." });
    }
    if (recipient.friends.includes(senderId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user." });
    }
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
      ],
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A friend request already exists between you two." });
    }
    const friendRequest = await FriendRequest.create({
      sender: senderId,
      recipient: recipientId,
    });
    res.status(201).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestId = req.params.id;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found." });
    }
    if (friendRequest.recipient.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request." });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();
    await User.findByIdAndUpdate(userId, {
      $addToSet: { friends: friendRequest.sender },
    });
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: userId },
    });
    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendRequests = await FriendRequest.find({
      recipient: userId,
      status: "pending",
    }).populate(
      "sender",
      "fullName nativeLanguage learningLanguage profilePic"
    );
    const acceptedRequests = await FriendRequest.find({
      sender: userId,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");
    res.status(200).json({ friendRequests, acceptedRequests });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOutgoingFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const outgoingRequests = await FriendRequest.find({
      sender: userId,
      status: "pending",
    }).populate(
      "recipient",
      "fullName nativeLanguage learningLanguage profilePic"
    );
    res.status(200).json(outgoingRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
