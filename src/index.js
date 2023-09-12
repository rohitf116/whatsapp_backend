import mongoose, { connect } from "mongoose";

import app from "./app.js";
import logger from "./configs/logger.config.js";
const { MONGO_URL } = process.env;
const PORT = process.env.PORT || 9000;

connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error(err));

const server = app.listen(PORT, () => {
  logger.info(`Listing on port: ${PORT}`);
});
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

const exitHandler = () => {
  if (server) {
    logger.info("Server closed");
    process.kill(1);
  } else {
    process.kill(1);
  }
};
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed");
    process.kill(1);
  }
});
