import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
register;
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refreshtoken").get(refreshToken);
router.route("/test").get((req, res) => {
  console.log(req.user);
  res.send("From test middleware");
});

export default router;
