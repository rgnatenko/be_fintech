import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';

class FinancialPlan extends BaseController {
  async getFinancialPlans(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async getFinancialPlan(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async postFinancialPlan(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async putFinancialPlan(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async deleteFinancialPlan(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

export default new FinancialPlan();
