import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { VisualFocusSection } from "@/components/VisualFocusSection"
import { MakerStory } from "@/components/MakerStory"
import { CatalogSection } from "@/components/CatalogSection"
import { AboutSection } from "@/components/AboutSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/footer"
import { getSiteContent, getTestimonials } from "@/lib/data"

export default async function Home() {
  const [siteContent, testimonials] = await Promise.all([getSiteContent(), getTestimonials()])
  const heroCopy = siteContent.find((item) => item.section === "hero")
  const heroMedia = siteContent.find((item) => item.section === "hero_media")

  const heroTitle = heroCopy?.title || "Handmade Crafts, Made Personal — For Moments That Matter"
  const heroSubtitle = heroCopy?.description || "Custom gifts & wedding keepsakes, hand-crafted with care and emotion."
  const heroImageUrl = require("@/assets/images/dashboard_image.jpeg").default.src;
  const heroImageAlt = heroMedia?.title || "Handmade resin art and custom gifts displayed on a wooden table"

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        heroImageUrl={heroImageUrl}
        heroImageAlt={heroImageAlt}
      />
      <VisualFocusSection />
      <MakerStory />
      <CatalogSection />
      <AboutSection testimonials={testimonials} />
      <ContactSection />
      <Footer />

    </main>
  )
}
