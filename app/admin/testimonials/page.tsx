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
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from "@/components/ui/use-toast"
import type { Database } from "@/types/database"

type Testimonial = {
  id: string
  name: string
  role: string
  text: string
  is_active: boolean
  created_at: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    is_active: true,
  })

  const supabase = createClientComponentClient<Database>()
  const { toast } = useToast()

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "Info",
            description: "Testimonials table needs to be created. Please run the setup migration.",
            variant: "default",
          })
        } else {
          throw error
        }
      }

      setTestimonials(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingTestimonial.id)

        if (error) throw error
        toast({ title: "Success", description: "Testimonial updated successfully" })
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([formData])

        if (error) throw error
        toast({ title: "Success", description: "Testimonial created successfully" })
      }

      handleCloseDialog()
      fetchTestimonials()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      text: testimonial.text,
      is_active: testimonial.is_active,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast({ title: "Success", description: "Testimonial deleted successfully" })
      fetchTestimonials()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      })
    }
  }

  const toggleActive = async (testimonial: Testimonial) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !testimonial.is_active })
        .eq('id', testimonial.id)

      if (error) throw error
      fetchTestimonials()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      })
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setFormData({
      name: "",
      role: "",
      text: "",
      is_active: true,
    })
    setEditingTestimonial(null)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1F1A17]">⭐ Testimonials</h1>
          <p className="text-sm text-[#5B514A] mt-1">Manage customer feedback and build trust</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#C67753] hover:bg-[#b96949] shadow-md">
              <Plus size={20} className="mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {editingTestimonial ? "✏️ Edit Testimonial" : "⭐ Add New Testimonial"}
              </DialogTitle>
              <DialogDescription>
                {editingTestimonial ? "Update customer feedback" : "Add genuine customer feedback to build trust and credibility"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name" className="font-semibold">Customer Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya & Rahul, Ananya"
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-[#8B7C71] mt-1">How should we credit this review?</p>
                </div>

                <div>
                  <Label htmlFor="role" className="font-semibold">Category / Occasion *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Wedding Couple, Gift Customer, Home Décor"
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-[#8B7C71] mt-1">Helps customers relate to the testimonial</p>
                </div>

                <div>
                  <Label htmlFor="text" className="font-semibold">What did they say? *</Label>
                  <Textarea
                    id="text"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="Short, authentic feedback. 1-2 sentences work best."
                    rows={3}
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-[#8B7C71] mt-1">Keep it concise and authentic ({formData.text.length} characters)</p>
                </div>

                <div className="bg-[#F4E7DC] rounded-lg p-4 border border-[#E7D8CC]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded w-5 h-5 accent-[#C67753]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-[#1F1A17]">Display on website</span>
                      <p className="text-xs text-[#5B514A]">Uncheck to hide (for drafts or reviews you want to edit)</p>
                    </div>
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog} disabled={saving}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#C67753] hover:bg-[#b96949]" disabled={saving}>
                  {saving ? "Saving..." : editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-[#E7D8CC]">
        <CardHeader className="bg-gradient-to-r from-[#F4E7DC]/30 to-transparent">
          <CardTitle className="flex items-center gap-2">
            📊 All Testimonials ({testimonials.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="text-center py-8 text-[#5B514A]">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">⭐</div>
              <p className="text-gray-500 font-medium">No testimonials yet.</p>
              <p className="text-gray-400 text-sm mt-1">Add your first customer testimonial to build trust!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border border-[#E7D8CC] rounded-lg p-4 hover:bg-[#F4E7DC]/10 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#C67753] flex items-center justify-center text-white text-sm font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F1A17]">{testimonial.name}</p>
                          <p className="text-xs text-[#8B7C71]">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#5B514A] italic mt-2">"<span className="font-medium">{testimonial.text.substring(0, 100)}{testimonial.text.length > 100 ? "..." : ""}</span>"</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleActive(testimonial)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                          testimonial.is_active
                            ? "bg-green-100/80 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {testimonial.is_active ? (
                          <>
                            <Eye size={13} />
                            <span>Live</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={13} />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(testimonial)}
                        className="hover:bg-[#F4E7DC]"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(testimonial.id)}
                        className="hover:bg-red-50 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
