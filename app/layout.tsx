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
  title: "A3Y Photography | Abhishek Das – Paris Photographer",
  description: "A3Y Photography (a3yphotography) by Abhishek Das. Paris-based photographer specializing in portraits, landscapes, street photography, and events.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-512.png",
  },



}
export const viewport = {
  themeColor: "#000000",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-dvh flex flex-col font-sans ${GeistSans.variable} ${playfair.variable} antialiased  `} >

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
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
