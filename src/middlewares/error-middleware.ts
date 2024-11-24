import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import { ValidationError } from 'yup';
import logger from '../exceptions/logger';

interface MyError {
  statusCode: number;
  error: string;
  message: string;
  details?: any;
}

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let myError: MyError;

  if (err instanceof ValidationError) {
    myError = {
      statusCode: 400,
      error: 'ValidationError',
      message: err.message,
      details: err.inner.map((e) => ({ field: e.path, message: e.message })),
    };
  } else if (err instanceof ApiError) {
    myError = {
      statusCode: err.statusCode,
      error: err.error || 'ApiError',
      message: err.message,
      details: err.details || null,
    };
  } else {
    myError = {
      statusCode: 500,
      error: 'UnexpectedError',
      message: Errors.UnexpectedError[1] || 'An unexpected error occurred.',
    };

    logger.error(err);
  }

  if (myError.error === 'UnexpectedError') {
    console.error(err);
  }

  res.status(myError.statusCode).json({
    result: 'error',
    message: myError.message,
    error: myError.error,
    details: myError.details,
  });
}
