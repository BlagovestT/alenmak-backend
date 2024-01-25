import { Document, Schema, model, models } from "mongoose";

export interface IPatient extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  age: number;
  paid: "paid" | "unpaid";
  status: "active" | "inactive" | "released" | "deceased";
  group: "група а" | "група б";
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
      enum: ["група а", "група б"],
      default: "O",
    },
  },
  { timestamps: true }
);

const Patient = models.Patient || model<IPatient>("Patient", patientSchema);
export default Patient;
