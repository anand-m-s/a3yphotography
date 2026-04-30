"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import DomeGallery from "@/components/DomeGallery";
import { useEffect, useState } from "react";

const packages = [
    {
        title: "Mini Session",
        duration: "1 Hour",
        price: "€120",
        features: [
            "1 Location",
            "15 Edited Photos",
            "Basic Color Grading",
            "48hr Delivery",
        ],
    },
    {
        title: "Standard Session",
        duration: "2 Hours",
        price: "€200",
        features: [
            "2 Locations",
            "30 Edited Photos",
            "Advanced Editing",
            "24hr Delivery",
        ],
        highlight: true,
    },
    {
        title: "Premium Session",
        duration: "4 Hours",
        price: "€350",
        features: [
            "Multiple Locations",
            "60+ Edited Photos",
            "Premium Retouching",
            "Priority Delivery",
        ],
    },
];



export default function ServicesPage() {

    const [images, setImages] = useState([]);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    useEffect(() => {
        fetch("/api/dome?limit=12")
            .then(res => res.json())
            .then(data => {
                const formatted = (data.data || [])
                    .map((item: any) => item.imageUrl)
                    .filter((url: string) => url && url.trim() !== "")
                    .map((url: string) => ({
                        src: url,
                        alt: "A3Y Photography"
                    }));
                setImages(formatted);
            });
    }, []);


    return (
        <div className="min-h-dvh bg-background text-foreground">

            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden  mx-auto mt-4 py-20 px-6 text-center">

                {/* Dome background */}
                <div className="absolute inset-0 ">
                    {images.length > 0 && (



                        <DomeGallery
                            images={images.slice(0, isMobile ? 8 : 12)}
                            fit={isMobile ? 0.5 : 0.6}
                            minRadius={isMobile ? 300 : 400}
                            segments={isMobile ? 10 : 16}
                            dragDampening={isMobile ? 0.85 : 1}
                            grayscale={false}
                            maxVerticalRotationDeg={10}
                            overlayBlurColor="transparent"
                        />

                    )}
                </div>
                {/* Overlay (visual only) */}



                <div
                    className="
                        absolute inset-0 pointer-events-none
                        bg-transparent
                        dark:bg-gradient-to-b
                        dark:from-black/30 dark:via-black/35 dark:to-black/70
                        "/>

                {/* Text */}
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-serif mb-4">
                        Photography Services
                    </h1>

                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Simple, transparent pricing tailored for capturing your best moments.
                    </p>
                </div>

            </section>

            {/* PRICING CARDS */}
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

                    {packages.map((pkg, i) => (
                        <div
                            key={i}
                            // className={cn(
                            //     "rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300",
                            //     "bg-white/50 dark:bg-neutral-900/60 backdrop-blur-xl",
                            //     pkg.highlight
                            //         ? "scale-105 border-black/20 dark:border-white/20 shadow-xl"
                            //         : "border-border hover:scale-[1.02]"
                            // )}
                            className={cn(
                                "rounded-3xl p-8 flex flex-col justify-between transition-all duration-500",
                                "bg-transparent border border-black/10 dark:border-white/10",
                                "hover:border-black/20 dark:hover:border-white/20",
                                "hover:shadow-xl hover:-translate-y-1"
                            )}
                        >
                            <div>
                                <h3 className="text-xl font-semibold mb-1">
                                    {pkg.title}
                                </h3>

                                <p className="text-sm text-muted-foreground mb-4">
                                    {pkg.duration}
                                </p>

                                <p className="text-3xl font-bold mb-6">
                                    {pkg.price}
                                </p>

                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {pkg.features.map((f, idx) => (
                                        <li key={idx}>• {f}</li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/contact"
                                className="mt-8 text-center py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black text-sm font-medium transition hover:opacity-90"
                            >
                                Book Now
                            </Link>
                        </div>
                    ))}

                </div>
            </section>

            {/* CTA */}
            <section className="text-center pb-24 px-6">
                <h2 className="text-3xl font-serif mb-4">
                    Let’s Capture Your Story
                </h2>

                <p className="text-muted-foreground mb-6">
                    Reach out to plan your perfect shoot.
                </p>

                <Link
                    href="/contact"
                    className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
                >
                    Contact Me
                </Link>
            </section>
        </div>
    );
}