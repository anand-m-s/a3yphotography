"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);

  const thumbContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileThumbContainerRef = useRef<HTMLDivElement | null>(null);
  const activeThumbRef = useRef<HTMLButtonElement | null>(null);
  const activeMobileThumbRef = useRef<HTMLButtonElement | null>(null);

  const [isZooming, setIsZooming] = useState(false);



  const widths = ["w-24", "w-25", "w-24", "w-25", "w-26", "w-52"];


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
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, currentIndex]);

  useEffect(() => {
    if (lightboxOpen) {
      requestAnimationFrame(() => setIsVisible(true));
    }
  }, [lightboxOpen]);

  const closeLightbox = () => {
    setIsVisible(false);
    setTimeout(() => {
      setLightboxOpen(false);
    }, 300);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    // push fake history entry
    window.history.pushState({ lightbox: true }, "");

    const handlePopState = () => {
      closeLightbox();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [lightboxOpen]);


  useEffect(() => {
    [activeThumbRef, activeMobileThumbRef].forEach(ref => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    });
  }, [currentIndex]);




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
          <h1 className="font-serif text-4xl md:text-6xl font-light uppercase mb-2">Captured</h1>
        </div>

        {/* Category Filter */}
        {/* Category Filter Skeleton */}
        {loading ?
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`h-9 ${widths[i % widths.length]} rounded-full bg-muted`}

              >
              </div>
            ))}
          </div>
          :
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
        }

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
        <div
          className={cn(
            "fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl",
            "transition-all duration-300 ease-out",
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-[0.96]"
          )}
          onClick={() => closeLightbox()}
        >

          <button
            onClick={() => closeLightbox()}
            className="hidden md:block
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

          {/* MOBILE VERSION  */}

          <div
            className="flex md:hidden items-center justify-center 
                        w-full h-full select-none
                        p-4 animate-fadeIn "
            // onClick={() => closeLightbox()}


            onTouchStart={(e) => {
              const el = e.currentTarget as any;

              el.isPinching = e.touches.length > 1;

              if (e.touches.length !== 1) return;

              el.startX = e.touches[0].clientX;
            }}

            onTouchMove={(e) => {
              const el = e.currentTarget as any;

              if (e.touches.length > 1) {
                el.isPinching = true;
                setIsZooming(true);
              }
            }}


            onTouchEnd={(e) => {
              const el = e.currentTarget as any;

              if (el.isPinching) {
                el.startX = null;
                el.isPinching = false;

                setTimeout(() => setIsZooming(false), 120);
                return;
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
                sizes="100vw"
              />
            </div>


            {/* MOBILE PREVIEW STRIP */}
            <div
              // className="md:hidden absolute bottom-4 left-0 right-0 px-4"
              className={cn(
                "md:hidden absolute bottom-4 left-0 right-0 px-4 transition-all duration-200 ease-out",
                isZooming
                  ? "opacity-0 translate-y-4 pointer-events-none"
                  : "opacity-100 translate-y-0"
              )}
              ref={mobileThumbContainerRef}
            >
              <div className="flex gap-3 overflow-x-auto pb-2
              touch-pan-x
              scrollbar-hide     
              snap-x snap-mandatory               
                    [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
                    /* Webkit prefix for compatibility */
                    [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
              >
                {filteredPhotos.map((photo, index) => (
                  <button
                    key={photo.id}
                    ref={index === currentIndex ? activeMobileThumbRef : null}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                      setSelectedImage(photo.url);
                    }}
                    className={cn(
                      "relative h-12 w-16 flex-shrink-0 rounded-lg overflow-hidden transition-all",
                      index === currentIndex
                        ? "ring-2 ring-white scale-105"
                        : "opacity-60"
                    )}
                  >
                    <Image
                      src={photo.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>


          {/* desktop lightbox */}


          {/* DESKTOP LIGHTBOX WRAPPER */}
          <div className="hidden md:flex flex-col items-center justify-between w-full h-full p-6 select-none animate-fadeIn"
            onClick={() => closeLightbox()}>

            {/* TOP/CENTER SECTION: FULLSCREEN IMAGE */}
            <div className="relative w-full flex-grow flex items-center justify-center mb-28">
              {/* LEFT ARROW */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-0 text-white/70 hover:text-white text-9xl z-[50] transition-colors"
              >
                ‹
              </button>

              {/* <div className="relative w-full h-full max-w-[80vw] max-h-[80vh]"> */}
              <div className="relative w-full h-full max-w-[95vw] max-h-[90vh]">
                <Image
                  src={selectedImage}
                  alt="Full view"
                  fill
                  className="object-contain rounded-xl"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* RIGHT ARROW */}
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-0 text-white/70 hover:text-white text-9xl z-[50] transition-colors"
              >
                ›
              </button>
            </div>

            {/* BOTTOM SECTION: THUMBNAIL RAIL */}
            <div
              ref={thumbContainerRef}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex gap-2 overflow-x-auto px-6 py-3
                 bg-black/60 backdrop-blur-md rounded-2xl
                 scrollbar-hide
                 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
                 [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
              >
                {filteredPhotos.map((photo, index) => (
                  <button
                    key={photo.id}
                    ref={index === currentIndex ? activeThumbRef : null}
                    onClick={() => {
                      setCurrentIndex(index);
                      setSelectedImage(photo.url);
                    }}                    
                    className={cn(
                      "relative h-14 w-20 cursor-pointer flex-shrink-0 rounded-md overflow-hidden transition-all duration-300",
                      index === currentIndex
                        ? "ring-2 ring-white scale-110 z-10"
                        : "opacity-40 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={photo.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}
