import mongoose, { Schema } from 'mongoose';
import { EmployeeSchema, IEmployee } from './employee.model';

export interface IContract {
  userId: mongoose.Types.ObjectId | string;
  client: mongoose.Types.ObjectId | string;
  contractName: string;
  terms: string;
  startDate?: Date;
  endDate?: Date;
  amount: number;
  employees: IEmployee[];
}

export const ContractSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, required: true },
  contractName: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  terms: { type: String, required: true, trim: true },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be a positive'],
  },
  employees: { type: [EmployeeSchema], default: () => [] },
});

export default mongoose.model<IContract>('Contract', ContractSchema);
