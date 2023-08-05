import { UserCreateJoiSchema } from "../joiSchema/index.js";
import { AppError } from "../utils/error.utils.js";
import { getError } from "../utils/getErrorMessage.js";
import { validator } from "./index.js";

export const userCreateValidation = (payload) => {
  const validateSignUp = validator(UserCreateJoiSchema);
  const { error, value } = validateSignUp(payload);
  if (error) {
    throw new AppError(getError(error), 400);
  }
  return value;
};
