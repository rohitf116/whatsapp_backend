export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode <= 499 ? false : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
