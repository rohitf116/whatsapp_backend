import { UserModel } from "../models/index.js";
import { catchAsync } from "../utils/catchAsync.util.js";
import { AppError } from "../utils/error.utils.js";

export const createUser = async (data) => {
  const user = await UserModel.create(data);

  return user;
};
