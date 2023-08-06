import jwt from "jsonwebtoken";
import { AppError } from "./error.utils.js";
import logger from "../configs/logger.config.js";

export const sign = async (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (error, token) => {
      if (error) {
        logger.error(error);
        reject(error);
      }
      resolve(token);
    });
  });
};

export const verify = async (data, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(data, secret, (error, payload) => {
      if (error) {
        logger.error(error);
        resolve(null);
      } else {
        resolve(payload);
      }
    });
  });
};
