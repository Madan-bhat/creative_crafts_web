"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Quote } from "lucide-react"
import Link from "next/link"

export function AboutSection() {
  const testimonials = [
    {
      name: "Priya & Rahul",
      text: "The wedding keepsake box was absolutely perfect. Such attention to detail!",
      role: "Wedding Couple",
    },
    {
      name: "Ananya",
      text: "Ordered custom resin coasters and they turned out better than I imagined.",
      role: "Gift Customer",
    },
    {
      name: "Meera",
      text: "Beautiful handmade frames for our anniversary. Highly recommend!",
      role: "Happy Customer",
    },
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-[#F5F5F5] to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6">
                Handcrafted with Heart
              </h2>
              <div className="space-y-4 text-[#6B7280]">
                <p>
                  At Creative Crafts, we believe every special moment deserves something
                  equally special. That&apos;s why we handcraft each piece with care, attention,
                  and a personal touch.
                </p>
                <p>
                  From wedding keepsakes to custom gifts, our creations are made to order—
                  never mass-produced. We work closely with you to bring your vision to life,
                  ensuring every detail reflects your story and emotions.
                </p>
                <p>
                  Whether it&apos;s resin art, personalized frames, or bespoke gift boxes,
                  we pour love into every creation. Because the best gifts are the ones
                  made just for you.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#111111] hover:text-[#6B7280] transition-colors"
                >
                  <Instagram size={20} />
                  <span className="font-medium">Follow our journey @creativecrafts</span>
                </Link>
              </div>
            </div>
            
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-pink-100 via-purple-50 to-amber-50 flex items-center justify-center shadow-xl">
              <div className="text-center p-8">
                <Quote className="w-16 h-16 text-[#111111] mx-auto mb-4" />
                <p className="text-xl md:text-2xl font-medium text-[#111111] mb-2">
                  &quot;Made with love,
                </p>
                <p className="text-xl md:text-2xl font-medium text-[#6B7280]">
                  Crafted for you&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#111111] text-center mb-8">
              What Our Customers Say
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-[#6B7280] mb-4" />
                    <p className="text-[#6B7280] mb-4 italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div>
                      <p className="font-semibold text-[#111111]">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
