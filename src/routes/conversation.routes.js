import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createOrOpenConversation,
  getConversations,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.route("/").post(createOrOpenConversation).get(getConversations);

export default router;
