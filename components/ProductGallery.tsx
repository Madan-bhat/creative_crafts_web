"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: { url: string; alt?: string }[]
  fallbackAlt: string
}

export function ProductGallery({ images, fallbackAlt }: ProductGalleryProps) {
  const safeImages = images.length > 0 ? images : [{ url: "", alt: fallbackAlt }]
  const [activeIndex, setActiveIndex] = useState(0)
  const active = safeImages[activeIndex]

  return (
    <div className="space-y-3">
      <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E7D8CC] bg-white">
        <div className="relative aspect-[4/5] md:aspect-[5/6]">
          {active.url ? (
            <Image
              src={active.url}
              alt={active.alt || fallbackAlt}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-amber-50 flex items-center justify-center text-[#5B514A] text-lg">
              Image coming soon
            </div>
          )}
        </div>
      </div>

      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {safeImages.map((img, idx) => (
            <button
              key={`${img.url}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden border",
                idx === activeIndex ? "border-[#C67753]" : "border-transparent"
              )}
              aria-label={`View image ${idx + 1}`}
            >
              {img.url ? (
                <Image
                  src={img.url}
                  alt={img.alt || fallbackAlt}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-[#F1E6DD] flex items-center justify-center text-[#5B514A] text-xs">
                  Image
                </div>
              )}
              {idx === activeIndex && (
                <span className="absolute inset-0 ring-2 ring-[#C67753] ring-offset-1 ring-offset-white pointer-events-none" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
