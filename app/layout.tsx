import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creative Crafts - Handmade Crafts, Made Personal",
  description: "Custom gifts, wedding keepsakes, and resin art—crafted with care, emotion, and detail. Handmade crafts for your special moments.",
  keywords: "handmade crafts, custom gifts, wedding keepsakes, resin art, personalized gifts, custom frames",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
