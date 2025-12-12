// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

// const navItems = [
//     { href: "/", label: "Home" },
//     { href: "/gallery", label: "Gallery" },
//     { href: "/about", label: "About" },
//     { href: "/contact", label: "Contact" },
// ]

// export function Navigation() {
//     const pathname = usePathname()
//     const { theme, setTheme } = useTheme()

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 bg-background/10 dark:bg-background/60 backdrop-blur-md border-b">
//             <div className="container mx-auto px-6 py-4">
//                 <div className="flex items-center justify-between">

//                     <Link href="/" className="flex items-center gap-3 group transition-colors">

//                         <span className="font-serif text-xl tracking-tight text-foreground  transition-colors">
//                             A3Y Photography
//                         </span>
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth={1.6}
//                             className="w-7 h-7 text-foreground  transition-colors"
//                         >
//                             <path d="M20 7h-2.586l-1.707-1.707A1 1 0 0 0 15 5h-4a1 1 0 0 0-.707.293L8.586 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
//                             <circle cx="13" cy="13" r="3.5" />
//                         </svg>
//                     </Link>


//                     <div className="flex items-center gap-8">


//                         <ul className="hidden md:flex items-center gap-4">
//                             {navItems.map((item) => {
//                                 const active = pathname === item.href;

//                                 return (
//                                     <li key={item.href} className="group">
//                                         <Link
//                                             href={item.href}
//                                             className={cn(
//                                                 "relative inline-flex items-center px-4 py-2 rounded-full font-medium transition-colors duration-200",
//                                                 active
//                                                     ? "text-foreground font-semibold"
//                                                     : "text-black dark:text-neutral-300"
//                                             )}
//                                         >
//                                             {/* background glow / hover bubble */}
//                                             <span
//                                                 className={cn(
//                                                     "absolute inset-0 rounded-full transition-all duration-300",
//                                                     active
//                                                         ? // active link bubble
//                                                         "bg-black/5 dark:bg-white/10 opacity-100"
//                                                         : // hover bubble (toggle button style)
//                                                         "bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100"
//                                                 )}
//                                                 aria-hidden="true"
//                                             />

//                                             {/* text */}
//                                             <span className="relative z-10">{item.label}</span>
//                                         </Link>
//                                     </li>
//                                 );
//                             })}
//                         </ul>



//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                             className="h-9 w-9"
//                         >
//                             <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//                             <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//                             <span className="sr-only">Toggle theme</span>
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }





"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Images, User, Mail, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Navigation() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/10 dark:bg-background/60 backdrop-blur-md border-b">
                <div className="container mx-auto px-6 py-3 flex items-center justify-between">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="font-serif text-lg tracking-tight">
                            A3Y Photography
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-foreground group-hover:text-accent transition"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth={1.4}
                        >
                            <path d="M20 7h-2.6l-1.7-1.7A1 1 0 0 0 15 5h-4l-2 2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
                            <circle cx="13" cy="13" r="3.5" />
                        </svg>
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
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="h-9 w-9"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
                        </Button>

                        {/* MOBILE ONLY HAMBURGER */}
                        <Button
                            variant="ghost"
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
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                        onClick={() => setOpen(false)}
                    />

                    {/* SLIDING SIDEBAR PANEL */}
                    <div
                        className="
                                relative h-full w-72
                                bg-white/20 dark:bg-neutral-900/40
                                backdrop-blur-xl border-r border-white/20 dark:border-white/10 
                                shadow-2xl p-6
                                animate-slide-in
                                flex flex-col   
                            "
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-neutral-700 dark:text-neutral-300 hover:opacity-70"
                            onClick={() => setOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* <h3 className="font-serif text-2xl font-semibold mb-8 text-neutral-900 dark:text-neutral-100">
                            Menu
                        </h3> */}

                        {/* NAV LINKS */}
                        <nav className="flex flex-col gap-5 mt-10">
                            {[
                                { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
                                { href: "/gallery", label: "Gallery", icon: <Images className="h-5 w-5" /> },
                                { href: "/about", label: "About", icon: <User className="h-5 w-5" /> },
                                { href: "/contact", label: "Contact", icon: <Mail className="h-5 w-5" /> },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                        pathname === item.href
                                            ? "bg-black/10 dark:bg-white/10 text-black dark:text-white"
                                            : "text-neutral-800 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10"
                                    )}
                                >
                                    <span className="text-neutral-700 dark:text-neutral-200">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
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
`}</style>

        </>
    );
}
