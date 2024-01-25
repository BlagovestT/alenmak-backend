import { Document as MongooseDocument, Schema, model, models } from "mongoose";

export interface IDocument extends MongooseDocument {
  _id: string;
  owner: string;
  file_name: string;
  file_size: number;
  file_type: string;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema(
  {
    owner: { type: String, required: true },
    file_name: { type: String, required: true },
    file_size: { type: Number, required: true },
    file_type: { type: String, required: true },
  },
  { timestamps: true }
);

const Document =
  models.Document || model<IDocument>("Document", documentSchema);

export default Document;
