import { NextFunction, Request, Response } from 'express';
import DashboardService from '../services/dashboard.service';
import ApiError from '../exceptions/api-error';
import { Errors, MyError } from '../exceptions/errors';
import { BaseController } from './base.controller';
import {
  IDashboardExpense,
  IDashboardReceivable,
  IDashboardRevenue,
} from '../models/dashboard.model';

class DashboardController extends BaseController {
  constructor() {
    super();
    this.getCharts = this.getCharts.bind(this);
    this.getOverview = this.getOverview.bind(this);
    this.createExpense = this.createExpense.bind(this);
    this.createReceivable = this.createReceivable.bind(this);
    this.createRevenue = this.createRevenue.bind(this);
  }

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

  async createRevenue(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.validateUser(req);
      const revenue: IDashboardRevenue = req.body;
      const data = DashboardService.createRevenue(userId, revenue);

      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async createReceivable(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.validateUser(req);
      const receivable: IDashboardReceivable = req.body;
      const data = DashboardService.createReceivable(userId, receivable);

      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async createExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.validateUser(req);
      const expense: IDashboardExpense = req.body;
      const data = DashboardService.createExpense(userId, expense);

      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new DashboardController();
