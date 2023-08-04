import express from "express";
import authRoute from "./auth.route.js";
import trimRequest from "trim-request";
const router = express.Router();

router.use("/auth", trimRequest.all, authRoute);
export default router;
