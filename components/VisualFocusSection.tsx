"use client"

import { Heart, Gift, Sparkles, Check } from "lucide-react"

export function VisualFocusSection() {
  const features = [
    {
      icon: Heart,
      title: "Handmade & Customizable",
      description: "Uniquely crafted by hand for your vision",
    },
    {
      icon: Gift,
      title: "Special Occasions",
      description: "Perfect for weddings, gifts, and milestones",
    },
    {
      icon: Sparkles,
      title: "Made-to-Order",
      description: "Personalized care in every detail",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-start text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F4E7DC] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#C67753]" />
                  </div>
                  <h3 className="font-semibold text-[#1F1A17] mb-2 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#5B514A] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
