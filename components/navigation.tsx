"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
]

export function Navigation() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/10 dark:bg-background/60 backdrop-blur-md border-b">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">

                    <Link href="/" className="flex items-center gap-3 group transition-colors">

                        <span className="font-serif text-xl tracking-tight text-foreground  transition-colors">
                            A3Y Photography
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.6}
                            className="w-7 h-7 text-foreground  transition-colors"
                        >
                            <path d="M20 7h-2.586l-1.707-1.707A1 1 0 0 0 15 5h-4a1 1 0 0 0-.707.293L8.586 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
                            <circle cx="13" cy="13" r="3.5" />
                        </svg>
                    </Link>


                    <div className="flex items-center gap-8">

                        {/* <ul className="hidden md:flex items-center gap-4">
                            {navItems.map((item) => (
                                <li key={item.href} className="group">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "relative inline-flex items-center px-3 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition",
                                            pathname === item.href
                                                ? "font-bold text-foreground"
                                                : "text-black dark:text-neutral-300"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "absolute inset-0 rounded-full transition-opacity duration-200",
                                                pathname === item.href
                                                    ? "bg-white/6 dark:bg-black/30 opacity-100"
                                                    : "bg-white/10 dark:bg-white/6 opacity-0 group-hover:opacity-100"
                                            )}
                                            aria-hidden
                                        />
                                        <span className="relative z-10">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul> */}

                        <ul className="hidden md:flex items-center gap-4">
                            {navItems.map((item) => {
                                const active = pathname === item.href;

                                return (
                                    <li key={item.href} className="group">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "relative inline-flex items-center px-4 py-2 rounded-full font-medium transition-colors duration-200",
                                                active
                                                    ? "text-foreground font-semibold"
                                                    : "text-black dark:text-neutral-300"
                                            )}
                                        >
                                            {/* background glow / hover bubble */}
                                            <span
                                                className={cn(
                                                    "absolute inset-0 rounded-full transition-all duration-300",
                                                    active
                                                        ? // active link bubble
                                                        "bg-black/5 dark:bg-white/10 opacity-100"
                                                        : // hover bubble (toggle button style)
                                                        "bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100"
                                                )}
                                                aria-hidden="true"
                                            />

                                            {/* text */}
                                            <span className="relative z-10">{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>



                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="h-9 w-9"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
