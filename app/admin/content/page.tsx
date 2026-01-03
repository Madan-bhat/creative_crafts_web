"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from "@/components/ui/use-toast"
import type { Database } from "@/types/database"
import { Save } from "lucide-react"

type SiteContent = Database['public']['Tables']['site_content']['Row']

export default function ContentPage() {
  const [content, setContent] = useState<Record<string, SiteContent>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  const supabase = createClientComponentClient<Database>()
  const { toast } = useToast()

  const sections = [
    { id: 'hero', title: 'Hero Section', fields: ['title', 'description'] },
    { id: 'about', title: 'About Section', fields: ['title', 'description'] },
    { id: 'contact', title: 'Contact Information', fields: ['title', 'description'] },
    { id: 'footer', title: 'Footer', fields: ['title', 'description'] },
  ]

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')

      if (error) throw error

      const contentMap: Record<string, SiteContent> = {}
      data?.forEach((item) => {
        contentMap[item.section] = item
      })

      setContent(contentMap)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch content",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (section: string) => {
    setSaving(section)

    try {
      const sectionContent = content[section]

      if (sectionContent?.id) {
        // Update existing
        const { error } = await supabase
          .from('site_content')
          .update({
            title: sectionContent.title,
            description: sectionContent.description,
            updated_at: new Date().toISOString(),
          })
          .eq('id', sectionContent.id)

        if (error) throw error
      } else {
        // Insert new
        const { error } = await supabase
          .from('site_content')
          .insert([{
            section,
            title: content[section]?.title || '',
            description: content[section]?.description || '',
          }])

        if (error) throw error
      }

      toast({
        title: "Success",
        description: "Content updated successfully",
      })
      fetchContent()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      })
    } finally {
      setSaving(null)
    }
  }

  const updateField = (section: string, field: 'title' | 'description', value: string) => {
    setContent({
      ...content,
      [section]: {
        ...(content[section] || {}),
        section,
        [field]: value,
      } as SiteContent,
    })
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#111111] mb-6">Site Content</h1>

      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`${section.id}-title`}>Title</Label>
                  <Input
                    id={`${section.id}-title`}
                    value={content[section.id]?.title || ''}
                    onChange={(e) => updateField(section.id, 'title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`${section.id}-description`}>Description</Label>
                  <Textarea
                    id={`${section.id}-description`}
                    value={content[section.id]?.description || ''}
                    onChange={(e) => updateField(section.id, 'description', e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  onClick={() => handleSave(section.id)}
                  disabled={saving === section.id}
                  className="bg-[#111111] hover:bg-[#111111]/90"
                >
                  <Save size={16} className="mr-2" />
                  {saving === section.id ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
