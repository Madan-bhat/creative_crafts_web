"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
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
  showPagination?: boolean
}

export function CatalogClient({ products, categories, showPagination = true }: CatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category_id === selectedCategory)

  const totalPages = showPagination ? Math.ceil(filteredProducts.length / itemsPerPage) : 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = showPagination ? filteredProducts.slice(startIndex, endIndex) : filteredProducts

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  return (
    <section id="catalog" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1F1A17] mb-4 leading-tight">
            Our handcrafted catalog
          </h2>
          <p className="text-lg text-[#5B514A] max-w-2xl mx-auto">
            Explore customer favorites and one-of-a-kind pieces. Everything can be customized for your occasion.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={
              selectedCategory === "all"
                ? "bg-[#C67753] text-white hover:bg-[#b96949]"
                : "border-[#C67753] text-[#1F1A17] hover:bg-[#F1E6DD]"
            }
            onClick={() => handleCategoryChange("all")}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-[#C67753] text-white hover:bg-[#b96949]"
                  : "border-[#C67753] text-[#1F1A17] hover:bg-[#F1E6DD]"
              }
              onClick={() => handleCategoryChange(category.id)}
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {paginatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <CardHeader className="p-0">
                    <Link href={`/catalog/${product.id}`} className="block">
                      {product.image_url ? (
                        <div className="aspect-square relative overflow-hidden">
                          <Image
                            src={product.image_url}
                            alt={product.name || "Catalog product"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>{product.name}</span>
                            <span className="inline-flex items-center gap-1 text-xs bg-white/10 px-2 py-1 rounded-full">
                              View details
                              <ArrowRight size={12} />
                            </span>
                          </div>
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
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 text-[#1F1A17]">
                      <Link href={`/catalog/${product.id}`} className="hover:text-[#C67753]">
                        {product.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-[#5B514A]">
                      {product.description}
                    </CardDescription>
                    {product.price && (
                      <p className="text-sm font-semibold text-[#C67753] mt-2">
                        {product.price}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button
                        size="sm"
                        className="flex-1 bg-[#C67753] hover:bg-[#b96949] text-white"
                        asChild
                      >
                        <Link href={`/catalog/${product.id}`} className="flex items-center gap-2 justify-center">
                          View details
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#C67753] text-[#1F1A17] hover:bg-[#F1E6DD]"
                        asChild
                      >
                        <Link
                          href={`https://wa.me/1234567890?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 justify-center"
                        >
                          <MessageCircle size={14} />
                          Enquire
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {showPagination && totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-[#C67753] text-[#1F1A17] hover:bg-[#F1E6DD] disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentPage === page
                          ? "bg-[#C67753] text-white"
                          : "border border-[#C67753] text-[#1F1A17] hover:bg-[#F1E6DD]"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-[#C67753] text-[#1F1A17] hover:bg-[#F1E6DD] disabled:opacity-50"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
