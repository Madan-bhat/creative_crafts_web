import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { getProductById, getProducts } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductGallery } from "@/components/ProductGallery"

interface ProductPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductById(params.id)
  if (!product) {
    return {
      title: "Product not found | Creative Crafts",
    }
  }

  return {
    title: `${product.name} | Creative Crafts`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const gallery = [
    ...(product.product_images?.map((img) => ({ url: img.url })) || []),
    ...(product.image_url ? [{ url: product.image_url }] : []),
  ].filter((item, index, self) => item.url && self.findIndex((i) => i.url === item.url) === index)

  const related = (await getProducts())
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  const categoryName = product.categories?.name ?? "Handcrafted"
  const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(
    `Hi! I love the ${product.name}. Can you customize it for me?`
  )}`

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-28 pb-10 bg-gradient-to-b from-[rgba(255,249,242,0.9)] to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 text-sm text-[#5B514A] mb-6">
            <Link href="/catalog" className="inline-flex items-center gap-2 hover:text-[#C67753]">
              <ArrowLeft size={16} />
              Back to catalog
            </Link>
            <span className="text-[#C67753]">•</span>
            <span>{categoryName}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <ProductGallery
              images={gallery}
              fallbackAlt={product.name}
            />

            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#C67753] mb-2">{categoryName}</p>
                <h1 className="text-4xl font-bold text-[#1F1A17] leading-tight mb-3">{product.name}</h1>
                {product.price && (
                  <p className="text-xl font-semibold text-[#C67753] mb-3">{product.price}</p>
                )}
                <p className="text-lg text-[#5B514A] leading-relaxed">{product.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-[#C67753] hover:bg-[#b96949] text-white shadow-sm"
                  asChild
                >
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} className="mr-2" />
                    Enquire / Customize
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C67753] text-[#1F1A17] hover:bg-[#F1E6DD]"
                  asChild
                >
                  <Link href="/catalog" className="flex items-center gap-2">
                    View all
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>

              <ul className="list-disc list-inside text-[#5B514A] space-y-1 text-sm">
                <li>Made to order with handcrafted finishing</li>
                <li>Gift-ready packaging available on request</li>
                <li>Ships pan-India; timelines shared after enquiry</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#C67753]">You may also like</p>
                <h2 className="text-2xl font-bold text-[#1F1A17]">More handcrafted pieces</h2>
              </div>
              <Link href="/catalog" className="text-sm text-[#5B514A] hover:text-[#C67753] inline-flex items-center gap-1">
                View all
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-[#F1E6DD]">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[#5B514A]">Image coming soon</div>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-sm text-[#8B7C71]">{item.categories?.name ?? "Handcrafted"}</p>
                    <h3 className="text-lg font-semibold text-[#1F1A17]">{item.name}</h3>
                    {item.price && <p className="text-sm font-semibold text-[#C67753]">{item.price}</p>}
                    <Link
                      href={`/catalog/${item.id}`}
                      className="text-sm text-[#C67753] inline-flex items-center gap-1 mt-1"
                    >
                      View details
                      <ArrowRight size={14} />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
