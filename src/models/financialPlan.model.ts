import mongoose, { Schema } from 'mongoose';

export interface IFinancialPlan {
  projectId: mongoose.Types.ObjectId | string;
  month: number;
  budgetedHours: number;
  actualHours: number;
  budge: number;
  tedExpenses: number;
  actualExpenses: number;
}

const FinancialPlanSchema = new Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  month: { type: Number, required: true },
  budgetedHours: {
    type: Number,
    required: true,
    min: [0, 'Budget hours must be a positive'],
  },
  actualHours: {
    type: Number,
    required: true,
    min: [0, 'Actual hours must be a positive'],
  },
  budge: {
    type: Number,
    required: true,
    min: [0, 'Budge must be a positive'],
  },
  tedExpenses: {
    type: Number,
    required: true,
    min: [0, 'Ted expenses must be a positive'],
  },
  actualExpenses: {
    type: Number,
    required: true,
    min: [0, 'Actual expenses must be a positive'],
  },
});

export default mongoose.model<IFinancialPlan>(
  'FinancialPlan',
  FinancialPlanSchema,
);
