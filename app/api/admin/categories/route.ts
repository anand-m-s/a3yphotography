import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/lib/models/Category";

// helper slugify (in case you want to control it here, instead of pre-save hook)
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

export async function GET() {
  await connectDB();
  // just sort by createdAt (newest first)
  const categories = await Category.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, message: "name is required" },
        { status: 400 }
      );
    }

    // If you already have a pre("save") in schema that sets slug, you can skip this
    const slug = slugify(name);

    const category = await Category.create({
      name,
      slug,
    });

    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create category error:", error);

    // handle duplicate slug error (unique index)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Category with similar name/slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
