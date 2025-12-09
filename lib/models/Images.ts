import mongoose, { Schema, Document, models } from "mongoose";

export interface IImage extends Document {
  url: string;
  category: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export const Image =
  models.Image || mongoose.model<IImage>("Image", ImageSchema);
