// src/CustomError.ts

import { ExceptionError } from "./mainError/ExceptionError";
export class InvalidCredentialException extends ExceptionError {
    constructor(message: string = "Invalid Credentials") {
        super(message, 422);
    }
}
