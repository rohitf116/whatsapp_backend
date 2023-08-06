export const responseJson = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};
