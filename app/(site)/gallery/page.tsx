"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All Work" },
  { id: "portraits", label: "Portraits" },
  { id: "Marriage", label: "Marriage" },
  { id: "street", label: "Street" },
  { id: "events", label: "Events" },
]

const photos = [
  { id: 1, category: "portraits", query: "elegant portrait photography, natural light, professional", img: "/gallery/Portraits/Montmartre - Paris/IMG_2391-3-ps.jpg" },
  { id: 2, category: "Marriage", query: "French countryside landscape, golden hour", img: "/gallery/Marriage/_H5A2164.jpg" },
  { id: 3, category: "street", query: "Paris street photography, candid moment", img: "/gallery/Portraits/Musee Du Louvre - Paris/_O1A4531.JPG" },
  { id: 4, category: "events", query: "elegant wedding photography, romantic ceremony", img: "/gallery/Events/_MG_2212.JPEG" },
  { id: 5, category: "portraits", query: "fashion portrait photography, studio lighting", img: "/gallery/Portraits/Montmartre - Paris/IMG_3045-2.jpg" },
  { id: 6, category: "Marriage", query: "mountain landscape photography, dramatic sky", img: "/gallery/Marriage/_H5A2914.jpg" },
  { id: 7, category: "street", query: "urban street photography, Paris cafe scene", img: "/gallery/Portraits/Musee Du Louvre - Paris/_O1A6597.JPG" },
  { id: 8, category: "events", query: "corporate event photography, professional", img: "/gallery/Events/_MG_2436.JPEG" },
  { id: 9, category: "portraits", query: "family portrait photography, outdoor natural light", img: "/gallery/Portraits/Musee Du Louvre - Paris/_O1A9820.JPG" },
  { id: 10, category: "Marriage", query: "coastal landscape photography, sunset", img: "/gallery/Marriage/_H5A2178.jpg" },
  { id: 11, category: "street", query: "black and white street photography, Paris", img: "/gallery/Portraits/Tour Eiffel - Paris/_O1A8155.JPEG" },
  { id: 12, category: "events", query: "birthday celebration photography, candid moments", img: "/gallery/Events/_MG_2503.JPEG" },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPhotos = activeCategory === "all" ? photos : photos.filter((photo) => photo.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">Portfolio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An exhibition of my photography across various genres
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-2 rounded-full text-sm tracking-wide transition-all",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer">
              <Image
                src={photo.img}
                alt={`Photography ${photo.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
