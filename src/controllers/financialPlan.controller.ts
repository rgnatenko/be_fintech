import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import FinancialPlanService from '../services/financialPlan.service';
import {
  IFinancialPlan,
  IFinancialPlanBody,
} from '../models/financialPlan.model';

class FinancialPlanController extends BaseController {
  constructor() {
    super();
    this.getFinancialPlans = this.getFinancialPlans.bind(this);
    this.getFinancialPlan = this.getFinancialPlan.bind(this);
    this.postFinancialPlan = this.postFinancialPlan.bind(this);
    this.updateFinancialPlan = this.updateFinancialPlan.bind(this);
    this.deleteFinancialPlan = this.deleteFinancialPlan.bind(this);
  }

  async getFinancialPlans(req: Request, res: Response, next: NextFunction) {
    try {
      let { page, limit, filter } = req.body;
      const filterParam = this.getFilter(filter);

      const plans = await FinancialPlanService.getFinancialPlans(
        page,
        limit,
        filterParam,
      );

      res.json(plans);
    } catch (e) {
      next(e);
    }
  }

  async getFinancialPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const plan = await FinancialPlanService.getFinancialPlan(id);

      res.json(plan);
    } catch (e) {
      next(e);
    }
  }

  async postFinancialPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const plan: IFinancialPlan = req.body;
      const newPlan = await FinancialPlanService.postFinancialPlan(plan);

      res.json(newPlan);
    } catch (e) {
      next(e);
    }
  }

  async updateFinancialPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const planBody: IFinancialPlanBody = req.body;
      const updatedPlan = await FinancialPlanService.updateFinancialPlan(
        id,
        planBody,
      );

      res.json(updatedPlan);
    } catch (e) {
      next(e);
    }
  }

  async deleteFinancialPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const deletedPlan = await FinancialPlanService.deleteFinancialPlan(id);

      res.json(deletedPlan);
    } catch (e) {
      next(e);
    }
  }
}

export default new FinancialPlanController();
