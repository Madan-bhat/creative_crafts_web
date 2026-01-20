"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface HeroSectionProps {
  heroTitle?: string
  heroSubtitle?: string
  heroImageUrl?: string
  heroImageAlt?: string
}

export function HeroSection({
  heroTitle,
  heroSubtitle,
  heroImageUrl,
  heroImageAlt,
}: HeroSectionProps) {
  const title = heroTitle || "Beautiful, bespoke crafts that feel personal"
  const subtitle =
    heroSubtitle ||
    "Custom resin art, keepsake boxes, frames, and gifts created in small batches. Thoughtfully designed, carefully detailed, and ready for your story."
  const imageUrl =
    heroImageUrl ||
    "https://images.unsplash.com/photo-1617038260897-41a1b1a6173f?auto=format&fit=crop&w=1400&q=80"
  const imageAlt = heroImageAlt || "Handmade resin art and custom gifts displayed on a wooden table"

  return (
    <section
      id="home"
      className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-[rgba(255,249,242,0.8)] to-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm text-sm text-[#8B5E46]">
              <span className="w-2 h-2 rounded-full bg-[#C67753]" aria-hidden="true" />
              Handmade for celebrations & gifting
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F1A17] leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-base md:text-lg text-[#5B514A] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="bg-[#C67753] hover:bg-[#b96949] text-white shadow-lg font-semibold"
                asChild
              >
                <Link href="/catalog" className="flex items-center gap-2 w-full sm:w-auto justify-center">
                  View Catalog
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#C67753] text-[#1F1A17] hover:bg-[#F1E6DD]"
                asChild
              >
                <Link
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 justify-center"
                >
                  <MessageCircle size={20} />
                  Enquire
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-sm text-[#5B514A]">
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-[#C67753]" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2h.5A1.5 1.5 0 017 5v.5h4V5a1.5 1.5 0 00-1.5-1.5H6a1 1 0 000-2 2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V5a1 1 0 100 2h.5A1.5 1.5 0 0117 5v.5a1 1 0 102 0V5a3.5 3.5 0 00-3.5-3.5H5a1 1 0 000 2 1 1 0 000-2H4v12a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 102 0v1a4 4 0 01-4 4H6a4 4 0 01-4-4V5z" clipRule="evenodd"></path></svg>
                Made-to-order
              </span>
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-[#C67753]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.822l.04.26a1 1 0 00.935.734h3.674a1 1 0 00.935-.734l.04-.26A1 1 0 0113.847 2H16a1 1 0 011 1v2.5a1 1 0 01-.5.866L13 8.345V19a2 2 0 01-2 2H9a2 2 0 01-2-2v-5H4a1 1 0 01-1-1v-3.5a1 1 0 01-.5-.866V3z"></path></svg>
                Ships pan-India
              </span>
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-[#C67753]" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                Gift-ready packaging
              </span>
            </div>
          </div>

          <div className="relative group">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E7D8CC] bg-white">
              <div className="relative aspect-[4/5] md:aspect-[5/6]">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 flex items-center justify-between text-sm text-[#3C2F27] shadow-md">
                <div>
                  <p className="font-semibold">Signature Resin Collection</p>
                  <p className="text-xs text-[#6B5B52]">Each piece hand-poured and finished in small batches</p>
                </div>
                <ArrowRight size={18} className="text-[#C67753]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
