import { Document, Schema, model, models } from "mongoose";

export interface ITask extends Document {
  _id: string;
  title: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = models.Task || model<ITask>("Task", taskSchema);
export default Task;
