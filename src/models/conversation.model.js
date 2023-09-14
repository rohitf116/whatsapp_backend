import { Schema, model } from "mongoose";

import { pleaseProvideConversationName } from "../messages/conversation.messages.js";
import { ObjectId } from "../utils/mongoose.util.js";

const conversationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, pleaseProvideConversationName],
      trim: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
      required: true,
    },
    users: [{ type: ObjectId, ref: "User" }],
    latestMessage: {
      type: ObjectId,
      ref: "Message",
    },
    admin: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Conversation", conversationSchema);
