import { Schema, model } from "mongoose";

import { ObjectId } from "../utils/mongoose.util.js";

const messageSchema = new Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: { type: ObjectId, ref: "Conversation" },
    files: [],
  },
  { timestamps: true }
);

export default model("Message", messageSchema);
