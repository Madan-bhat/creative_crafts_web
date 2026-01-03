import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { VisualFocusSection } from "@/components/VisualFocusSection"
import { CatalogSection } from "@/components/CatalogSection"
import { AboutSection } from "@/components/AboutSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <VisualFocusSection />
      <CatalogSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
