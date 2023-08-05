import Joi from "joi";
export const UserCreateJoiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  picture: Joi.string().optional().empty(""),
  status: Joi.string().optional().max(50).empty(""),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
}).unknown(false);
