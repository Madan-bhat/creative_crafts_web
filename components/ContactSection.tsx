"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Instagram, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Hi! I'm ${formData.name}. ${formData.message}. You can reach me at ${formData.contact}`
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-4">
              Let&apos;s Create Something Special
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Have a custom order in mind? Get in touch and we&apos;ll bring your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      Phone / Email
                    </label>
                    <Input
                      type="text"
                      placeholder="Your contact info"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      Your Message
                    </label>
                    <Textarea
                      placeholder="Tell us about your custom order..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#111111] hover:bg-[#111111]/90 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & CTA */}
            <div className="space-y-6">
              {/* WhatsApp CTA */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#111111] mb-2">
                    Quick Enquiry on WhatsApp
                  </h3>
                  <p className="text-[#6B7280] mb-6">
                    Get instant responses to your queries
                  </p>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                    asChild
                  >
                    <Link
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 justify-center"
                    >
                      <MessageCircle size={20} />
                      Chat on WhatsApp
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Instagram className="w-6 h-6 text-[#111111] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#111111] mb-1">Instagram</h4>
                    <Link
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B7280] hover:text-[#111111] transition-colors"
                    >
                      @creativecrafts
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#111111] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#111111] mb-1">Email</h4>
                    <a
                      href="mailto:hello@creativecrafts.com"
                      className="text-[#6B7280] hover:text-[#111111] transition-colors"
                    >
                      hello@creativecrafts.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#111111] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#111111] mb-1">Location</h4>
                    <p className="text-[#6B7280]">
                      Mumbai, India<br />
                      Serving customers nationwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
