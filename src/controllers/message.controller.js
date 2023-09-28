import logger from "../configs/logger.config.js";
import { responseJson } from "../serialize/index.js";
import { updateLatestMessage } from "../services/conversation.service.js";
import {
  createMessage,
  findOneMessage,
  populateMessage,
} from "../services/message.service.js";
import { catchAsync } from "../utils/catchAsync.util.js";
import { AppError } from "../utils/error.utils.js";
import { isObjectid } from "../utils/mongoose.util.js";

export const sendMessage = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { message, convo_id } = req.body;
  const files = req.files;
  if (!convo_id || (!message && !files.length)) {
    logger.error("No convo_id or message body");
    throw new AppError("Please provide convo_id and message body", 400);
  }
  const messageData = {
    sender: userId,
    message,
    conversation: convo_id,
    files: files || [],
  };
  const newMessage = await createMessage(messageData);
  console.log(newMessage._id);
  const messagesPopulated = await populateMessage(newMessage._id);

  const data = messagesPopulated;
  await updateLatestMessage(convo_id, newMessage);
  responseJson(res, 201, data);
});
export const getMessages = catchAsync(async (req, res, next) => {
  const id = isObjectid(req.params?.id);
  const message = await findOneMessage(id);
  const data = message;
  responseJson(res, 201, data);
});
