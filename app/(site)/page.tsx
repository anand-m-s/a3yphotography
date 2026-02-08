"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import { toast } from "sonner"



function Shimmer() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* soft base pulse */}
      <div className="absolute inset-0 animate-pulse bg-white/5" />

      {/* moving light */}
      <div
        className="
          absolute inset-y-0 -left-1/2 w-[200%]
          animate-[shimmer_2.5s_ease-in-out_infinite]
          bg-gradient-to-r
          from-transparent
          via-white/12
          to-transparent
        "
      />
    </div>
  );
}





function GalleryCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-sm bg-muted">
      <div
        className="relative w-full bg-muted-foreground/10"
        style={{ aspectRatio: "3 / 4" }}
      >
        <Shimmer />
      </div>

      <div
        // className="absolute bottom-0 left-0 right-0 p-6"
        className="p-2 tracking-widest flex justify-center"
      >
        <div className="relative h-6 w-2/3 rounded bg-muted-foreground/10 overflow-hidden">
          <Shimmer />
        </div>
      </div>
    </div>
  );
}


export default function HomePage() {
  const { theme } = useTheme()

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
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);


  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const previewCount = isDesktop ? 8 : 5;

  const words = [
    {
      text: "Hello",
    },
    {
      text: "I'm",
    },
    {
      text: "Abhishek",
      className: "text-slate-700 dark:text-slate-300",
    },
    {
      text: "Das",
      className: "text-slate-700 dark:text-slate-300",
    }






  ];



  useEffect(() => {
    async function fetchFeatured() {
      const res = await fetch("/api/featured");
      const json = await res.json();

      const data = json.data || [];


      setFeatured(data);
      setIsLoading(false);
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
    <div className="min-h-dvh ">
      {/* Hero Section */}
      <section className="relative min-h-dvh overflow-hidden flex items-center justify-center">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-black animate-heroImage"
          style={{
            backgroundImage: `url('/gallery/Aby/_MG_8432.jpg')`,
          }}
        />

        {/* GRADIENT OVERLAY */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 pointer-events-none" />

        {/* CONTENT */}
        {/* <div className="relative z-10 container mx-auto px-6 text-center"> */}
        <div className="relative z-10 container mx-auto px-6 text-center animate-fadeIn">

          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-balance">
            Capturing Moments,<br />Creating Memories
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Paris based photographer specializing in authentic storytelling through the lens
          </p>

          <Button asChild size="lg">
            <Link href="/gallery"
              className="tracking-widest uppercase text-sm font-light"
            >Explore Gallery</Link>
          </Button>
        </div>

      </section>




      {/* Introduction Section */}
      <section className="py-16 md:py-24 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">

            {/* <h2
              className="font-serif text-3xl md:text-5xl mb-8 text-balance">
              Hello, I&apos;m Abhishek Das
            </h2> */}
            <div
              className="mb-8"
            >

              <TypewriterEffect words={words} />
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm a photographer based in Paris. I capture people and moments as they truly are, natural, warm, and full of life. Every photograph I create is meant to feel real, honest, and unforgettable.
              </p>
             

            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Work Preview */}


      <section className="py-24 md:py-24 bg-muted/45 rounded-4xl">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl mb-6">
              Featured Work
            </h2>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {isLoading
              ? Array.from({ length: previewCount }).map((_, i) => (
                <GalleryCardSkeleton key={i} />
              ))
              : featured.slice(0, previewCount).map((cat) => (
                <Link
                  key={cat._id}
                  href={`/gallery#${cat.slug}`}
                  className="group relative overflow-hidden rounded-sm"
                >
                  <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw,
                     (max-width: 1024px) 50vw,
                     25vw"
                      className="object-cover"
                    />
                  </div>

                  <div
                    // className="absolute bottom-0 left-0 right-0 p-6"
                    className="p-2 tracking-widest flex justify-center"
                  >
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



      <section className="md:py-20">
        <div className="container mx-auto px-1">
          <p className="text-center uppercase tracking-widest text-muted-foreground md:mt-0 mt-20">
            Testimonials
          </p>
          <div className="relative min-h-[872px] md:min-h-[550px] overflow-hidden">
            {loadingTestimonials ? (
              <div className="mx-auto max-w-sm px-4 py-20 md:max-w-4xl md:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

                  {/* Image placeholder */}
                  <div className="relative h-80 w-full rounded-3xl bg-muted/70 animate-pulse" />

                  {/* Text placeholder */}
                  <div className="flex flex-col justify-between py-2 space-y-4">
                    <div className="h-6 w-1/3 rounded bg-muted animate-pulse" />
                    <div className="space-y-3">
                      <div className="h-4 w-full rounded bg-muted animate-pulse" />
                      <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                      <div className="h-4 w-4/6 rounded bg-muted animate-pulse" />
                    </div>

                    {/* Buttons placeholder (desktop only) */}
                    <div className="hidden md:flex gap-4 pt-12">
                      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ) : testimonialsData.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No testimonials yet. Add the first one on the right.
              </p>
            ) : (
              <AnimatedTestimonials testimonials={testimonialsData} />

            )}
          </div>
        </div>
      </section>


      <section className="py-24 md:py-24 bg-muted/45 rounded-4xl">
        <div className="container mx-auto px-3">
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm p-6 md:p-8 shadow-lg max-w-xl mx-auto transition-colors"
            >
              {/* header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-semibold leading-tight text-black dark:text-white">
                    Share Your Experience
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-neutral-300 mt-1">
                    A short, honest note helps others trust the journey.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {/* Name */}
                <label className="block">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</span>
                  <input
                    name="name"
                    value={form.name ?? ""}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="mt-2 block w-full rounded-lg border border-input bg-white/0 dark:bg-transparent px-4 py-3 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-black dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                    aria-label="Name"
                  />
                </label>

                {/* Photo + Avatar preview */}
                <div>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Photo</span>

                  <div className="mt-2 flex items-center gap-4">
                    {/* avatar preview */}
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center border border-border">
                      {form.src ? (
                        <img src={form.src} alt={form.name || "avatar"} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          {form.name ? form.name.charAt(0).toUpperCase() : "📷"}
                        </div>
                      )}
                    </div>

                    {/* styled file input */}
                    <div className="flex-1">
                      <label
                        htmlFor="testimonial-photo"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input cursor-pointer text-sm hover:bg-neutral-50 hover:dark:bg-neutral-800 transition text-neutral-800 dark:text-neutral-100"
                      >
                        {/* icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-600 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 8l-4-4m0 0L8 8m4-4v12" />
                        </svg>

                        <span className="text-sm">Choose photo</span>
                      </label>
                      <input
                        id="testimonial-photo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <label className="block">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Testimonial</span>
                  <textarea
                    name="quote"
                    value={form.quote ?? ""}
                    onChange={handleChange}
                    placeholder="Write a short review — what did you love?"
                    required
                    className="mt-2 block w-full min-h-[110px] rounded-lg border border-input bg-white/0 dark:bg-transparent px-4 py-3 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-black dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition resize-none"
                    aria-label="Testimonial"
                  />
                </label>

                {/* small helper row */}
                <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                  <div>
                    {/* <span className="underline">guidelines</span> */}
                  </div>
                  <div>{form.quote ? `${form.quote.length}/500` : "0/500"}</div>
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-shadow shadow-md
             bg-black text-white hover:bg-neutral-900
             dark:bg-white dark:text-black dark:hover:bg-neutral-200
             disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>Adding...</span>
                      </>
                    ) : (
                      "Add Testimonial"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>


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
