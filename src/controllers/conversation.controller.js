import { catchAsync } from "../utils/catchAsync.util.js";
import { responseJson } from "../serialize/index.js";
import { createOrOpenConversationRespone } from "../serialize/conversation.serialize.js";
export const createOrOpenConversation = catchAsync(async (req, res, next) => {
  const response = createOrOpenConversationRespone({ greet: "Hii" });
  responseJson(res, 201, response);
});
