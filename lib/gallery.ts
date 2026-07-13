import { connectDB } from "@/lib/mongodb";
import { Category } from "@/lib/models/Category";
import { Image } from "@/lib/models/Images";

export async function getGalleryData() {
  await connectDB();

  const categories = await Category.find().lean();

  const images = await Image.find()
    .populate("category", "name slug")
    .lean();

  const categoryPayload = categories.map((cat: any) => ({
    id: String(cat._id),
    name: cat.name,
    slug: cat.slug,
  }));

  const imagePayload = images.map((img: any) => ({
    id: String(img._id),
    url: img.url,
    categoryId: String(
      typeof img.category === "object" ? img.category._id : img.category
    ),
    categorySlug:
      typeof img.category === "object" ? img.category.slug : undefined,
  }));

  return {
    categories: categoryPayload,
    images: imagePayload,
  };
}