import { createClient } from '@/lib/supabase'
import { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row'] & {
  categories?: Database['public']['Tables']['categories']['Row']
}

type ProductWithImages = Product & {
  product_images?: Database['public']['Tables']['product_images']['Row'][]
}

type Category = Database['public']['Tables']['categories']['Row']

export async function getProducts(limit?: number, offset?: number) {
  const supabase = createClient()

  let query = supabase
    .from('products')
    .select(`
      *,
      categories (*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (limit) query = query.limit(limit)
  if (offset) query = query.range(offset, offset + (limit || 10) - 1)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductsCount() {
  const supabase = createClient()

  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching product count:', error)
    return 0
  }

  return count || 0
}

export async function getCategories() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data as Category[]
}

export async function getProductById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select(
      `
      *,
      categories (*),
      product_images (*)
    `
    )
    .eq('id', id)
    .eq('is_active', true)
    .order('position', { foreignTable: 'product_images', ascending: true, nullsFirst: true })
    .order('created_at', { foreignTable: 'product_images', ascending: true })
    .maybeSingle()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as ProductWithImages | null
}

export async function getProductImages(productId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('position', { ascending: true, nullsFirst: true })
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching product images:', error)
    return []
  }

  return data as Database['public']['Tables']['product_images']['Row'][]
}

export async function getSiteContent() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('site_content')
    .select('*')

  if (error) {
    console.error('Error fetching site content:', error)
    return []
  }

  return data
}

export async function getTestimonials() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }

  return data as Database['public']['Tables']['testimonials']['Row'][]
}
