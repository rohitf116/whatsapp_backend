import app from "./app.js";
import logger from "./configs/logger.config.js";
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  logger.info(`Listing on port: ${PORT}`);
});
