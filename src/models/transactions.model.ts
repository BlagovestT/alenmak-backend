import { Document, Schema, model, models } from "mongoose";

export interface ITransactions extends Document {
  _id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: "electricity" | "water" | "internet" | "other";
  month:
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december";
  year: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      enum: ["electricity", "water", "internet", "other"],
      required: true,
    },
    month: {
      type: String,
      enum: [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transactions =
  models.Transactions ||
  model<ITransactions>("Transactions", transactionsSchema);

export default Transactions;
