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

    // if (pathname.startsWith("/author")) {
    //     return null; // hide nav on author/admin pages
    // }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/10 dark:bg-background/60 backdrop-blur-md border-b">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-serif text-xl tracking-tight text-foreground  transition-colors"
                    >
                        A3Y PHOTOGRAPHY
                    </Link>

                    <div className="flex items-center gap-8">
                        <ul className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <li className="" key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "text-l tracking-wide transition-all duration-200",
                                            pathname === item.href
                                                ? "text-foreground font-bold"
                                                // : "text-muted-foreground hover:text-accent-foreground"
                                                : " hover:text-gray-200 dark:text-gray-300 dark:hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
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
