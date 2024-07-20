// src/CustomError.ts

import { ExceptionError } from "./mainError/ExceptionError";
export class ValidationException extends ExceptionError {
    constructor(message: string = "Nnprocessable entity") {
        super(message, 422);
    }
}
