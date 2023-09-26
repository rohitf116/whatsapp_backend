import express from "express";

import {
  createOrOpenConversation,
  getConversations,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.route("/").post(createOrOpenConversation).get(getConversations);

export default router;
