import { createClient } from '@/lib/supabase'
import { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row'] & {
  categories?: Database['public']['Tables']['categories']['Row']
}

type Category = Database['public']['Tables']['categories']['Row']

export async function getProducts() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
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
