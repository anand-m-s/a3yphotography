// "use client";

// import GalleryPage from "../page"; // reuse your main component
// import { useParams } from "next/navigation";

// export default function CategoryGalleryWrapper() {
//   const params = useParams();
//   const slug = params.slug as string;

//   return <GalleryPage initialSlug={slug} />;
// }


import GalleryPage from "../page";
import { getGalleryData } from "@/lib/gallery";
import { getCloudinaryOgImage } from "@/lib/utils/cloudinaryHelper";
type Props = {
  params: Promise<{ slug: string }>;
};

// Generate OG metadata dynamically per category slug
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  try {
    const { categories, images } = await getGalleryData();

    const category = categories.find(
      (c) => c.slug.toLowerCase() === slug.toLowerCase()
    );

    const categoryImages = images.filter(
      (img) => img.categorySlug?.toLowerCase() === slug.toLowerCase()
    );

    // const previewImage =
    //   categoryImages[0]?.url ?? `${baseUrl}/og-fallback.jpg`;


    const previewImage = categoryImages[0]?.url
      ? getCloudinaryOgImage(categoryImages[0].url)
      : `${baseUrl}/og-fallback.jpg`;


    const title = category
      ? `${category.name} Photography | A3Y`
      : "Gallery | A3Y Photography";

    const description = category
      ? `Browse ${category.name.toLowerCase()} photos by A3Y Photography.`
      : "Explore our photography gallery.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${baseUrl}/gallery/${slug}`,
        type: "website",
        images: [
          {
            url: previewImage,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [previewImage],
      },
    };
  } catch (error) {
    console.error("generateMetadata error:", error);

    return {
      title: "Gallery | A3Y Photography",
      description: "Explore our photography gallery.",
      openGraph: {
        title: "Gallery | A3Y Photography",
        description: "Explore our photography gallery.",
        images: [`${baseUrl}/og-fallback.jpg`],
      },
      twitter: {
        card: "summary_large_image",
        images: [`${baseUrl}/og-fallback.jpg`],
      },
    };
  }
}

// Page component — just passes slug down to your existing GalleryPage
export default async function CategoryGalleryPage({ params }: Props) {
  const { slug } = await params;
  return <GalleryPage initialSlug={slug} />;
}