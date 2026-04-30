import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Image } from "@/lib/models/Images";
import { Category } from "@/lib/models/Category";

export async function GET(req: Request) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 12;

    const excludedCategories = await Category.find({
        slug: { $in: ["boudoir"] }
    }).select("_id");

    const excludeIds = excludedCategories.map(c => c._id);

    const randomImages = await Image.aggregate([
        {
            $match: {
                url: { $ne: "" },
                category: { $nin: excludeIds }
            }
        },
        { $sample: { size: limit } },
    ]);

    const formatted = randomImages.map((img: any) => ({
        id: String(img._id),
        imageUrl: img.url,
    }));

    return NextResponse.json({ data: formatted });
}