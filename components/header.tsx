"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { Cart } from "@/components/cart"

const navigationItems = [
  { label: "Trang chủ", href: "#home" },
  { label: "Giới thiệu", href: "#about" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Tin tức", href: "#news" },
  { label: "Liên hệ", href: "#contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="relative w-full h-[50vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="The OM Lounge"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 to-[#574015]/80" />
      </div>

      <div
        className="relative z-50 transition-all duration-300"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-fit py-4">
            <div className="hidden sm:block relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-all duration-200 rounded-lg hover:bg-white/10 border border-white/20 hover:border-white/30 px-3 py-2 backdrop-blur-sm"
              >
                ENGLISH
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    languageOpen && "rotate-180"
                  )}
                />
              </Button>
              {languageOpen && (
                <div className="absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-md rounded-lg shadow-xl border border-white/10 min-w-[120px] overflow-hidden z-50">
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-2 text-white hover:bg-white/10 text-sm transition-colors h-auto"
                  >
                    ENGLISH
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-2 text-white/70 hover:bg-white/10 hover:text-white text-sm transition-colors h-auto"
                  >
                    VIETNAMESE
                  </Button>
                </div>
              )}
            </div>
            <div className="sm:hidden" />

            <div className="flex flex-col items-center gap-2 lg:gap-3 flex-1 justify-center">
              <Link
                href="/"
                className="flex items-center transition-transform hover:scale-105 duration-200"
              >
                <div className="relative w-32 h-auto lg:w-40">
                  <Image
                    src="/images/logo.png"
                    alt="The OM Lounge"
                    width={160}
                    height={80}
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href || (item.href === "#services")
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md",
                        isActive
                          ? "text-amber-300"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10 h-10 w-10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 transition-transform duration-200" />
                ) : (
                  <Menu className="w-6 h-6 transition-transform duration-200" />
                )}
              </Button>

              <Button
                onClick={() => setCartOpen(true)}
                variant="ghost"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-200 px-3 py-2 rounded-md group bg-[#824c07]/90 hover:bg-[#824c07]/90 border border-[#47301F]"
              >
                <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:scale-110" />
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium hidden sm:inline text-white">
                    GIỎ HÀNG
                  </span>
                  {itemCount > 0 && (
                    <Badge
                      variant="default"
                      className="bg-white hover:bg-[#47301F]/90 text-[#47301F] border-0 text-xs min-w-[20px] h-6 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                    >
                      {itemCount}
                    </Badge>
                  )}
                </div>
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <nav className="pb-4 border-t border-white/20 mt-4 pt-4">
              <div className="flex flex-col gap-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href || (item.href === "#services")
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-4 py-3 text-white/90 hover:text-white transition-all duration-200 rounded-md text-sm font-medium",
                        isActive && "bg-white/10 text-amber-300"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-end pb-12 md:pb-16 lg:pb-20 px-4">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl text-center" style={{ fontFamily: 'var(--font-mt-dalat-sans)' }}>
          Dịch Vụ
        </h1>
      </div>
      
      <Cart open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
