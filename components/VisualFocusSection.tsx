"use client"

import { Badge } from "@/components/ui/badge"
import { Heart, Gift, Sparkles } from "lucide-react"

export function VisualFocusSection() {
  const features = [
    {
      icon: Heart,
      title: "100% Handmade & Customizable",
      description: "Every piece is uniquely crafted by hand",
      color: "bg-pink-50",
      delay: "animate-delay-200",
    },
    {
      icon: Gift,
      title: "Wedding & Gift Specialists",
      description: "Perfect for your special moments",
      color: "bg-purple-50",
      delay: "animate-delay-400",
    },
    {
      icon: Sparkles,
      title: "Made-to-Order with Care",
      description: "Personalized attention to every detail",
      color: "bg-amber-50",
      delay: "animate-delay-600",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Central Visual */}
          <div className="relative mb-16">
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl bg-gradient-to-br from-pink-100 via-purple-50 to-amber-50 shadow-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center mb-6 shadow-lg">
                    <Heart className="w-16 h-16 md:w-24 md:h-24 text-[#111111]" />
                  </div>
                  <p className="text-lg md:text-2xl text-[#6B7280] font-medium">
                    Crafted with Love & Attention
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`${feature.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-slide-up ${feature.delay}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#111111]" />
                    </div>
                    <h3 className="font-semibold text-[#111111] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#6B7280]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
