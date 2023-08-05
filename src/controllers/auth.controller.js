import createHttpError from "http-errors";
import { catchAsync } from "../utils/catchAsync.util.js";
import { AppError } from "../utils/error.utils.js";
import { userCreateValidation } from "../validations/user.validations.js";
import { createUser } from "../services/auth.service.js";
export const register = catchAsync(async (req, res, next) => {
  const result = userCreateValidation(req.body);
  const user = await createUser(result);
  res.status(201).send(user);
});
export const login = catchAsync(async (req, res, next) => {});
export const logout = catchAsync(async (req, res, next) => {});
export const refreshToken = catchAsync(async (req, res, next) => {});
