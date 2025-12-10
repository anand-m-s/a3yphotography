"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FocusCards } from "@/components/ui/focus-cards"
import { useTheme } from "next-themes"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import { toast } from "sonner"

export default function HomePage() {
  const { theme } = useTheme()




  // const cards = [
  //   {
  //     title: "Nature",
  //     src: "/gallery/Portraits/Montmartre - Paris/IMG_9087-5ps.jpg",
  //   },
  //   {
  //     title: "Indoor",
  //     src: "/gallery/Portraits/Montmartre - Paris/IMG_3212-1-ps.jpg",
  //   },
  //   {
  //     title: "Street",
  //     src: "/gallery/Portraits/Montmartre - Paris/IMG_3446-2.jpg",
  //   },
  // ]

  type TestimonialDoc = {
    _id: string
    name: string
    quote: string
    src: string
    createdAt?: string
  }

  type FeaturedCategory = {
    _id: string;
    name: string;
    slug: string;
    imageUrl: string;
  };

  const [testimonialsData, setTestimonialsData] = useState<TestimonialDoc[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [featured, setFeatured] = useState<FeaturedCategory[]>([]);


  useEffect(() => {
    async function fetchFeatured() {
      const res = await fetch("/api/featured");
      const json = await res.json();
      setFeatured(json.data || []);
    }

    fetchFeatured();
  }, []);





  // simple Fisher–Yates shuffle
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials")
        if (!res.ok) {
          console.error("Failed to fetch testimonials")
          return
        }

        const json = await res.json()
        if (!json.success) {
          console.error("API error:", json.message)
          return
        }

        const shuffled = shuffleArray<TestimonialDoc>(json.data)
        setTestimonialsData(shuffled)
      } catch (err) {
        console.error("Error loading testimonials:", err)
      } finally {
        setLoadingTestimonials(false)
      }
    }

    fetchTestimonials()
  }, [])



  const [form, setForm] = useState<{
    name: string
    quote: string
    file: File | null
    src: string // preview URL from file
  }>({
    name: "",
    quote: "",
    file: null,
    src: "",
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setForm(prev => ({
      ...prev,
      file,
      src: URL.createObjectURL(file), // temporary preview
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.quote || !form.file) return;

    setSubmitting(true);

    try {
      // 1️⃣ Upload image to Cloudinary
      const data = new FormData();
      data.append("file", form.file);
      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
      );

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      if (!cloudName) {
        throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME :(((((((((((((");
      }

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!uploadRes.ok) {
        console.error("Cloudinary upload failed");
        toast.error("upload failed")
        return;
      }


      const uploadJson = await uploadRes.json();
      const imageUrl: string = uploadJson.secure_url;


      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          quote: form.quote,
          src: imageUrl,
        }),
      });

      if (!res.ok) {
        console.error("Failed to save testimonial in DB");
        toast.error("failed to save in db")
        return;
      }
      toast.success("testimonial added sucessfully :)")
      const result = await res.json();

      // 3️⃣ Update UI with saved testimonial
      const saved = result.data; // has name, quote, src, _id, createdAt
      setTestimonialsData((prev) => [saved, ...prev]);

      // 4️⃣ Reset form
      setForm({
        name: "",
        quote: "",
        file: null,
        src: "",
      });
      // e.currentTarget.reset();
    } catch (err) {
      console.error("Error submitting testimonial:", err);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/gallery/Aby/_MG_8432.jpg"
            alt="Hero photography"
            fill
            className="object-cover"
            priority
          />
          {/* if you re-enable gradient, use theme here */}
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-5xl lg:text-6xl mb-6 text-balance">
            Capturing Moments,
            <br />
            Creating Memories
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Paris-based photographer specializing in authentic storytelling through the lens
          </p>
          <Button asChild size="lg" className="font-medium">
            <Link href="/gallery">View Portfolio</Link>
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Introduction
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 text-balance">
              Hello, I&apos;m Abhishek Das
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a photographer based in the heart of Paris, dedicated to
                capturing the beauty of everyday moments and transforming them into
                timeless memories. My work spans across various genres, from intimate
                portraits to sweeping landscapes, vibrant street scenes to memorable
                events.
              </p>
              <p>
                With over a decade of experience, I&apos;ve developed a unique
                perspective that blends technical precision with artistic vision.
                Every photograph tells a story, and I&apos;m here to help you tell
                yours.
              </p>
            </div>
            <div className="mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}


      <section className="py-24 md:py-32 bg-muted/45 rounded-4xl">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Portfolio
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-6">
              Featured Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featured.map((cat) => (
              <Link
                key={cat._id}
                href={`/gallery#${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl text-foreground">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-3.5">
            <Button asChild size="lg">
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* <section className="md:py-18">
        <AnimatedTestimonials testimonials={testimonialsData} />
      </section> */}


      {/* Testimonials + Form */}
      <section className="md:py-24">
        <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[3fr,2fr] items-start">
          {/* Left: animated testimonials or fallback */}
          <div>
            {loadingTestimonials ? (
              <p className="text-sm text-muted-foreground">Loading testimonials...</p>
            ) : testimonialsData.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No testimonials yet. Add the first one on the right.
              </p>
            ) : (
              <AnimatedTestimonials testimonials={testimonialsData} />

            )}
          </div>


          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-background/70 backdrop-blur-sm p-6 space-y-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold tracking-tight">
              Share Your Experience
            </h3>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                name="name"
                value={form.name ?? ""}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
                placeholder="name"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent file:bg-transparent file:border-0 file:mr-3 file:font-medium file:text-sm"
                required
              />

              {form.src && (
                <Image
                  src={form.src}
                  alt="Preview"
                  width={80}
                  height={80}
                  className="mt-2 rounded-md object-cover border"
                />
              )}
            </div>

            {/* Testimonial Quote */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Testimonial</label>
              <textarea
                name="quote"
                value={form.quote ?? ""}
                onChange={handleChange}
                className="w-full min-h-[90px] rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Write the testimonial..."
                required
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Testimonial"}
            </Button>
          </form>

        </div>
      </section>


      {/* Call to Action */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-5xl mb-6 text-balance">
              Let&apos;s Create Something Beautiful Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you&apos;re looking for portrait sessions, event coverage, or
              custom photography projects, I&apos;d love to hear from you.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
