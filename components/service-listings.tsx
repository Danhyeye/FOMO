"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/utils/numbers/formatPrice"
import { Separator } from "./ui/separator"
import servicesData from "@/data/services.json"
import drinksData from "@/data/drinks.json"
import { useCart } from "@/contexts/cart-context"

interface ServiceListingsProps {
  searchQuery: string
}

function ServiceSection({ 
  categoryKey, 
  categoryData, 
  searchQuery,
  imagePosition = "left"
}: { 
  categoryKey: string
  categoryData: typeof servicesData.services.combo | { title: string; items: Array<{ name: string; price: number; description?: string }> }
  searchQuery: string
  imagePosition?: "left" | "right"
}) {
  const { addItem } = useCart()
  let filteredItems = categoryData.items
  if (searchQuery.trim()) {
    filteredItems = categoryData.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const getImageSrc = () => {
    if (categoryKey === "combo") return "/images/combo.png"
    if (categoryKey === "manicure") return "/images/medicure.png"
    if (categoryKey === "pedicure") return "/images/pedicure.png"
    if (categoryKey === "effects") return "/images/effects.png"
    if (categoryKey === "drinks") return "/images/drinks.png"
    return "/images/combo.png"
  }

  const imageSection = (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] overflow-hidden shadow-lg rounded-lg">
      <Image
        src={getImageSrc()}
        alt={`${categoryData.title} image`}
        fill
        className="object-cover"
      />
    </div>
  )

  const contentSection = (
    <div className="relative flex flex-col">
      <div className="space-y-5">
        <h2 className="text-4xl lg:text-5xl font-bold text-amber-200 mb-8" style={{ fontFamily: 'var(--font-mt-dalat-sans)' }}>
          {categoryData.title}
        </h2>

        {filteredItems.length === 0 ? (
          <div className="text-white/70 text-center py-8">
            <p>Không tìm thấy dịch vụ phù hợp</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((service, index) => (
              <div
                key={`${service.name}-${index}`}
                className="flex flex-col gap-3 p-5  group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-amber-200 font-bold text-lg mb-2 group-hover:text-amber-100 transition-colors">
                    {service.name}
                  </h3>
                  
                  {service.description && (
                    <p className="text-white/60 text-sm mb-3 leading-relaxed">
                      {service.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <p className="text-amber-200 font-bold text-lg">
                      {formatPrice(service.price)}
                    </p>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => addItem({
                        name: service.name,
                        price: service.price,
                        duration: "10 phút",
                      })}
                      className="shrink-0 rounded-full hover:bg-white/20 text-white border-0 h-10 w-10 transition-all duration-200 group-hover:scale-110"
                      aria-label={`Add ${service.name} to cart`}
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch ${imagePosition === "right" ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>
      {imageSection}
      {contentSection}
    </div>
  )
}

export function ServiceListings({ searchQuery }: ServiceListingsProps) {
  const comboData = servicesData.services.combo
  const medicureData = servicesData.services.manicure
  const pedicureData = servicesData.services.pedicure
  const effectsData = servicesData.services.effects

  return (
    <div id="service-listings" className="space-y-12 scroll-mt-24">
      <div id="section-combo" className="relative scroll-mt-24">
        <ServiceSection
          categoryKey="combo"
          categoryData={comboData}
          searchQuery={searchQuery}
          imagePosition="left"
        />
      </div>

      <div id="section-manicure" className="relative scroll-mt-24">
        <ServiceSection
          categoryKey="manicure"
          categoryData={medicureData}
          searchQuery={searchQuery}
          imagePosition="right"
        />
      </div>

      <div id="section-pedicure" className="relative scroll-mt-24">
        <ServiceSection
          categoryKey="pedicure"
          categoryData={pedicureData}
          searchQuery={searchQuery}
          imagePosition="left"
        />
      </div>

      <div id="section-effects" className="relative scroll-mt-24">
        <ServiceSection
          categoryKey="effects"
          categoryData={effectsData}
          searchQuery={searchQuery}
          imagePosition="right"
        />
      </div>

      <div id="section-drinks" className="relative scroll-mt-24">
        <ServiceSection
          categoryKey="drinks"
          categoryData={{
            title: drinksData.category,
            items: drinksData.items
          }}
          searchQuery={searchQuery}
          imagePosition="left"
        />
      </div>
    </div>
  )
}
