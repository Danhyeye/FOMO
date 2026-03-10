"use client"

import { Send, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function SuccessDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-[#F5F0E8] p-8 border-0">
        <DialogTitle className="sr-only">
          Gửi Yêu Cầu Thành Công!
        </DialogTitle>
        <div className="flex flex-col items-center text-center">
          <div className="relative w-full h-32">
            <Image 
              src="/images/Illustration.png" 
              alt="Success illustration" 
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-xl font-bold font-['var(--font-mt-dalat-sans)'] text-[#47301F]">
            Gửi Yêu Cầu Thành Công!
          </h2>

          <p className="text-sm text-[#47301F]/80 leading-relaxed max-w-sm">
            Cảm ơn bạn đã đặt dịch vụ tại The OM Lounge. Chúng tôi đã nhận được
            thông tin đặt lịch từ bạn và sẽ liên hệ lại trong thời gian sớm nhất.
          </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
