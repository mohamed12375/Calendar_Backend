// src/CustomError.ts

import { ExceptionError } from "./mainError/ExceptionError";
export class UnauthorizedException extends ExceptionError {
    constructor(message: string = "Access denied") {
        super(message, 401);
    }
}
