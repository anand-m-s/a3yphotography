import type { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "A3Y Photography | Abhishek Das – Paris Photographer",
  description:
    "A3Y Photography by Abhishek Das, a Paris-based photographer specializing in portraits, landscapes, street photography, and events. Capturing timeless moments across Paris.",

  alternates: {
    canonical: "https://a3yphotography.com",
  },

  openGraph: {
    title: "A3Y Photography | Abhishek Das – Paris Photographer",
    description:
      "A3Y Photography by Abhishek Das, a Paris-based photographer specializing in portraits, landscapes, street photography, and events.",
    url: "https://a3yphotography.com",
    siteName: "A3Y Photography",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://a3yphotography.com/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "A3Y Photography",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "A3Y Photography | Abhishek Das – Paris Photographer",
    description:
      "A3Y Photography by Abhishek Das, a Paris-based photographer specializing in portraits, landscapes, street photography, and events.",
    images: ["https://a3yphotography.com/icons/icon-512.png"],
  },

  keywords: [
    "A3Y Photography",
    "Abhishek Das",
    "Paris Photographer",
    "Photographer in Paris",
    "Portrait Photographer",
    "Street Photography",
    "Landscape Photography",
    "Event Photography",
    "Photography Paris",
  ],
};

export default function Page() {
  return <HomePage />;
}