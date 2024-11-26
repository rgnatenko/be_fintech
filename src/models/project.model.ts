import mongoose, { Schema } from 'mongoose';

export interface IProject {
  userId: mongoose.Types.ObjectId | string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  budget: number;
  status: string;
}

const ProjectSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  budget: { type: Number, required: true },
  status: { type: String, required: true },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
