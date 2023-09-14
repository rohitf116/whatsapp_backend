import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { createOrOpenConversation } from "../controllers/conversation.controller.js";

const router = express.Router();

router.route("/").post(createOrOpenConversation);

export default router;
