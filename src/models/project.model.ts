import mongoose, { Schema } from 'mongoose';

export interface IProject {
  name: string;
  description: string;
  startDate: string;
  endDate: Date;
  budget: number;
  status: string;
}

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  status: { type: String, required: true },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
