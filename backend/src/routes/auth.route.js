import express from "express";
import {
  login,
  logout,
  onBoard,
  signup,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/onboard", authenticate, onBoard);
router.get("/me", authenticate, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
