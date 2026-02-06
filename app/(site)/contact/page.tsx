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
            Whether it's portraits, events, or something uniquely yours let's create something meaningful together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* LEFT SIDE — Social & Email */}
            <div className="animate-slideUp">
              <h2 className="font-serif text-2xl md:text-3xl mb-8">Let’s Connect</h2>

              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Feel free to check out my work and message me anytime.
              </p>

              {/* Email */}
              {/* Email */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-500 dark:text-indigo-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4h16v16H4V4z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 6l-10 7L2 6"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a
                      href="mailto:aby.7269@gmail.com"
                      className="text-muted-foreground  transition-colors"
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

            {/* RIGHT SIDE — WhatsApp Button */}
            <div
              className="
    bg-card border border-border rounded-3xl p-10 shadow-xl 
    backdrop-blur-md animate-fadeIn delay-100
  "
            >
              <h2 className="font-serif text-3xl mb-6">Message Me on WhatsApp</h2>

              {/* WhatsApp Button */}
              <Link
                href="https://wa.me/+33759624141?text=Hi%20Abhishek,%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20talk%20about%20a%20photoshoot!"
                target="_blank"
                className="
              relative inline-flex items-center gap-3 px-7 py-3 rounded-full 
              text-white font-medium shadow-md transition-all 
              hover:scale-105 active:scale-95
              bg-gradient-to-r from-[#25D366] to-[#128C7E]"

              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.52 3.48A11.84 11.84 0 0012 .33a11.68 11.68 0 00-11.7 11.7A11.42 11.42 0 003.53 20L2 24l4.22-1.48A11.72 11.72 0 0012 23.38a11.68 11.68 0 0011.7-11.7 11.84 11.84 0 00-3.18-8.2zM12 21a9.38 9.38 0 01-4.77-1.3l-.34-.2-2.5.88.85-2.44-.22-.36A9.39 9.39 0 1121.4 12 9.46 9.46 0 0112 21zm5.24-6.91c-.29-.15-1.72-.85-1.99-.95s-.46-.15-.66.15-.76.95-.93 1.15-.34.22-.63.07a7.71 7.71 0 01-2.27-1.4 8.53 8.53 0 01-1.58-2c-.16-.29 0-.45.11-.6.11-.15.29-.36.44-.52a2 2 0 00.29-.48.54.54 0 000-.52c-.07-.15-.66-1.59-.91-2.18s-.48-.5-.66-.5h-.57a1.09 1.09 0 00-.79.37A3.32 3.32 0 006 8.42a5.81 5.81 0 001 3.07 13.51 13.51 0 004.4 4.33 15.34 15.34 0 001.61.84 3.87 3.87 0 001.79.11 3 3 0 002-1.41 2.41 2.41 0 00.18-1.41c-.08-.14-.26-.22-.56-.37z" />
                </svg>

                WhatsApp
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


