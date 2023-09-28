import { MessageModel } from "../models/index.js";
import { AppError } from "../utils/error.utils.js";

export const createMessage = async (messageData) => {
  const newMessage = await MessageModel.create(messageData);
  if (!newMessage) {
    throw new AppError("Unable to create message", 400);
  }
  return newMessage;
};

export const populateMessage = async (_id) => {
  const message = await MessageModel.findOne(_id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "User",
    })
    .populate({
      path: "conversation",
      select: "name isGroup users",
      model: "Conversation",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "User",
      },
    });
  //   console.log({ message });
  if (!message) throw new AppError("Unableto create message", 400);
  return message;
};

export const findOneMessage = async (id) => {
  const message = await MessageModel.findOne({ _id: id })
    .populate("sender", "name picture email status")
    .populate("conversation");
  if (!message) {
    throw new AppError("Message not found", 404);
  }
  return message;
};
