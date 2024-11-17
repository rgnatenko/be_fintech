import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import { ValidationError } from 'yup';

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let myError: {
    statusCode: number;
    error: string;
    message: string;
    details: any;
  };

  if (err instanceof ValidationError) {
    myError = {
      statusCode: 400,
      error: err.name,
      message: err.message,
      details: {
        record: 'User',
        field: (err.inner as any)[0]?.path,
      },
    };
  } else if (err instanceof ApiError) {
    myError = err;
  } else {
    myError = new ApiError(Errors.UnexpectedError);
  }

  if (myError.error === Errors.UnexpectedError[1]) {
    console.log(err);
  }

  res.status(myError.statusCode).json({
    result: 'error',
    message: myError.message,
    error: myError.error,
    details: myError.details,
  });
}
