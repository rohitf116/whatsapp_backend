import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import multer from "multer";
import cors from "cors";

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
  res.send(req.body);
});

export default app;
