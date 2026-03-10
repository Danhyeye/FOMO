"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ServiceFilters } from "@/components/service-filters"
import { ServiceListings } from "@/components/service-listings"
import { CustomerFeedback } from "@/components/customer-feedback"
import { Footer } from "@/components/footer"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("combo")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-[#574015] py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <ServiceFilters 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <ServiceListings 
              searchQuery={searchQuery}
            />
          </div>
        </section>
        <CustomerFeedback />
      </main>
      <Footer />
    </div>
  )
}
