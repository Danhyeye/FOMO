"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  { id: "combo", label: "GÓI COMBO" },
  { id: "medicure", label: "MEDICURE" },
  { id: "pedicure", label: "PEDICURE" },
  { id: "effects", label: "HIỆU ỨNG" },
]

interface ServiceFiltersProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function ServiceFilters({ 
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  setSearchQuery 
}: ServiceFiltersProps) {
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    setTimeout(() => {
      const sectionMap: Record<string, string> = {
        combo: "section-combo",
        medicure: "section-manicure",
        pedicure: "section-pedicure",
        effects: "section-effects"
      }
      const sectionId = sectionMap[categoryId]
      if (sectionId) {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          })
        }
      }
    }, 100)
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-0 flex-wrap">
        {categories.map((category, index) => (
          <div key={category.id} className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                "px-4 py-2 text-sm font-semibold uppercase transition-all duration-200 h-auto rounded-none",
                "text-white hover:text-[#fce48c] hover:bg-transparent",
              )}
            >
              {category.label}
            </Button>
            {index < categories.length - 1 && (
              <span className="text-white/30 mx-2">|</span>
            )}
          </div>
        ))}
      </div>

      <div className="relative w-full md:w-auto">
        <Input
          type="text"
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-white placeholder:text-white/60 w-full md:w-64 pr-10 bg-transparent border-0 border-b border-white rounded-none focus:border-amber-300 focus:ring-0" 
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
      </div>
    </div>
  )
}
