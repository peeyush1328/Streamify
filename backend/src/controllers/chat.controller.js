import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const userId = req.user.id;
    const token = generateStreamToken(userId);
    if (!token) {
      return res.status(500).json({ message: "Could not generate token" });
    }
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
