import { Document, Schema, model, models } from "mongoose";

export interface IPatient extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  age: number;
  paid: "paid" | "unpaid";
  status: "active" | "inactive" | "released" | "deceased";
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    paid: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "released", "deceased"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Patient = models.Patient || model<IPatient>("Patient", patientSchema);
export default Patient;
