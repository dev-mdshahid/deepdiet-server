export class AppError extends Error {
    constructor(public statusCode: number = 500, public message: string, public stack = '') {
        super(message);
        this.statusCode = statusCode;
        if(stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}