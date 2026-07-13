import type { Metadata } from "next";
import GalleryPage from "./GalleryPage";

export const metadata: Metadata = {
  title: "Photography Gallery",
  description:
    "Explore the A3Y Photography portfolio featuring portraits, street photography, landscapes, and event photography captured across Paris.",
};

export default function Page() {
  return <GalleryPage />;
}