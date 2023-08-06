import { UserModel } from "../models/index.js";
import { catchAsync } from "../utils/catchAsync.util.js";
import { AppError } from "../utils/error.utils.js";
import * as bcrypt from "bcrypt";
export const createUser = async (data) => {
  const user = await UserModel.create(data);
  return user;
};

export const userSign = async (data) => {
  const user = await UserModel.findOne({ email: data.email.toLowerCase() });
  if (!user) {
    throw new AppError("Invalid creditialtils", 401);
  }
  const isMath = await bcrypt.compare(data.password, user.password);
  if (!isMath) {
    throw new AppError("Invalid creditialtils", 401);
  }
  return user;
};
