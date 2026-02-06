"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);







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

  const goNext = () => {
    if (currentIndex === null) return;
    const next = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(next);
    setSelectedImage(filteredPhotos[next].url);
  };

  const goPrev = () => {
    if (currentIndex === null) return;
    const prev = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setCurrentIndex(prev);
    setSelectedImage(filteredPhotos[prev].url);
  };

  useEffect(() => {
    if (!lightboxOpen) {
      document.body.style.overflow = "";
      return;
    }

    // Disable scroll
    document.body.style.overflow = "hidden";

    // Keyboard controls
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, currentIndex]);




  // filter images based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((img) => img.categoryId === activeCategory);
  }, [images, activeCategory]);

  return (
    <div className="min-h-dvh pt-24 pb-16">
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
          <div
            data-cursor="gallery"
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredPhotos.map((photo, index) => (
              <div

                key={photo.id}
                className="cursor-pointer relative w-full mb-4 overflow-hidden rounded-lg group"
                style={{ breakInside: "avoid" }}
                onClick={() => {
                  setSelectedImage(photo.url);
                  setCurrentIndex(index);
                  setLightboxOpen(true);
                }}

              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={photo.url}
                    alt="Photography"
                    fill
                    className=" object-cover transition-transform duration-500 group-hover:scale-105"
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



      {/* Fullscreen Lightbox */}



      {lightboxOpen && selectedImage && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl">
          <button
            onClick={() => setLightboxOpen(false)}
            className="
                cursor-pointer fixed top-6 right-6 z-[10000]
                text-white/90 hover:text-white 
                text-2xl md:text-4xl font-light

                /* --- ANIMATIONS --- */
                animate-[float_3s_ease-in-out_infinite, pulseGlow_4s_ease-in-out_infinite]

                /* hover interaction */
                transition-all duration-200 ease-out
                hover:scale-125 hover:rotate-6
                hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.45)]
              "

            /* MAGNETIC EFFECT */
            onMouseMove={(e) => {
              const btn = e.currentTarget;
              const rect = btn.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) / 6;
              const y = (e.clientY - rect.top - rect.height / 2) / 6;

              btn.style.transform = `translate(${x}px, ${y}px) scale(1.15) rotate(3deg)`;
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.transform = "";
            }}
          >
            ✕
          </button>






          {/* MOBILE VERSION (NO zoom, NO double tap) */}
          <div
            className="flex md:hidden items-center justify-center 
                        w-full h-full select-none
                        p-4 animate-fadeIn "
            onClick={() => setLightboxOpen(false)}


            onTouchStart={(e) => {
              const el = e.currentTarget as any;

              el.isPinching = e.touches.length > 1;

              if (e.touches.length !== 1) return;

              el.startX = e.touches[0].clientX;
            }}

            onTouchMove={(e) => {
              const el = e.currentTarget as any;

              if (e.touches.length > 1) {
                el.isPinching = true; // 👈 mark pinch immediately
              }
            }}


            onTouchEnd={(e) => {
              const el = e.currentTarget as any;

              if (el.isPinching) {
                el.startX = null;
                el.isPinching = false;
                return; // 👈 completely ignore swipe
              }

              if (e.changedTouches.length !== 1) return;

              const startX = el.startX;
              if (startX == null) return;

              const diff = e.changedTouches[0].clientX - startX;

              if (Math.abs(diff) > 50) {
                e.stopPropagation();
                diff > 0 ? goPrev() : goNext();
              }

              el.startX = null;
            }}


          >
            {/* Fullscreen Image */}
            <div className="relative w-screen min-h-dvh max-w-screen max-h-screen overflow-hidden">
              <Image
                src={selectedImage}
                alt="Full view"
                fill
                className="object-contain"
                unoptimized
                sizes="100vw"
              />
            </div>
          </div>




          {/* DESKTOP VERSION (scrollable tall image) */}
          <div
            className="
                hidden md:flex 
                items-center justify-center 
                w-full h-full select-none
                p-6 animate-fadeIn
              "
            onClick={() => setLightboxOpen(false)}
          >
            {/* LEFT ARROW */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="cursor-pointer absolute left-6 text-white/70 hover:text-white text-9xl z-[10000]"
            >
              ‹
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="cursor-pointer absolute right-6 text-white/70 hover:text-white text-9xl z-[10000]"
            >
              ›
            </button>

            {/* FULLSCREEN IMAGE */}
            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
              <Image
                src={selectedImage}
                alt="Full view"
                fill
                className="object-contain rounded-xl"
                unoptimized
                sizes="100vw"
              />
            </div>
          </div>


        </div>
      )}



    </div>
  );
}
