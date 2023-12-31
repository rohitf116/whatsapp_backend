import Joi from "joi";
export const UserCreateJoiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  picture: Joi.string().optional().empty(""),
  status: Joi.string().optional().max(50).empty(""),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
}).unknown(false);

export const UserLoginJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
}).unknown(false);
