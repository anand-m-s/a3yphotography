"use client"

import { Instagram, Mail } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div
      className="
        min-h-screen pt-24 pb-16 
        bg-gradient-to-b from-background via-background/50 to-background
        dark:bg-gradient-to-b dark:from-black dark:via-neutral-900 dark:to-black
      "
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether it's portraits, events, or something uniquely yours — let's create something meaningful together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* LEFT SIDE — Social & Email */}
            <div className="animate-slideUp">
              <h2 className="font-serif text-2xl md:text-3xl mb-8">Let’s Connect</h2>

              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                I reply fastest on Instagram. Feel free to check out my work and message me anytime.
              </p>

              {/* Email */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-accent/10 rounded-full group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a
                      href="mailto:aby.7269@gmail.com"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      aby.7269@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <h3 className="font-serif text-xl mb-4">Follow My Work</h3>
              <div className="flex gap-4">
                {/* Instagram */}
                <SocialIcon href="https://www.instagram.com/aby7269/">
                  <Instagram className="h-5 w-5" />
                </SocialIcon>

                {/* Facebook */}
                <SocialIcon href="https://www.facebook.com/aby7269">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                  </svg>
                </SocialIcon>

                {/* Behance */}
                <SocialIcon href="https://www.behance.net/aby7269">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.86 11.083c.595-.285 1.017-.86 1.017-1.74 0-1.704-1.266-2.343-2.88-2.343H3v9.678h5.222c1.692 0 3.029-.987 3.029-2.818 0-1.238-.61-2.063-1.391-2.377zm-4.072-2.88h2.322c.747 0 1.266.36 1.266 1.08 0 .72-.519 1.095-1.266 1.095H5.788V8.203zm2.447 6.322H5.788v-2.46h2.447c.86 0 1.421.495 1.421 1.23 0 .733-.56 1.23-1.421 1.23zm9.102-6.059c-2.322 0-3.938 1.53-3.938 4.11 0 2.637 1.616 4.143 4.003 4.143 1.876 0 3.11-.99 3.484-2.686l.015-.074h-1.83l-.015.044c-.18.802-.778 1.274-1.639 1.274-1.095 0-1.844-.81-1.875-2.04h5.373l.015-.074c.015-.134.03-.33.03-.57 0-2.25-1.45-3.78-3.623-3.78zm-1.78 3.37c.12-.93.78-1.544 1.72-1.544.963 0 1.624.614 1.704 1.544h-3.424zM17.75 6.25h3.2V7.5h-3.2V6.25z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>

            {/* RIGHT SIDE — Insta Button */}
            <div
              className="
                bg-card border border-border rounded-3xl p-10 shadow-xl 
                backdrop-blur-md animate-fadeIn delay-100
              "
            >
              <h2 className="font-serif text-3xl mb-6">Message Me on Instagram</h2>

              {/* <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                The easiest and fastest way to reach me.  
                Click the button below and send a DM instantly.
              </p> */}

              {/* INSTAGRAM GRADIENT BORDER BUTTON */}
              <Link
                href="https://www.instagram.com/aby7269/"
                target="_blank"
                className="
                  relative inline-flex items-center gap-3 px-7 py-3 rounded-full 
                  text-white font-medium shadow-md transition-all 
                  hover:scale-105 active:scale-95
                  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                "
              >
                <Instagram className="h-5 w-5" />
                Send a DM
              </Link>

              <p className="text-sm text-muted-foreground mt-6">
                I usually reply within a few hours.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

/* Reusable Social Icon with floating animation */
function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        p-3 rounded-full bg-secondary 
        hover:bg-accent hover:text-accent-foreground 
        transition-all shadow-sm
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {children}
    </Link>
  )
}
