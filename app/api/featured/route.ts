import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/lib/models/Category";
import { Image } from "@/lib/models/Images";

export async function GET() {
    await connectDB();

    const categories = await Category.find().lean();
    const withRandomImage = await Promise.all(
        categories.map(async (cat) => {
            const randomImage = await Image.aggregate([
                { $match: { category: cat._id } },
                { $sample: { size: 1 } },
            ]);

            

            if (!randomImage[0]) return null;

            return {
                _id: String(cat._id),
                name: cat.name,
                slug: cat.slug,
                imageUrl: randomImage[0].url,
            };
        })
    );

    // const filtered = withRandomImage.filter(Boolean).slice(0,4);
    const filtered = withRandomImage.filter(Boolean);

    

    return NextResponse.json({ data: filtered });
}
