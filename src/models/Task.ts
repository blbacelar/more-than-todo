import { Document, Schema, model } from 'mongoose';

export interface ITask extends Document {
  source: 'GitHub' | 'Jira';
  sourceId: string;
  title: string;
  completed: boolean;
  status: string;
  url?: string;
  key?: string;
  createdAt: Date;
  completedAt?: Date;
}

const taskSchema = new Schema({
  source: { type: String, required: true, enum: ['GitHub', 'Jira'] },
  sourceId: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String },
  completed: { type: Boolean, required: true, default: false },
  url: { type: String },
  key: { type: String },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

taskSchema.index({ source: 1, sourceId: 1 }, { unique: true });

const Task = model<ITask>('Task', taskSchema);

export default Task;
