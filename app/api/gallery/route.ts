
import { NextResponse } from "next/server";
import { getGalleryData } from "@/lib/gallery";

export async function GET() {
  const data = await getGalleryData();

  return NextResponse.json({
    success: true,
    data,
  });
}