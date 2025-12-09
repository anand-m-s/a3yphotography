import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/lib/models/Testimonial";

export async function GET() {
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: testimonials });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, quote, src } = await req.json();

    if (!name || !quote || !src) {
      return NextResponse.json(
        { success: false, message: "name, quote and src are required" },
        { status: 400 }
      );
    }

    const doc = await Testimonial.create({ name, quote, src });

    return NextResponse.json(
      { success: true, data: doc },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
