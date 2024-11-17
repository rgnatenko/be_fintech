import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import TokenService from '../services/token.service';

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

export default async function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(Errors.Unauthorized);
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
      throw new ApiError(Errors.Unauthorized);
    }

    const userData = await TokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw new ApiError(Errors.Unauthorized);
    }

    req.user = userData;
    next();
  } catch (e) {
    next(e);
  }
}
