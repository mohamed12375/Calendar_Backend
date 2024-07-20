// src/CustomError.ts


export class ExceptionError extends Error {
    public statusCode: number;
    public errors: Record<string, string> | undefined;
  
    constructor(message: string, statusCode: number, errors?: Record<string, string>) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
}
