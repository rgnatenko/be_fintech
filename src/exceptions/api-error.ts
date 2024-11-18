import {MyError} from "./errors";

export default class ApiError extends Error {
    statusCode;
    error;
    details;

    constructor(error: MyError) {
        const [statusCode, errorName, message, details] = error;
        super(message);
        this.statusCode = statusCode;
        this.error = errorName;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

