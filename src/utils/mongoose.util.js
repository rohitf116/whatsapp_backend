import { Schema, isValidObjectId } from "mongoose";
export const ObjectId = Schema.Types.ObjectId;
export const isObjectid = (id) => {
  const ObjectId = isValidObjectId;
  if (!ObjectId(id)) {
    throw new AppError("Invalid object id", 400);
  }
  return id;
};
