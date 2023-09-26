import { catchAsync } from "../utils/catchAsync.util.js";
import { responseJson } from "../serialize/index.js";
import {
  createOrOpenConversationRespone,
  fetchedConversationRespone,
} from "../serialize/conversation.serialize.js";
import { isValidObjectid } from "../validations/index.js";
import {
  createConversation,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} from "../services/conversation.service.js";
import { findUserById } from "../services/user.service.js";
import { AppError } from "../utils/error.utils.js";
export const createOrOpenConversation = catchAsync(async (req, res, next) => {
  const sender_id = req.user.userId;
  const { receiver_id } = req.body;
  isValidObjectid(receiver_id);
  const convoExist = await doesConversationExist(sender_id, receiver_id);
  if (convoExist) {
    const response = createOrOpenConversationRespone({
      convoExist,
    });
    return responseJson(res, 200, response);
  }
  const receiver_user = await findUserById(receiver_id);
  if (!receiver_user) {
    throw new AppError("User not found", 404);
  }
  let convoData = {
    name: receiver_user.name,
    isGroup: false,
    users: [sender_id, receiver_id],
  };
  const newConvo = await createConversation(convoData);
  const populatedConvo = await populateConversation(
    newConvo._id,
    "users",
    "-password"
  );
  const response = createOrOpenConversationRespone({
    convoExist: populatedConvo,
  });
  responseJson(res, 201, response);
});

export const getConversations = catchAsync(async (req, res, next) => {
  const conversation = await getUserConversations(req.user.userId);
  const response = fetchedConversationRespone(conversation);
  responseJson(res, 200, response);
});
