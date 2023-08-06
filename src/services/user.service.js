import UserModel from "../models/user.model.js";

export const findUserById = async (_id) => {
  const user = await UserModel.findOne({ _id });
  return user;
};
