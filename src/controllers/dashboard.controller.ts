import { NextFunction, Request, Response } from 'express';
import DashboardService from '../services/dashboard.service';
import ApiError from '../exceptions/api-error';
import { Errors, MyError } from '../exceptions/errors';
import { BaseController } from './base.controller';

class DashboardController extends BaseController {
  private async handleRequest(
    req: Request,
    res: Response,
    next: NextFunction,
    serviceMethod: (userId: string, filter: any) => Promise<any>,
    errorType: MyError,
  ) {
    try {
      const userId = this.validateUser(req);
      const filter = this.getFilter(req.body.filter);
      const data = await serviceMethod(userId, filter);

      if (!data) {
        throw new ApiError(errorType);
      }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOverview(req: Request, res: Response, next: NextFunction) {
    return this.handleRequest(
      req,
      res,
      next,
      DashboardService.getOverview,
      Errors.OverviewError,
    );
  }

  async getCharts(req: Request, res: Response, next: NextFunction) {
    return this.handleRequest(
      req,
      res,
      next,
      DashboardService.getCharts,
      Errors.ChartsError,
    );
  }
}

export default new DashboardController();
