"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Quote } from "lucide-react"
import Link from "next/link"
import { Database } from "@/types/database"

type Testimonial = Database['public']['Tables']['testimonials']['Row']

interface AboutSectionProps {
  testimonials?: Testimonial[]
}

const DEFAULT_TESTIMONIALS = [
  {
    id: "1",
    name: "Priya & Rahul",
    text: "The wedding keepsake box was absolutely perfect. Such attention to detail!",
    role: "Wedding couple",
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Ananya",
    text: "Ordered custom resin coasters and they turned out better than I imagined.",
    role: "Gift customer",
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Meera",
    text: "Beautiful handmade frames for our anniversary. Highly recommend!",
    role: "Happy customer",
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

export function AboutSection({ testimonials = DEFAULT_TESTIMONIALS }: AboutSectionProps) {
  const displayTestimonials = (testimonials?.length > 0 ? testimonials : DEFAULT_TESTIMONIALS).slice(0, 3)

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-[#F5F5F5] to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1F1A17] mb-6 leading-tight">
                Handcrafted with heart,
                <br />
                built for your milestones
              </h2>
              <div className="space-y-4 text-[#5B514A]">
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
                  className="inline-flex items-center gap-2 text-[#C67753] hover:text-[#1F1A17] transition-colors"
                >
                  <Instagram size={20} />
                  <span className="font-medium">Follow our journey @creativecrafts</span>
                </Link>
              </div>
            </div>

            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#F4E7DC] via-white to-[#F7DCCB] flex items-center justify-center shadow-xl">
              <div className="text-center p-8">
                <Quote className="w-16 h-16 text-[#C67753] mx-auto mb-4" aria-hidden="true" />
                <p className="text-xl md:text-2xl font-semibold text-[#1F1A17] mb-2">
                  "Made with love,
                </p>
                <p className="text-xl md:text-2xl font-semibold text-[#5B514A]">
                  crafted for you"
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1F1A17] text-center mb-3">
              What our customers say
            </h3>
            <p className="text-center text-[#5B514A] mb-12">⭐ Trusted by couples, gift-givers, and families across India.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {displayTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-gradient-to-br from-white to-[#F9F5F1] border-[#E7D8CC] hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-[#C67753]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      ))}
                    </div>

                    {/* Quote & Text */}
                    <div className="flex gap-2 items-start">
                      <Quote className="w-5 h-5 text-[#C67753]/40 mt-1 flex-shrink-0" aria-hidden="true" />
                      <p className="text-[#1F1A17] leading-relaxed font-medium">"{testimonial.text}"</p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E7D8CC]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C67753] to-[#F4E7DC] flex items-center justify-center text-white font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[#1F1A17]">{testimonial.name}</p>
                          <p className="text-xs text-[#8B7C71]">{testimonial.role}</p>
                        </div>
                      </div>
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
