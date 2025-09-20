import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token", authenticate, getStreamToken);

export default router;
