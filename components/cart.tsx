"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Plus, Minus, Clock, ChevronRight } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import { BookingDialog } from "@/components/booking-dialog"
import { formatPrice, formatPriceVN } from "@/utils/numbers/formatPrice"

const technicians = [
  {
    id: "1",
    name: "Võ Thị Bích Phượng",
    avatar: "/images/technician-1.png",
  },
]

interface CartProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export function Cart({ open: controlledOpen, onOpenChange, trigger }: CartProps) {
  const { items, removeItem, updateQuantity, updateEffectQuantity, total } =
    useCart()
  const [internalOpen, setInternalOpen] = useState(false)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  const handleContinue = () => {
    if (items.length > 0) {
      setOpen(false)
      setShowBookingDialog(true)
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
        <SheetContent
          side="right"
          className="w-full sm:w-[600px] bg-[#F5F0E8] p-0 overflow-y-auto flex flex-col"
          showCloseButton={true}
        >
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#D6D0C5]/30">
            <SheetTitle
              className="text-center text-2xl font-bold text-[#47301F]"
              style={{ fontFamily: "var(--font-mt-dalat-sans)" }}
            >
              Giỏ Hàng
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-black text-base">Giỏ hàng trống</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="relative flex items-center gap-4"
                >
                  <div className="relative w-20 h-20 shrink-0">
                    <Image
                      src={item.image || "/images/combo.png"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-black text-base mb-2">
                      {item.name}
                    </h3>
                    <p className="text-black/70 text-sm font-medium">
                      {formatPriceVN(item.price).replace('đ', '')} <span className="underline">đ</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <Button
                      onClick={() => removeItem(item.id)}
                      className="bg-transparent border-0 text-black/60 hover:text-black transition-colors p-0 "
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    {item.duration && (
                      <div className="flex items-center gap-1 text-black/70 text-sm">
                        <Clock className="w-4 h-4" />
                        <span className="text-black/70 text-sm">{item.duration}</span>
                      </div>
                    )}
                  </div>

                  {item.effects && item.effects.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#D6D0C5]/20 space-y-2">
                      {item.effects.map((effect) => (
                        <div
                          key={effect.id}
                          className="flex items-center gap-2 bg-[#F5F0E8] rounded p-2"
                        >
                          <div className="relative w-10 h-10 shrink-0 rounded overflow-hidden bg-[#D6D0C5]/20">
                            {effect.image ? (
                              <Image
                                src={effect.image}
                                alt={effect.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#47301F]/30 text-xs">
                                {effect.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-black">
                              Hiệu ứng: {effect.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 border border-[#D6D0C5] rounded-full">
                            <Button
                              onClick={() =>
                                updateEffectQuantity(
                                  item.id,
                                  effect.id,
                                  Math.max(0, effect.quantity - 1)
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-black/70 hover:text-black hover:bg-[#D6D0C5]/20 transition-colors rounded-l-full"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm text-black font-medium">
                              {effect.quantity}
                            </span>
                            <Button
                              onClick={() =>
                                updateEffectQuantity(
                                  item.id,
                                  effect.id,
                                  effect.quantity + 1
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-black/70 hover:text-black hover:bg-[#D6D0C5]/20 transition-colors rounded-r-full"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-[#D6D0C5]/30 px-6 py-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#47301F]/70">Kỹ thuật viên</span>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#D6D0C5]/20">
                    {technicians[0].avatar ? (
                      <Image
                        src={technicians[0].avatar}
                        alt={technicians[0].name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#47301F]/30 text-xs">
                        {technicians[0].name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-[#47301F] font-medium">
                    {technicians[0].name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#47301F]/40" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#47301F]/70">Tổng thanh toán</span>
                <span className="text-lg font-bold text-red-600">
                  {formatPriceVN(total)}
                </span>
              </div>

              <Button
                onClick={handleContinue}
                className={cn(
                  "w-full bg-[#47301F] hover:bg-[#47301F]/90 text-white rounded-none py-6 text-base font-medium flex items-center justify-between"
                )}
              >
                <span>Tiếp Tục</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <BookingDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        onBackToCart={() => {
          setShowBookingDialog(false)
          setOpen(true)
        }}
      />
    </>
  )
}
