// src/CustomError.ts

import { ExceptionError } from "./mainError/ExceptionError";
export class UserAlreadyExists extends ExceptionError {
    constructor(message: string = "User already exists") {
        super(message, 404);
    }
}
