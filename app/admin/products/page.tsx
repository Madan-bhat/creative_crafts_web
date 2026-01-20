"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Edit, Trash2, Eye, EyeOff, Star, Image as ImageIcon, X } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from "@/components/ui/use-toast"
import type { Database } from "@/types/database"

type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']
type ProductImage = Database['public']['Tables']['product_images']['Row']

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [uploading, setUploading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [extraImageFiles, setExtraImageFiles] = useState<File[]>([])
  const [extraPreviews, setExtraPreviews] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    price: "",
    image_url: "",
    is_featured: false,
    is_active: true,
  })

  const supabase = createClientComponentClient<Database>()
  const { toast } = useToast()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('name')

    setCategories(data || [])
  }

  const fetchProductImages = async (productId: string) => {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('position', { ascending: true, nullsFirst: true })
      .order('created_at', { ascending: true })

    if (error) {
      toast({ title: "Error", description: "Failed to load product images", variant: "destructive" })
      return
    }

    setProductImages(data || [])
  }

  const deleteProductImage = async (image: ProductImage) => {
    try {
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', image.id)

      if (error) throw error

      const prefix = '/product-images/'
      const path = image.url.includes(prefix) ? image.url.split(prefix)[1] : null
      if (path) {
        await supabase.storage.from('product-images').remove([path])
      }

      setProductImages((prev) => prev.filter((img) => img.id !== image.id))
      toast({ title: "Removed", description: "Image removed from gallery" })
    } catch (err) {
      toast({ title: "Error", description: "Failed to remove image", variant: "destructive" })
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleExtraImagesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 6)
    if (!files.length) return

    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: `${file.name} is larger than 5MB`,
          variant: "destructive",
        })
        return false
      }
      return true
    })

    setExtraImageFiles(validFiles)

    Promise.all(
      validFiles.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
      )
    ).then(setExtraPreviews)
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`
      const filePath = `products/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
      return null
    }
  }

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploads = await Promise.all(files.map(uploadImage))
    return uploads.filter((url): url is string => Boolean(url))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = formData.image_url
      let productId = editingProduct?.id || null

      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      const productData = {
        ...formData,
        image_url: imageUrl,
      }

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)

        if (error) throw error
        toast({ title: "Success", description: "Product updated successfully" })
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single()

        if (error) throw error
        productId = data?.id || null
        toast({ title: "Success", description: "Product created successfully" })
      }

      if (productId && extraImageFiles.length > 0) {
        const uploadedUrls = await uploadImages(extraImageFiles)
        if (uploadedUrls.length) {
          const startPosition = productImages.length
          const payload = uploadedUrls.map((url, idx) => ({
            product_id: productId as string,
            url,
            position: startPosition + idx,
          }))
          const { error: galleryError } = await supabase
            .from('product_images')
            .insert(payload)
          if (galleryError) throw galleryError
        }
      }

      handleCloseDialog()
      fetchProducts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      category_id: product.category_id,
      price: product.price || "",
      image_url: product.image_url || "",
      is_featured: product.is_featured,
      is_active: product.is_active,
    })
    setImagePreview(product.image_url)
    setExtraImageFiles([])
    setExtraPreviews([])
    fetchProductImages(product.id)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast({ title: "Success", description: "Product deleted successfully" })
      fetchProducts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const toggleField = async (product: Product, field: 'is_active' | 'is_featured') => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ [field]: !product[field] })
        .eq('id', product.id)

      if (error) throw error
      fetchProducts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setFormData({
      name: "",
      description: "",
      category_id: "",
      price: "",
      image_url: "",
      is_featured: false,
      is_active: true,
    })
    setEditingProduct(null)
    setImageFile(null)
    setImagePreview(null)
    setProductImages([])
    setExtraImageFiles([])
    setExtraPreviews([])
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || "Unknown"
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#111111]">Products</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#111111] hover:bg-[#111111]/90">
              <Plus size={20} className="mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription>
                Create or update a product in your catalog
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (optional)</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., ₹999 or Custom"
                  />
                </div>

                <div>
                  <Label>Product Image</Label>
                  <div className="mt-2">
                    {imagePreview ? (
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label>Gallery Images (optional)</Label>
                    <span className="text-xs text-gray-500">Up to 6 images, 5MB each</span>
                  </div>
                  {productImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {productImages.map((img) => (
                        <div key={img.id} className="relative group">
                          <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                            <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteProductImage(img)}
                            className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow hover:bg-white"
                            aria-label="Remove image"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {extraPreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {extraPreviews.map((preview, idx) => (
                        <div key={idx} className="w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                          <img src={preview} alt="New upload preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleExtraImagesSelect}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">These will appear after the primary image.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Featured Product</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog} disabled={uploading}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#111111] hover:bg-[#111111]/90" disabled={uploading}>
                  {uploading ? "Saving..." : editingProduct ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products yet. Create your first product!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon size={20} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-gray-600">{getCategoryName(product.category_id)}</TableCell>
                    <TableCell className="text-gray-600">{product.price || "—"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleField(product, 'is_active')}
                          className={`px-2 py-1 rounded text-xs font-medium ${product.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {product.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                        </button>
                        <button
                          onClick={() => toggleField(product, 'is_featured')}
                          className={`px-2 py-1 rounded text-xs font-medium ${product.is_featured
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          <Star size={12} />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
