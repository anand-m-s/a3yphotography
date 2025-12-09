import mongoose, { Schema, Document, models } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  quote: string;
  src: string;     // Cloudinary URL
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    quote: { type: String, required: true },
    src: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Testimonial =
  models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
