import express from "express";
import authRoute from "./auth.route.js";
import conversationRoutes from "./conversation.routes.js";
import trimRequest from "trim-request";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use("/auth", trimRequest.all, authRoute);
router.use(
  "/conversation",
  trimRequest.all,
  authMiddleware,
  conversationRoutes
);
export default router;
