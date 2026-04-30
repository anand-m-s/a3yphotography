"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Home, Images, User, Mail, Menu, X, Sun, Moon, Briefcase, Package } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Navigation() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);


    const closeMenu = () => {
        setClosing(true);

        setTimeout(() => {
            setOpen(false);
            setClosing(false);
        }, 300);
    };

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [open]);




    return (
        <>
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/10 dark:bg-background/60 backdrop-blur-md border-b">
                <div className="container mx-auto px-6  py-4 flex items-center justify-between">

                    <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition">
                        {/* <Image
                            src="/icons/icon-192.png"
                            alt="A3Y Photography"
                            width={40}
                            height={40}
                            className="object-contain rounded-3xl"
                            priority
                        /> */}
                        <div className="flex flex-col leading-none">
                            <span className="font-serif text-xl tracking-[0.2em]">
                                A3Y
                            </span>
                            <span className="text-[10px] tracking-[0.4em] text-muted-foreground">
                                PHOTOGRAPHY
                            </span>
                        </div>
                    </Link>

                    {/* DESKTOP NAV LINKS */}
                    <ul className="hidden md:flex items-center gap-4">
                        {navItems.map((item) => (
                            <li key={item.href} className="group">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "relative inline-flex items-center px-4 py-2 rounded-full transition-all",
                                        pathname === item.href ? "font-bold text-foreground" : "text-black dark:text-neutral-300"
                                    )}
                                >
                                    {/* Hover highlight bubble */}
                                    <span
                                        className={cn(
                                            "absolute inset-0 rounded-full transition-opacity",
                                            pathname === item.href
                                                ? "bg-black/5 dark:bg-white/10 opacity-100"
                                                : "bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100"
                                        )}
                                    />
                                    <span className="relative z-10">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* THEME TOGGLE + MOBILE HAMBURGER */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="default"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="h-9 w-9"

                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
                        </Button>


                        <Button
                            variant="default"
                            size="icon"
                            onClick={() => setOpen(true)}
                            className="h-9 w-9 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>



                </div>
            </nav>

            {/* ============================
    MOBILE SIDEBAR (md:hidden)
============================= */}
            {open && (
                <div className="md:hidden fixed inset-0 z-50 flex">

                    {/* BACKDROP */}
                    <div
                        className={cn(
                            "absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-300",
                            closing ? "opacity-0" : "opacity-100"
                        )}
                        onClick={closeMenu}
                    />



                    {/* SLIDING SIDEBAR PANEL */}
                    <div

                        className={cn(
                            `relative h-full w-[85vw] max-w-[340px]
                                    bg-white/20 dark:bg-neutral-900/40
                                    backdrop-blur-xl border-r border-white/20 dark:border-white/10
                                    shadow-2xl p-6
                                    flex flex-col
                                    rounded-r-3xl
                                    will-change-transform
                                    `,
                            closing ? "animate-slide-out" : "animate-slide-in"
                        )}

                        onTouchStart={(e) => {
                            (e.currentTarget as any).startX = e.touches[0].clientX;
                        }}
                        onTouchEnd={(e) => {
                            const startX = (e.currentTarget as any).startX;
                            const endX = e.changedTouches[0].clientX;

                            if (startX - endX > 60) {
                                closeMenu(); // 👈 swipe left closes menu
                            }
                        }}
                    >



                        <div className="flex flex-col items-center gap-3 pb-6 border-b border-black/10 dark:border-white/10">
                            <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-black/10 dark:ring-white/20">

                                {/* Skeleton */}
                                {!imgLoaded && (
                                    <div
                                        // className="absolute inset-0 bg-neutral-300 dark:bg-neutral-700 animate-pulse" 
                                        className="absolute inset-0 skeleton-shimmer"
                                    />
                                )}

                                <Image
                                    src="/gallery/Aby/profilepic.webp"
                                    alt="A3Y Photography profile"
                                    fill
                                    className={cn(
                                        "object-cover scale-[1.34] object-center transition-opacity duration-500",
                                        imgLoaded ? "opacity-100" : "opacity-0"
                                    )}
                                    sizes="112px"
                                    priority
                                    onLoadingComplete={() => setImgLoaded(true)}
                                />
                            </div>



                            <p className="font-serif text-sm tracking-wide text-foreground">
                                A3Y Photography
                            </p>
                        </div>


                        {/* NAV LINKS */}
                        <nav className="flex flex-col gap-5 mt-12">
                            {[
                                { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
                                { href: "/gallery", label: "Gallery", icon: <Images className="h-5 w-5" /> },
                                { href: "/services", label: "Services", icon: <Package className="h-5 w-5" /> },
                                { href: "/about", label: "About", icon: <User className="h-5 w-5" /> },
                                { href: "/contact", label: "Contact", icon: <Mail className="h-5 w-5" /> },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={cn(
                                        "flex items-center justify-center px-4 py-3 rounded-xl transition-all",
                                        pathname === item.href
                                            ? "bg-black/15 dark:bg-white/15 text-black dark:text-white scale-[1.02]"
                                            : "text-neutral-950 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10"
                                    )}
                                >
                                    {/* fixed-width group keeps all rows aligned */}
                                    <div className="flex items-center gap-3 w-32">
                                        <span className="text-neutral-950 dark:text-neutral-200 shrink-0">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto pt-8 border-t border-black/10 dark:border-white/10">
                            <p className="text-xs text-muted-foreground text-center">
                                © A3Y Photography
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Animations */}
            <style>{`
  @keyframes slide-in {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .animate-slide-in {
    animation: slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-fade-in {
    animation: fade-in 0.4s ease-out;
  }

  @keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.animate-slide-out {
  animation: slide-out 0.3s cubic-bezier(0.4, 0, 1, 1);
}

`}</style>

        </>
    );
}
