import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import FinancialPlan from '../models/financialPlan.model';

class FinancialPlanService {
  async getFinancialPlans(
    filter: Partial<{
      projectId: string;
      month: string;
    }>,
  ) {
    const plans = await FinancialPlan.find(filter);

    if (!plans) {
      // throw new ApiError(Errors.ProjectsError);
    }
  }

  async getFinancialPlan() {}

  async postFinancialPlan() {}

  async putFinancialPlan() {}

  async deleteFinancialPlan() {}
}
