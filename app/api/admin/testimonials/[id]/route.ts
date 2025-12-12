import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/lib/models/Testimonial";
import type { NextRequest } from "next/server";

type ContextWithParams = {
  params: Promise<{ id: string }> | { id: string };
};

export async function DELETE(req: NextRequest, context: ContextWithParams) {
  await connectDB();

  // params may be a Promise in newer Next versions — await it
  const { params } = context;
  const { id } = (await params) as { id: string };

  try {
    const doc = await Testimonial.findByIdAndDelete(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Failed to delete testimonial", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
