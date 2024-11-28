import { Request } from 'express';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';


export class BaseController {
  protected validateUser(req: Request): string {
    if (!req.user || !req.user.id) {
      throw new ApiError(Errors.Unauthorized);
    }
    return req.user.id;
  }

  protected getFilter(filter: Record<string, unknown>): any {
    return filter || {};
  }
}
