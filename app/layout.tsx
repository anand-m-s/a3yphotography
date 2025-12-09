import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerProvider } from "@/components/sonner-provider"
import { ConfirmProvider } from "@/components/ui/confirm-dialog";

import "./globals.css"


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Abhishek Das | Photographer",
  description: "Paris-based photographer specializing in portraits, landscapes, street photography, and events",


}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ConfirmProvider>
            <main>{children}</main>
          </ConfirmProvider>
          <SonnerProvider />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
