import mongoose, { Schema } from 'mongoose';
import { EmployeeSchema, IEmployee } from './employee.model';

export type TaskPriority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW';

export enum Tag {
  meeting = '#meeting',
  reporting = '#reporting',
  presentation = '#presentation',
  development = '#development',
  testing = '#testing',
  maintenance = '#maintenance',
  cleanup = '#cleanup',
}
export type TaskStatus =
  | 'In progress'
  | 'Done'
  | 'Not-started'
  | 'On review'
  | 'Blocked';

export interface ITask {
  projectId: mongoose.Types.ObjectId | string;
  employees: IEmployee[];
  title: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  priority: TaskPriority;
  tags: Tag[];
  timeEstimate: string;
  status: TaskStatus;
}

export const TaskSchema = new Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  priority: { type: String, enum: ['URGENT', 'HIGH', 'NORMAL', 'LOW'] },
  tags: {
    type: [String],
    enum: [
      '#meeting',
      '#reporting',
      '#presentation',
      '#development',
      '#testing',
      '#maintenance',
      '#cleanup',
    ],
    required: true,
  },
  timeEstimate: { type: String, required: true },
  status: {
    type: String,
    enum: ['In progress', 'Done', 'Not-started', 'On review', 'Blocked'],
    default: 'Not-started',
    required: true,
  },
  employees: {
    type: [EmployeeSchema],
    default: () => [],
  },
});

export default mongoose.model<ITask>('Task', TaskSchema);
