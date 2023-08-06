import { verify } from "../utils/token.util.js";
import { REFRESH_TOKEN_SECRET } from "../configs/index.js";
import { sign } from "../utils/token.util.js";
import logger from "../configs/logger.config.js";

export const generateToken = async (payload, expiresIn, secret) => {
  const token = await sign(payload, expiresIn, secret);
  return token;
};
export const verifyToken = async (data) => {
  let check = await verify(data, REFRESH_TOKEN_SECRET);
  logger.info(`${check} is check`);
  return check;
};
