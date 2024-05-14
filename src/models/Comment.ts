import { Document, Schema, model } from 'mongoose';

export interface IComment extends Document {
  taskId: Schema.Types.ObjectId;
  user: string;
  comment: string;
  createdAt: Date;
}

const commentSchema = new Schema({
  taskId: { type: Schema.Types.ObjectId, required: true, ref: 'Task' },
  user: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
