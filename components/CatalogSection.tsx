import { CatalogClient } from "@/components/CatalogClient"
import { getProducts, getCategories } from "@/lib/data"

export async function CatalogSection() {
  const products = await getProducts()
  const categories = await getCategories()

  return <CatalogClient products={products} categories={categories} />
}
