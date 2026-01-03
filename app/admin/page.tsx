import { createServerSupabaseClient } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, FolderTree, Star, Eye } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()

  // Fetch stats
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const { count: activeProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const { count: featuredProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_featured', true)

  const { count: totalCategories } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })

  const stats = [
    {
      title: "Total Products",
      value: totalProducts || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Products",
      value: activeProducts || 0,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Featured Products",
      value: featuredProducts || 0,
      icon: Star,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Categories",
      value: totalCategories || 0,
      icon: FolderTree,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#111111] mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#111111]">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/products"
              className="p-4 border rounded-lg hover:border-[#111111] transition-colors"
            >
              <Package className="h-8 w-8 mb-2 text-[#111111]" />
              <h3 className="font-semibold mb-1">Manage Products</h3>
              <p className="text-sm text-gray-600">Add or edit products</p>
            </a>
            <a
              href="/admin/categories"
              className="p-4 border rounded-lg hover:border-[#111111] transition-colors"
            >
              <FolderTree className="h-8 w-8 mb-2 text-[#111111]" />
              <h3 className="font-semibold mb-1">Manage Categories</h3>
              <p className="text-sm text-gray-600">Organize your catalog</p>
            </a>
            <a
              href="/admin/content"
              className="p-4 border rounded-lg hover:border-[#111111] transition-colors"
            >
              {/* <FileText className="h-8 w-8 mb-2 text-[#111111]" /> */}
              <h3 className="font-semibold mb-1">Edit Site Content</h3>
              <p className="text-sm text-gray-600">Update homepage content</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
