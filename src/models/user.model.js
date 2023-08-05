import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import {
  emailIsAlreadyInUse,
  maxPasswordLen,
  minPasswordLen,
  pleaseProvideEmail,
  pleaseProvideName,
  pleaseProvidePassword,
} from "../messages/user.messages.js";
import { AppError } from "../utils/error.utils.js";
import { DEFAULT_PICTURE, DEFAULT_STATUS } from "../configs/index.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, pleaseProvideName],
    },
    email: {
      type: String,
      required: [true, pleaseProvideEmail],
      unique: [true, emailIsAlreadyInUse],
      lowercase: true,
    },
    picture: {
      type: String,
      default: DEFAULT_PICTURE,
    },
    status: {
      type: String,
      default: DEFAULT_STATUS,
    },
    password: {
      type: String,
      required: [true, pleaseProvidePassword],
      minLength: [6, minPasswordLen],
      maxLength: [128, maxPasswordLen],
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("email")) {
    const emailExists = await this.constructor.findOne({ email: this.email });
    if (emailExists) {
      throw new AppError(emailIsAlreadyInUse, 409);
    }
  }

  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.tokenVersion += 1;
      this.password = hashedPassword;
    } catch (error) {
      throw new AppError("Password encryption failed.", 500);
    }
  }
  next();
});
export default model("User", userSchema);
