import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/lib/models/Category";

export async function GET() {
  await connectDB();
  // just sort by createdAt (newest first)
  const categories = await Category.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: categories });
}