import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Image } from "@/lib/models/Images";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  const query: any = {};
  if (categoryId) query.category = categoryId;

  const images = await Image.find(query)
    .populate("category", "name slug")
    .sort({ createdAt: -1 });

  return NextResponse.json({ success: true, data: images });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { categoryId, images } = await req.json();

    if (!categoryId || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { success: false, message: "categoryId and images[] are required" },
        { status: 400 }
      );
    }

    const docs = images.map((url: string) => ({
      url,
      category: categoryId,
    }));

    const created = await Image.insertMany(docs);

    return NextResponse.json(
      { success: true, data: created },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create images error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
