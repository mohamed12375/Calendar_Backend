// src/CustomError.ts

import { ExceptionError } from "./mainError/ExceptionError";
export class EventNotFoundException extends ExceptionError {
    constructor(message: string = "Event not found") {
        super(message, 404);
    }
}
