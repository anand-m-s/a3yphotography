"use client";

import GalleryPage from "../page"; // reuse your main component
import { useParams } from "next/navigation";

export default function CategoryGalleryWrapper() {
  const params = useParams();
  const slug = params.slug as string;

  return <GalleryPage initialSlug={slug} />;
}
