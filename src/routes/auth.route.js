import express from "express";
import { register } from "../controllers/auth.controller.js";

const router = express.Router();
register;
router.route("/register").post(register);

export default router;
