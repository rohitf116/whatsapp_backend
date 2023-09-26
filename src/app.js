import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import multer from "multer";
import cors from "cors";

import createHttpError from "http-errors";
import router from "./routes/index.js";
import { globalErrorHandler } from "./controllers/error.controller.js";
import { AppError } from "./utils/error.utils.js";

dotenv.config();
//create express app
const app = express();
//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
//helmet
app.use(helmet());

//parse json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sanitize request
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

//zgip compression
app.use(compression());

//file upload
app.use(multer().any());

//cors
app.use(cors());

app.get("/", (req, res) => {
  throw createHttpError.BadRequest("This is invalid");
});

app.use("/api/v1", router);
app.use(async (req, res, next) => {
  next(new AppError("This route not found", 404));
});

app.use(globalErrorHandler);

export default app;
