import { CatalogClient } from "@/components/CatalogClient"
import { getProducts, getCategories } from "@/lib/data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function CatalogSection() {
  const products = await getProducts(10, 0)
  const categories = await getCategories()

  return (
    <>
      <CatalogClient products={products} categories={categories} showPagination={false} />
      <div className="py-8 text-center pb-16 md:pb-24">
        <Button
          size="lg"
          className="bg-[#C67753] hover:bg-[#b96949] text-white shadow-md"
          asChild
        >
          <Link href="/catalog" className="flex items-center gap-2">
            Shop Now
            <ArrowRight size={20} />
          </Link>
        </Button>
      </div>
    </>
  )
}
