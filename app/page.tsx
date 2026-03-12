"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ServiceFilters } from "@/components/service-filters"
import { ServiceListings } from "@/components/service-listings"
import { CustomerFeedback } from "@/components/customer-feedback"
import { Footer } from "@/components/footer"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("combo")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Scroll to services section on page load
    const timer = setTimeout(() => {
      const servicesSection = document.getElementById("service-listings")
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-12 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat blur-sm" />
          <div className="absolute inset-0 bg-linear-to-t from-[#574015] via-[#574015]/80 to-transparent pointer-events-none z-0" />
          <div className="container mx-auto max-w-7xl relative z-10">
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
