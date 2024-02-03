import { Document, Schema, model, models } from "mongoose";

export interface IStaff extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  occupation:
    | "Санитар"
    | "Медицинска Сестра"
    | "Управител"
    | "Готвач"
    | "Социален Работник"
    | "Рехабилитатор"
    | "Болногледач";
  salary: number;
  status: "paid" | "unpaid";
  color: string;
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
    gender: { type: String, required: true },
    occupation: {
      type: String,
      enum: [
        "Санитар",
        "Медицинска Сестра",
        "Управител",
        "Готвач",
        "Социален Работник",
        "Рехабилитатор",
        "Болногледач",
      ],
      required: true,
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
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Staff = models.Staff || model<IStaff>("Staff", staffSchema);
export default Staff;
