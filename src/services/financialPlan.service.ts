import { every, values } from 'lodash';
import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import FinancialPlan, { IFinancialPlan } from '../models/financialPlan.model';
import ProjectService from './project.service';

class FinancialPlanService {
  async getFinancialPlans(
    page: number = 1,
    limit: number = 100,
    filter: Partial<{
      projectId: string;
      month: string;
    }>,
  ) {
    const plans = await FinancialPlan.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!plans) {
      throw new ApiError(Errors.FinancialPlanError);
    }

    return plans;
  }

  async getFinancialPlan(id: string) {
    const plan = FinancialPlan.findById(id);

    if (!plan) {
      throw new ApiError(Errors.FinancialPlanNotFound);
    }

    return plan;
  }

  async postFinancialPlan(plan: IFinancialPlan) {
    await ProjectService.getProject(plan.projectId);

    const allFieldsAreFilled = every(values(plan), Boolean);

    if (!allFieldsAreFilled) {
      throw new ApiError(Errors.InvalidFinancialPlanDataData);
    }

    const newPlan = await FinancialPlan.create(plan);

    return newPlan;
  }

  async updateFinancialPlan(
    id: string,
    data: Partial<{
      month: number;
      budgetedHours: number;
      actualHours: number;
      budge: number;
      tedExpenses: number;
      actualExpenses: number;
    }>,
  ) {
    const updatedPlan = await FinancialPlan.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedPlan) {
      throw new ApiError(Errors.FinancialPlanNotFound);
    }

    return updatedPlan;
  }

  async deleteFinancialPlan(id: string) {
    const deletedPlan = await FinancialPlan.deleteOne({ _id: id });

    if (!deletedPlan) {
      throw new ApiError(Errors.FinancialPlanNotFound);
    }

    return deletedPlan;
  }
}

export default new FinancialPlanService();
