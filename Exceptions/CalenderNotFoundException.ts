// src/CustomError.ts

import { ExceptionError } from "./mainError/ExceptionError";
export class CalenderNotFoundException extends ExceptionError {
    constructor(message: string = "Calender not found") {
        super(message, 404);
    }
}
