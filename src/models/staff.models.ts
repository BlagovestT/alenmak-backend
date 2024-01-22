import { Document, Schema, model, models } from "mongoose";

export interface IStaff extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  salary: number;
  status: "paid" | "unpaid";
  createdAt: Date;
  updatedAt: Date;
}

const staffSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const Staff = models.Staff || model<IStaff>("Staff", staffSchema);
export default Staff;
