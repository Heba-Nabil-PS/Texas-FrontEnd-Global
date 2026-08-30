class ErrorHandler extends Error {
  public title: string;
  public statusCode: number;

  constructor(
    title: string = "Error",
    message: string = "An error occurred",
    statusCode: number = 500
  ) {
    super(message);

    this.title = title;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
