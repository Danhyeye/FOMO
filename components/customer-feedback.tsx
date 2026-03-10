"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import testimonialsData from "@/data/testimonials.json"
import {
  CustomCarousel,
  CustomCarouselContent,
  CustomCarouselItem,
  type CarouselApi,
} from "@/components/custom-carousel"

export function CustomerFeedback() {
  const testimonials = testimonialsData.testimonials
  const [api, setApi] = useState<CarouselApi>()
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const pages: typeof testimonials[] = []
  for (let i = 0; i < testimonials.length; i += 3) {
    pages.push(testimonials.slice(i, i + 3))
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-14 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-linear-to-t from-[#615038] to-transparent pointer-events-none z-0" />

      <div className="text-center mb-12 relative z-10">
        <p className="text-white/75 text-[13px] tracking-[3px] uppercase mb-2 font-sans font-medium">
          NHẬN XÉT TỪ
        </p>
        <h2 className="text-white m-0 text-[clamp(2.5rem,5vw,4rem)] font-(-font-mt-dalat-sans,'Playfair_Display',Georgia,serif)]">
          Khách Hàng
        </h2>
      </div>

      <div className="relative px-6 z-10">
        <CustomCarousel
          opts={{
            align: "center",
            loop: false,
            skipSnaps: false,
            containScroll: "trimSnaps",
            dragFree: false,
          }}
          setApi={setApi}
          showDots={true}
          totalSlides={pages.length}
        >
          <CustomCarouselContent className="flex">
            {pages.map((page, pageIndex) => (
              <CustomCarouselItem
                key={pageIndex}
                className="flex-[0_0_100%] min-w-0"
              >
                <div className="container mx-auto max-w-7xl px-4">
                  <div className="flex items-end gap-20 py-8 pb-12">
                  {page.map((t, cardIndex) => {
                    const isCenter = cardIndex === 1
                    return (
                      <div
                        key={t.id}
                        className={`transition-all duration-300 ease-in-out min-w-0 ${
                          isCenter ? "flex-[0_0_40%]" : "flex-[0_0_28%]"
                        }`}
                      >
                        <Card
                          className={`bg-transparent border-0 rounded-none overflow-visible shadow-none p-0 transition-all duration-300 ease-in-out flex flex-col gap-8 ${
                            isCenter
                              ? "opacity-100 -translate-y-3 "
                              : "opacity-80 translate-y-0"
                          }`}
                        >
                          <div className="relative w-full pt-[120%] rounded-none overflow-visible">
                            <div className="absolute inset-0 overflow-hidden rounded-none">
                              <Image
                                src={t.image}
                                alt={t.name}
                                fill
                                className="object-cover"
                                sizes={isCenter ? "40vw" : "28vw"}
                              />
                            </div>
                            <Image
                              src="/images/union.png"
                              alt=""
                              width={isCenter ? 72 : 56}
                              height={isCenter ? 72 : 56}
                              className={`absolute bottom-0 right-0 z-10 translate-y-[40%] h-auto ${
                                isCenter ? "w-[72px]" : "w-14"
                              }`}
                            />
                          </div>

                          <CardContent
                            className={`bg-transparent ${
                              isCenter ? "px-6 pt-7 pb-5" : "px-4 py-4"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 mb-3">
                              <div
                                className={`relative rounded-full overflow-hidden border-2 border-white/30 shrink-0 ${
                                  isCenter ? "w-11 h-11" : "w-9 h-9"
                                }`}
                              >
                                <Image
                                  src={t.avatar}
                                  alt={t.name}
                                  fill
                                  className="object-cover"
                                  sizes="44px"
                                />
                              </div>
                              <span
                                className={`text-white font-bold font-[var(--font-mt-dalat-sans,'Playfair_Display',Georgia,serif)] ${
                                  isCenter ? "text-lg" : "text-base"
                                }`}
                              >
                                {t.name}
                              </span>
                            </div>

                            <p
                              className={`text-white leading-[1.7] mb-3 font-sans font-normal ${
                                expandedIds.has(t.id)
                                  ? ""
                                  : isCenter
                                  ? "text-base line-clamp-4"
                                  : "text-sm line-clamp-3"
                              }`}
                            >
                              {expandedIds.has(t.id) ? t.fullFeedback : t.feedback}
                            </p>

                            {t.fullFeedback && (
                              <Button
                                variant="link"
                                onClick={() => toggleExpanded(t.id)}
                                className="p-0 h-auto text-sm text-white/80 hover:text-white underline underline-offset-[3px] font-sans font-normal transition-colors"
                              >
                                {expandedIds.has(t.id) ? "Thu gọn" : "Xem thêm"}
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
                  </div>
                </div>
              </CustomCarouselItem>
            ))}
          </CustomCarouselContent>
        </CustomCarousel>
      </div>
    </section>
  )
}