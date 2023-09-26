export const createOrOpenConversationRespone = (data) => {
  return {
    message: "conversation opened succesfully",
    conversation: data?.convoExist || data,
  };
};

export const fetchedConversationRespone = (data) => {
  return {
    message: "conversation fetched succesfully",
    conversation: data,
  };
};
