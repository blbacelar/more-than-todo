import { Document, Schema, model } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'Open' | 'Complete';
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ['Open', 'Complete'] },
});

const Task = model<ITask>('Task', taskSchema);

export default Task;
