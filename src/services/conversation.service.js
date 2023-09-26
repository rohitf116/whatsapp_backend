import { ConverSationModel, UserModel } from "../models/index.js";
import { AppError } from "../utils/error.utils.js";

export const doesConversationExist = async (sender_id, receiver_id) => {
  let convo = await ConverSationModel.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (!convo.length) {
    return false;
  }
  convo = await UserModel.populate(convo, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });
  return convo[0];
};

export const createConversation = async (convoData) => {
  const convo = await ConverSationModel.create(convoData);
  if (!convo) {
    throw new AppError("Unable to create conversation", 400);
  }
  return convo;
};

export const populateConversation = async (
  _id,
  fieldsToPopulate,
  fieldsToRemove
) => {
  const convo = await ConverSationModel.findOne({ _id }).populate(
    fieldsToPopulate,
    fieldsToRemove
  );
  return convo;
};

export const getUserConversations = async (_id) => {
  let conversations = "";
  await ConverSationModel.find({
    users: { $elemMatch: { $eq: _id } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updateAt: -1 })
    .then(async (result) => {
      result = await UserModel.populate(result, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversations = result;
    })
    .catch((err) => {
      throw new AppError(err, 400);
    });

  return conversations;
};
