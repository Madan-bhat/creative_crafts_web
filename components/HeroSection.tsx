"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111111] mb-6 leading-tight">
            Handmade Crafts,
            <br />
            <span className="text-[#6B7280]">Made Personal</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto">
            Custom gifts, wedding keepsakes, and resin art—crafted with care, emotion, and detail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#111111] hover:bg-[#111111]/90 text-white"
              asChild
            >
              <Link
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Enquire on WhatsApp
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-[#111111] text-[#111111] hover:bg-[#F5F5F5]"
              asChild
            >
              <Link href="#catalog" className="flex items-center gap-2">
                View Catalog
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
