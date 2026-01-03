"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Database } from "@/types/database"

type Product = Database['public']['Tables']['products']['Row'] & {
  categories?: Database['public']['Tables']['categories']['Row']
}

type Category = Database['public']['Tables']['categories']['Row']

interface CatalogClientProps {
  products: Product[]
  categories: Category[]
}

export function CatalogClient({ products, categories }: CatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category_id === selectedCategory)

  return (
    <section id="catalog" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-4">
            Our Catalog
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Explore our handcrafted collection. Each piece can be customized to your preferences.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={
              selectedCategory === "all"
                ? "bg-[#111111] text-white"
                : "border-[#111111] text-[#111111] hover:bg-[#F5F5F5]"
            }
            onClick={() => setSelectedCategory("all")}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-[#111111] text-white"
                  : "border-[#111111] text-[#111111] hover:bg-[#F5F5F5]"
              }
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#6B7280]">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <CardHeader className="p-0">
                  {product.image_url ? (
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-gradient-to-br from-pink-100 via-purple-50 to-amber-50 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/5 transition-colors" />
                      <div className="text-center z-10">
                        <div className="w-16 h-16 mx-auto rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mb-3">
                          <span className="text-2xl">✨</span>
                        </div>
                        <p className="text-sm text-[#6B7280] px-4">
                          No image
                        </p>
                      </div>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {product.description}
                  </CardDescription>
                  {product.price && (
                    <p className="text-sm font-semibold text-[#111111] mt-2">
                      {product.price}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-[#111111] text-[#111111] hover:bg-[#F5F5F5]"
                    asChild
                  >
                    <Link
                      href={`https://wa.me/1234567890?text=Hi, I'm interested in ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 justify-center"
                    >
                      <MessageCircle size={14} />
                      Customize / Enquire
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
