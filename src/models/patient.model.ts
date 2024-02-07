import { Document, Schema, model, models } from "mongoose";

export interface IPatient extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  age: number;
  paid: "paid" | "unpaid";
  status: "active" | "inactive" | "released" | "deceased";
  group: "група 1" | "група 2" | "група 3" | "група 4";
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
    gender: { type: String, required: true },
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
    group: {
      type: String,
      enum: ["група 1", "група 2", "група 3", "група 4"],
      default: "O",
    },
  },
  { timestamps: true }
);

const Patient = models.Patient || model<IPatient>("Patient", patientSchema);
export default Patient;
