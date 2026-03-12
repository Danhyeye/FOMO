"use client"

import { useState } from "react"
import { ChevronRight, X, ArrowLeft } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import { SuccessDialog } from "@/components/success-dialog"
import { validatePhoneNumber } from "@/utils/validation/validatePhone"
import { useTranslation } from "react-i18next"

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
]

export function BookingDialog({
  open,
  onOpenChange,
  onBackToCart,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBackToCart?: () => void
}) {
  const { t } = useTranslation()
  const { clearCart } = useCart()
  const [customerName, setCustomerName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  
  const getDayName = (dayIndex: number): string => {
    const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    return t(`booking.days.${dayKeys[dayIndex]}`)
  }

  const generateDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      const dayName = getDayName(date.getDay())
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const dateStr = `${day}/${month}`
      const value = date.toISOString().split("T")[0]
      
      dates.push({
        label: dayName,
        date: dateStr,
        day: date.toLocaleDateString("en-US", { weekday: "long" }),
        value: value,
      })
    }
    
    return dates
  }

  const dates = generateDates()
  const [selectedDate, setSelectedDate] = useState(dates[0].value)
  const [selectedTime, setSelectedTime] = useState("10:00 AM")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const isFormValid = 
    customerName.trim() !== "" && 
    phoneNumber.trim() !== "" && 
    validatePhoneNumber(phoneNumber) &&
    selectedDate && 
    selectedTime

  const handleBook = () => {
    if (!isFormValid) return
    setShowSuccessDialog(true)
    onOpenChange(false)
    clearCart()
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:w-[500px] bg-[#F5F0E8] p-6 overflow-y-auto"
          showCloseButton={true}
        >
          <SheetHeader className="relative">
            <SheetTitle
              className="text-center text-2xl font-bold text-[#47301F] mb-6"
              style={{ fontFamily: "var(--font-mt-dalat-sans)" }}
            >
              {t("booking.title")}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <label className="text-sm text-[#47301F]/70">{t("booking.customerName")}</label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-white text-black"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#47301F]/70">{t("booking.phoneNumber")}</label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={cn(
                  "bg-white text-black",
                  phoneNumber.trim() !== "" && !validatePhoneNumber(phoneNumber) && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {phoneNumber.trim() !== "" && !validatePhoneNumber(phoneNumber) && (
                <p className="text-red-500 text-xs">
                  {t("booking.phoneError")}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm text-[#47301F]/70">{t("booking.selectDate")}</label>
              <div className="flex gap-2 flex-wrap">
                {dates.map((date) => (
                  <Button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    variant="outline"
                    className={cn(
                      "flex-1 min-w-[100px] h-16 bg-white text-black border-2 border-[#D6D0C5]/30 hover:border-[#47301F]/50 hover:bg-[#47301F]/5 transition-all duration-200 flex flex-col items-center justify-center text-center rounded-lg shadow-sm hover:shadow-md",
                      selectedDate === date.value &&
                        "bg-[#47301F] border-[#47301F] text-white hover:bg-[#47301F]/90 hover:border-[#47301F] shadow-md transform scale-[1.02]"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-medium",
                      selectedDate === date.value ? "text-white" : "text-[#47301F]/70"
                    )}>
                      {date.label}
                    </span>
                    <span className={cn(
                      "text-base font-semibold mt-0.5",
                      selectedDate === date.value ? "text-white" : "text-[#47301F]"
                    )}>
                      {date.date}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-[#47301F]/70">{t("booking.selectTime")}</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "bg-white text-black hover:bg-black hover:text-white text-xs",
                      selectedTime === time &&
                        "bg-[#47301F] border-[#47301F] text-white hover:bg-[#47301F]/90"
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {onBackToCart && (
              <Button
                onClick={() => {
                  onOpenChange(false)
                  onBackToCart()
                }}
                variant="outline"
                className={cn(
                  "w-full bg-white text-black hover:bg-black hover:text-white rounded-none py-6 text-base font-medium flex items-center justify-center gap-2"
                )}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t("booking.backToCart")}</span>
              </Button>
            )}

            <Button
              onClick={handleBook}
              disabled={!isFormValid}
              className={cn(
                "w-full bg-[#47301F] hover:bg-[#47301F]/90 text-white rounded-none py-6 text-base font-medium flex items-center justify-between",
                !isFormValid && "opacity-50 cursor-not-allowed hover:bg-[#47301F]"
              )}
            >
              <span>{t("booking.book")}</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </>
  )
}
