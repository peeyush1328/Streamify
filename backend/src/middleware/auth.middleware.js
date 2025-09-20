import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authenticate = async (req, res, next) => {
  const token = req.cookies["jwt-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized : No Token Found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized : Token Invalid" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized : User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
