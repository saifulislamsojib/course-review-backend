class AppError extends Error {
  statusCode: number;

  stringValue?: string;

  constructor(
    statusCode: number,
    message: string,
    stack?: string,
    name?: string,
    stringValue?: string,
  ) {
    super(message);
    this.statusCode = statusCode;

    if (name) {
      this.name = name;
    }
    if (stringValue) {
      this.stringValue = stringValue;
    }
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
