export function Footer() {

    return (
        <footer className=" border-t bg-muted/25 border">
            <div className="container mx-auto px-6 md:py-4 py-12">
                <div className="flex flex-col items-center text-center gap-6">

                    {/* Brand / SEO */}
                    <div className="space-y-2">
                        <p className="font-serif text-lg tracking-tight text-foreground">
                            A3Y Photography{" "}
                            <span className="text-muted-foreground font-normal">
                                (a3yphotography)
                            </span>
                        </p>
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.instagram.com/aby7269/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {/* Instagram icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="3.5" />
                                <circle cx="17.5" cy="6.5" r="1" />
                            </svg>
                        </a>
                       

                        <a
                            href="https://www.behance.net/aby7269/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Behance"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {/* Behance icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M6.5 12.5H4v3h2.5c1.1 0 1.8-.6 1.8-1.5s-.7-1.5-1.8-1.5z" />
                                <path d="M6.3 11c.9 0 1.5-.5 1.5-1.3S7.2 8.5 6.3 8.5H4V11h2.3z" />
                                <path d="M13 10.5c-1.7 0-3 1.3-3 3s1.3 3 3 3c1.3 0 2.4-.7 2.8-1.8h-1.4c-.3.4-.8.6-1.4.6-.9 0-1.6-.5-1.8-1.3h4.7c.1-.2.1-.5.1-.7 0-1.6-1.3-2.8-3-2.8z" />
                                <path d="M11.5 8h3v-1h-3z" />
                            </svg>
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-muted-foreground">
                        © 2026 A3Y Photography. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>

    )

}