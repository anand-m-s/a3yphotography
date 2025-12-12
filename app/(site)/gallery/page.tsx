// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { cn } from "@/lib/utils"

// const categories = [
//   { id: "all", label: "All Work" },
//   { id: "portraits", label: "Portraits" },
//   { id: "Marriage", label: "Marriage" },
//   { id: "street", label: "Street" },
//   { id: "events", label: "Events" },
// ]

// const photos = [
//   { id: 1, category: "portraits", query: "elegant portrait photography, natural light, professional", img: "/gallery/Portraits/Montmartre - Paris/IMG_2391-3-ps.jpg" },
//   { id: 2, category: "Marriage", query: "French countryside landscape, golden hour", img: "/gallery/Marriage/_H5A2164.jpg" },
//   { id: 3, category: "street", query: "Paris street photography, candid moment", img: "/gallery/Portraits/Musee Du Louvre - Paris/_O1A4531.JPG" },
//   { id: 4, category: "events", query: "elegant wedding photography, romantic ceremony", img: "/gallery/Events/_MG_2212.JPEG" },
//   { id: 5, category: "portraits", query: "fashion portrait photography, studio lighting", img: "/gallery/Portraits/Montmartre - Paris/IMG_3045-2.jpg" },
//   { id: 6, category: "Marriage", query: "mountain landscape photography, dramatic sky", img: "/gallery/Marriage/_H5A2914.jpg" },
//   { id: 7, category: "street", query: "urban street photography, Paris cafe scene", img: "/gallery/Portraits/Musee Du Louvre - Paris/_O1A6597.JPG" },
//   { id: 8, category: "events", query: "corporate event photography, professional", img: "/gallery/Events/_MG_2436.JPEG" },
//   { id: 9, category: "portraits", query: "family portrait photography, outdoor natural light", img: "/gallery/Portraits/Musee Du Louvre - Paris/_O1A9820.JPG" },
//   { id: 10, category: "Marriage", query: "coastal landscape photography, sunset", img: "/gallery/Marriage/_H5A2178.jpg" },
//   { id: 11, category: "street", query: "black and white street photography, Paris", img: "/gallery/Portraits/Tour Eiffel - Paris/_O1A8155.JPEG" },
//   { id: 12, category: "events", query: "birthday celebration photography, candid moments", img: "/gallery/Events/_MG_2503.JPEG" },
// ]

// export default function GalleryPage() {
//   const [activeCategory, setActiveCategory] = useState("all")

//   const filteredPhotos = activeCategory === "all" ? photos : photos.filter((photo) => photo.category === activeCategory)

//   return (
//     <div className="min-h-screen pt-24 pb-16">
//       <div className="container mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="font-serif text-4xl md:text-6xl mb-6">Portfolio</h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             An exhibition of my photography across various genres
//           </p>
//         </div>

//         {/* Category Filter */}
//         <div className="flex flex-wrap justify-center gap-4 mb-16">
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => setActiveCategory(category.id)}
//               className={cn(
//                 "px-6 py-2 rounded-full text-sm tracking-wide transition-all",
//                 activeCategory === category.id
//                   ? "bg-primary text-primary-foreground"
//                   : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
//               )}
//             >
//               {category.label}
//             </button>
//           ))}
//         </div>

//         {/* Photo Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredPhotos.map((photo) => (
//             <div key={photo.id} className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer">
//               <Image
//                 src={photo.img}
//                 alt={`Photography ${photo.id}`}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }






"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CategoryDoc = {
  id: string;
  name: string;
  slug: string;
};

type GalleryImage = {
  id: string;
  url: string;
  categoryId: string;
  categorySlug?: string;
};

export default function GalleryPage() {
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // fetch categories + images from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        const json = await res.json();

        if (!json.success) {
          console.error("Failed to load gallery");
          return;
        }

        setCategories(json.data.categories || []);
        setImages(json.data.images || []);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // build filter buttons (All + dynamic categories)
  const filterOptions = useMemo(
    () => [
      { id: "all", label: "All Work" },
      ...categories.map((cat) => ({
        id: cat.id,
        label: cat.name,
      })),
    ],
    [categories]
  );

  useEffect(() => {
    if (!categories.length) return;

    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (!hash) return;

    const match = categories.find(
      (cat) => cat.slug.toLowerCase() === hash
    );

    if (match) {
      setActiveCategory(match.id);
    }
  }, [categories]);

  useEffect(() => {
    if (activeCategory !== "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeCategory]);


  // filter images based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((img) => img.categoryId === activeCategory);
  }, [images, activeCategory]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-4xl mb-2">Portfolio</h1>
          {/* <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An exhibition of my photography across various genres
          </p> */}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filterOptions.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-2 rounded-full text-sm tracking-wide transition-all cursor-pointer",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-sm bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          //////////////////


          // <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          //   {filteredPhotos.map((photo, index) => (
          //     <div
          //       key={photo.id}
          //       className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer"
          //     >
          //       <Image
          //         src={photo.url}
          //         alt="Photography"
          //         fill
          //         className="object-cover transition-transform duration-500 group-hover:scale-105"
          //         unoptimized
          //         priority={index === 0}  
          //         loading={index === 0 ? "eager" : "lazy"}
          //       />
          //       <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
          //     </div>
          //   ))}

          //   {!filteredPhotos.length && (
          //     <p className="col-span-full text-center text-muted-foreground">
          //       No images in this category yet.
          //     </p>
          //   )}
          // </div>


          /////////////////

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="relative w-full mb-4 overflow-hidden rounded-lg group"
                style={{ breakInside: "avoid" }}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={photo.url}
                    alt="Photography"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized  // ✔ good with Cloudinary
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
              </div>
            ))}

            {!filteredPhotos.length && (
              <p className="col-span-full text-center text-muted-foreground">
                No images in this category yet.
              </p>
            )}
          </div>

        )}
      </div>
    </div>
  );
}

