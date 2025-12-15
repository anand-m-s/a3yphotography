import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://a3yphotography.com",
      lastModified: new Date(),
    },
    {
      url: "https://a3yphotography.com/gallery",
      lastModified: new Date(),
    },
    {
      url: "https://a3yphotography.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://a3yphotography.com/contact",
      lastModified: new Date(),
    },
  ];
}
