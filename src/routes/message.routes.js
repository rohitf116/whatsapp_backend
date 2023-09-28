import express from "express";

import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/").post(sendMessage);
router.route("/:id").get(getMessages);

export default router;
