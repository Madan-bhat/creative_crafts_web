import { CatalogClient } from "@/components/CatalogClient"
import { getCategories, getProducts } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Catalog | Creative Crafts",
  description: "Browse handmade resin art, keepsake boxes, frames, and custom gifts crafted to order.",
}

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-28 pb-10 bg-gradient-to-b from-[rgba(255,249,242,0.9)] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C67753] mb-3">Catalog</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] leading-tight mb-4">
              Discover handcrafted pieces made for your stories
            </h1>
            <p className="text-lg text-[#5B514A] max-w-2xl">
              Explore ready-to-customize resin art, keepsake boxes, frames, decor, and gifting essentials. See details, then message us to personalize.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="#catalog-grid"
                className="inline-flex items-center gap-2 text-[#C67753] font-semibold"
              >
                Jump to products
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#5B514A] hover:text-[#C67753]"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="catalog-grid">
        <CatalogClient products={products} categories={categories} showPagination={true} />
      </div>
    </main>
  )
}
