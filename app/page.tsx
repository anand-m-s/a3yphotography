"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FocusCards } from "@/components/ui/focus-cards"
import { useTheme } from "next-themes"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function HomePage() {

  const { theme } = useTheme();

  const cards = [
    {
      title: "Nature",
      src: "/gallery/Portraits/Montmartre - Paris/IMG_9087-5ps.jpg"
    },
    {
      title: "Indoor",
      src: "/gallery/Portraits/Montmartre - Paris/IMG_3212-1-ps.jpg"
    },
    {
      title: "Street",
      src: "/gallery/Portraits/Montmartre - Paris/IMG_3446-2.jpg"
    },
  ]


   const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/gallery/Portraits/Tour Eiffel - Paris/_O1A8250.JPEG",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/gallery/Portraits/Musee Du Louvre - Paris/_O1A2473.JPG",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/gallery/Portraits/Tour Eiffel - Paris/_O1A8250.JPEG",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/gallery/Portraits/Musee Du Louvre - Paris/_O1A2473.JPG",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/gallery/Portraits/Tour Eiffel - Paris/_O1A8250.JPEG",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image src="/gallery/Aby/_MG_8432.jpg" alt="Hero photography" fill className="object-cover" priority />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" /> */}
          {/* <div
            className={`absolute inset-0 transition-all duration-500 ${theme === "dark"
                ? "bg-gradient-to-b from-background/60 via-background/40 to-background"
                : "bg-gradient-to-b from-transparent via-white/10 to-white/30"
              }`}
          /> */}
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
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Introduction</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 text-balance">Hello, I'm Abhishek Das</h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm a photographer based in the heart of Paris, dedicated to capturing the beauty of everyday moments
                and transforming them into timeless memories. My work spans across various genres, from intimate
                portraits to sweeping landscapes, vibrant street scenes to memorable events.
              </p>
              <p>
                With over a decade of experience, I've developed a unique perspective that blends technical precision
                with artistic vision. Every photograph tells a story, and I'm here to help you tell yours.
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
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Portfolio</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-6">Featured Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated selection of my recent projects across different photography styles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Portraits", query: "elegant portrait photography, natural light", img: "/gallery/Portraits/Musee Du Louvre - Paris/_O1A4161.JPG" },
              { title: "Couples", query: "French countryside landscape photography", img: "/gallery/Couple/_O1A9803.JPG" },
              { title: "Marriage", query: "Paris street photography, candid moments", img: "/gallery/Marriage/_H5A3097.jpg" },
              { title: "Events", query: "elegant wedding photography, romantic", img: "/gallery/Events/_MG_2212.JPEG" },
            ].map((category) => (
              <Link
                key={category.title}
                href={`/gallery#${category.title.toLowerCase()}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <Image
                  src={category.img}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" /> */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl text-foreground">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <section className=" md:py-10">
            <FocusCards cards={cards} />
          </section>

          <div className="text-center mt-3.5">
            <Button asChild size="lg">
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className=" md:py-10">
        <AnimatedTestimonials testimonials={testimonials} />;
      </section>

      {/* Call to Action */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-5xl mb-6 text-balance">
              Let's Create Something Beautiful Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're looking for portrait sessions, event coverage, or custom photography projects, I'd love to
              hear from you.
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
