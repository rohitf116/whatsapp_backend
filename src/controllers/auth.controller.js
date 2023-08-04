import createHttpError from "http-errors";
import { catchAsync } from "../utils/catchAsync.util.js";
import { AppError } from "../utils/error.utils.js";
export const register = catchAsync(async (req, res, next) => {
  res.send(req.body);
});
export const login = catchAsync(async (req, res, next) => {});
export const logout = catchAsync(async (req, res, next) => {});
export const refreshToken = catchAsync(async (req, res, next) => {});
