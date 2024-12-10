import mongoose, { Schema } from 'mongoose';
import { EmployeeSchema, IEmployee } from './employee.model';
import { ITask, TaskSchema } from './task.model';

export interface IProject {
  userId: mongoose.Types.ObjectId | string;
  admins: mongoose.Types.ObjectId | string[];
  tasks: mongoose.Types.ObjectId | string[];
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  budget: number;
  status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
}

export const ProjectSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  budget: {
    type: Number,
    required: true,
    min: [0, 'Budget must be a positive'],
  },
  status: {
    type: String,
    enum: ['NEW', 'IN_PROGRESS', 'COMPLETED'],
    default: 'NEW',
    required: true,
  },
  admins: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
    default: () => [],
  },
  tasks: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    default: () => [],
  },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
