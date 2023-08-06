import dotenv from "dotenv";
dotenv.config();

export const {
  DEFAULT_STATUS,
  DEFAULT_PICTURE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;
