import createHttpError from "http-errors";
import { catchAsync } from "../utils/catchAsync.util.js";
import { AppError } from "../utils/error.utils.js";
import {
  userCreateValidation,
  userLoginValidate,
} from "../validations/user.validations.js";
import { createUser, userSign } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../configs/index.js";
import {
  loginUserResponse,
  refreshResponse,
  registerUserResponse,
} from "../serialize/user.serialize.js";
import { responseJson } from "../serialize/index.js";
import { UserModel } from "../models/index.js";
import { loggedOut } from "../messages/auth.messages.js";
import logger from "../configs/logger.config.js";
import { findUserById } from "../services/user.service.js";
import { userNotFound } from "../messages/user.messages.js";

export const register = catchAsync(async (req, res, next) => {
  const result = userCreateValidation(req.body);
  const user = await createUser(result);
  const access_token = await generateToken(
    { userId: user._id, tokenVersion: user.tokenVersion },
    "1d",
    ACCESS_TOKEN_SECRET
  );
  const refresh_token = await generateToken(
    { userId: user._id, tokenVersion: user.tokenVersion },
    "30d",
    REFRESH_TOKEN_SECRET
  );
  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/v1/auth/refreshtoken",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  const respone = registerUserResponse(user, access_token);
  responseJson(res, 201, respone);
});
export const login = catchAsync(async (req, res, next) => {
  const result = await userLoginValidate(req.body);
  const user = await userSign(result);

  const access_token = await generateToken(
    { userId: user._id, tokenVersion: user.tokenVersion },
    "1d",
    ACCESS_TOKEN_SECRET
  );
  const refresh_token = await generateToken(
    { userId: user._id, tokenVersion: user.tokenVersion },
    "30d",
    REFRESH_TOKEN_SECRET
  );
  const response = loginUserResponse(user, access_token);
  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/v1/auth/refreshtoken",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  responseJson(res, 200, response);
});
export const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("refreshtoken", { path: "/api/v1/auth/refreshtoken" });
  responseJson(res, 200, { message: loggedOut });
});
export const refreshToken = catchAsync(async (req, res, next) => {
  const refreshToken = req?.cookies?.refreshtoken || null;
  if (!refreshToken) {
    throw new AppError("Unauthenticated", 401);
  }
  const check = await verifyToken(refreshToken);

  const user = await findUserById(check.userId);
  if (!user) {
    throw new AppError(userNotFound, 404);
  }
  const access_token = await generateToken(
    { userId: user._id, tokenVersion: user.tokenVersion },
    "1d",
    ACCESS_TOKEN_SECRET
  );
  const response = refreshResponse(user, access_token);
  responseJson(res, 200, response);
});
