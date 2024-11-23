import { NextFunction, Request, Response } from 'express';
import DashboardService from '../services/dashboard.service';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';

class DashboardController {
  async getOverview(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;

    if (!userId) {
      throw new ApiError(Errors.Unauthorized);
    }

    let { filter } = req.body;

    if (!filter) {
      filter = {};
    }

    const overview = await DashboardService.getOverview(userId, filter);

    if (!overview) {
      throw new ApiError(Errors.OverviewError);
    }

    res.json({ overview });
  }

  async getCharts(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;
    let { filter } = req.body;

    if (!filter) {
      filter = {};
    }

    const chartsData = await DashboardService.getCharts(userId, filter);

    if (!chartsData) {
      throw new ApiError(Errors.ChartsError);
    }

    res.json({ chartsData });
  }
}

export default new DashboardController();
