import { CustomError } from "./custom-error";
import { ValidationError } from 'express-validator';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(private errors: ValidationError[]) {
        super('Bad request error');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => {
            return {
                message: error.msg,
                field: error.param
            };
        })
    }
}