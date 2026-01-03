export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string
          name: string
          description: string
          price: string | null
          image_url: string | null
          is_featured: boolean
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          description: string
          price?: string | null
          image_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          description?: string
          price?: string | null
          image_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
        }
      }
      site_content: {
        Row: {
          id: string
          section: string
          title: string
          description: string
          updated_at: string
        }
        Insert: {
          id?: string
          section: string
          title: string
          description: string
          updated_at?: string
        }
        Update: {
          id?: string
          section?: string
          title?: string
          description?: string
          updated_at?: string
        }
      }
    }
  }
}
