"use client"

import { Sparkles } from "lucide-react"

export function MakerStory() {
  return (
    <section className="py-12 md:py-16 bg-[#F4E7DC]/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-[#C67753]">
            <Sparkles size={20} />
            <span className="text-sm font-semibold uppercase tracking-wide">Our Story</span>
            <Sparkles size={20} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F1A17]">
            Handmade with Heart, Crafted for Your Story
          </h2>
          
          <p className="text-base md:text-lg text-[#5B514A] leading-relaxed max-w-2xl mx-auto">
            Every piece is created in small batches, hand-poured with intention. We believe the best gifts aren't just beautiful—they're personal. Whether it's a wedding keepsake, a custom order for a loved one, or art that brings color to a room, we pour care and emotion into every detail.
          </p>
          
          <div className="grid grid-cols-3 gap-6 pt-6 md:pt-8">
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-[#C67753]">100%</p>
              <p className="text-xs md:text-sm text-[#5B514A]">Hand-crafted</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-[#C67753]">Custom</p>
              <p className="text-xs md:text-sm text-[#5B514A]">Made-to-order</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-[#C67753]">Pan-India</p>
              <p className="text-xs md:text-sm text-[#5B514A]">Fast shipping</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
