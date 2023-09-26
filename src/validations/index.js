import mongoose from "mongoose";
import { AppError } from "../utils/error.utils.js";
const ObjectId = mongoose.isValidObjectId;
export const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: true, stripUnknown: true });
export const isValidObjectid = (id) => {
  if (!id) {
    throw new AppError("id cannot be empty", 400);
  }
  if (!ObjectId(id)) {
    throw new AppError("Invalid object id", 400);
  }
  return true;
};
