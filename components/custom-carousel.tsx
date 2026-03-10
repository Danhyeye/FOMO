"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CustomCarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
  className?: string
  children: React.ReactNode
  showDots?: boolean
  totalSlides?: number
  itemsPerSlide?: number
}

type CustomCarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  selectedIndex: number
} & CustomCarouselProps

const CustomCarouselContext = React.createContext<CustomCarouselContextProps | null>(null)

function useCustomCarousel() {
  const context = React.useContext(CustomCarouselContext)

  if (!context) {
    throw new Error("useCustomCarousel must be used within a <CustomCarousel />")
  }

  return context
}

export function CustomCarousel({
  opts,
  setApi,
  plugins,
  className,
  children,
  showDots = false,
  totalSlides = 0,
  itemsPerSlide = 1,
}: CustomCarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      align: opts?.align || "center",
      containScroll: "trimSnaps",
      dragFree: false,
      skipSnaps: false,
    },
    plugins
  )
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setSelectedIndex(api.selectedScrollSnap())

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    api.on("reInit", onSelect)

    if (setApi) {
      setApi(api)
    }

    return () => {
      api.off("select", onSelect)
    }
  }, [api, setApi])

  return (
    <CustomCarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        selectedIndex,
        opts,
        plugins,
        className,
        children,
        showDots,
        totalSlides,
        itemsPerSlide,
      }}
    >
      <div className={cn("w-full", className)}>
        <div
          ref={carouselRef}
          className="overflow-hidden"
          role="region"
          aria-roledescription="carousel"
        >
          {children}
        </div>
        
        {/* Navigation Dots */}
        {showDots && totalSlides > 0 && (
          <CustomCarouselDots totalSlides={totalSlides} />
        )}
      </div>
    </CustomCarouselContext.Provider>
  )
}

export function CustomCarouselContent({
  className,
  children,
  style,
}: {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  const { selectedIndex } = useCustomCarousel()

  return (
    <div
      className={cn("flex", className)}
      style={style}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const props: any = {
            isActive: index === selectedIndex,
            index,
          }
          return React.cloneElement(child, props)
        }
        return child
      })}
    </div>
  )
}

interface CustomCarouselItemProps {
  className?: string
  children: React.ReactNode
  isActive?: boolean
  index?: number
  style?: React.CSSProperties
}

export function CustomCarouselItem({
  className,
  children,
  isActive,
  index,
  style,
}: CustomCarouselItemProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0", className)}
      style={style}
    >
      {children}
    </div>
  )
}

function CustomCarouselDots({ totalSlides }: { totalSlides: number }) {
  const { api, selectedIndex } = useCustomCarousel()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        marginTop: "32px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to page ${index + 1}`}
          className="relative w-5 h-5 p-0 hover:bg-transparent focus-visible:ring-0"
        >
          {index === selectedIndex && (
            <span
              style={{
                position: "absolute",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border: "1.5px solid #D6D0C5",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#D6D0C5",
              display: "block",
              flexShrink: 0,
            }}
          />
        </Button>
      ))}
    </div>
  )
}

export type { CarouselApi }
