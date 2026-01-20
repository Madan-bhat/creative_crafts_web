"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Menu, X, ArrowRight } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[rgba(255,249,242,0.95)] backdrop-blur-sm shadow-sm" : "bg-[rgba(255,249,242,0.98)]"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-[#1F1A17]">
            Creative Crafts
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  link.label === "Catalog"
                    ? "text-[#C67753] font-semibold border-b-2 border-[#C67753]"
                    : "text-[#5B514A] hover:text-[#C67753]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5B514A] hover:text-[#C67753] transition-colors"
            >
              <Instagram size={20} />
            </Link>
            <Button
              size="sm"
              className="bg-[#C67753] hover:bg-[#b96949] text-white shadow-sm"
              asChild
            >
              <Link
                href="/catalog"
                className="flex items-center gap-2"
              >
                <ArrowRight size={16} />
                View Catalog
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#111111]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#5B514A] hover:text-[#C67753] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#5B514A] hover:text-[#C67753] transition-colors"
              >
                <Instagram size={16} />
                Instagram
              </Link>
              <Button
                size="sm"
                className="bg-[#C67753] hover:bg-[#b96949] text-white w-full"
                asChild
              >
                <Link
                  href="/catalog"
                  className="flex items-center gap-2 justify-center"
                >
                  <ArrowRight size={16} />
                  View Catalog
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
