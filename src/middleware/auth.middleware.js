import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.util.js";
import { AppError } from "../utils/error.utils.js";
import { ACCESS_TOKEN_SECRET } from "../configs/index.js";
import logger from "../configs/logger.config.js";

export const authMiddleware = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError("Unauthorized", 401);
  }
  const bearerToken = authorization.split(" ")[1] || null;
  if (!bearerToken) {
    throw new AppError("Unauthorized", 401);
  }
  jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      throw new AppError("Unauthorized", 401);
      return;
    }
    req.user = payload;
    next();
  });
});
