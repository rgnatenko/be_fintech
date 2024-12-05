import mongoose, { Schema } from 'mongoose';
import { IProject, ProjectSchema } from './project.model';
import { ITask, TaskSchema } from './task.model';

export type Position = 'Manager' | 'Developer' | 'Designer' | 'QA' | 'HR';

export interface IEmployee {
  name: string;
  position: Position;
  contract: mongoose.Schema.Types.ObjectId | string;
  startDate: Date;
  endDate: Date | null;
  assignedProjects: mongoose.Schema.Types.ObjectId | string[];
  tasks: mongoose.Schema.Types.ObjectId | string[];
}

export const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  position: {
    type: String,
    enum: ['Manager', 'Developer', 'Designer', 'QA', 'HR'],
    required: true,
  },
  contract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: true,
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  assignedProjects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Project',
    default: () => [],
  },
  tasks: {
    type: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Task',
      },
    ],
    default: () => [],
  },
});

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);
