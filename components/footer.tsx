"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Dịch vụ", href: "/services" },
]

const contactInfo = {
  phone: "+84 89 812 1297",
  address: "6 Đường 9, Phú Mỹ, Quận 7, TP Hồ Chí Minh (gần Crescent Mall)",
  hours: {
    weekday: "Thứ 2 - Thứ 6: 09:00 - 19:00",
    weekend: "Thứ 7 - Chủ nhật: 09:00 - 20:00",
  },
}

const additionalLinks = [
  { label: "Tin tức", href: "/news" },
  { label: "Liên hệ", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="relative bg-[#2a1e0a] text-[#E0D6B7] overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
        <div 
          className="w-full h-full rounded-full blur-3xl" 
          style={{
            background: 'radial-gradient(circle, rgba(224,214,183,0.1) 0%, transparent 70%)'
          }}
        />
      </div>  

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(224,214,183,0.1)_50%,transparent_100%)]" />
      </div>

      <div className="absolute top-0 right-0 pointer-events-none z-10">
        <Image
          src="/images/flower.png"
          alt="Flower"
          width={200}
          height={200}
          className="object-contain opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="relative w-full h-full shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="The OM Lounge"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0D6B7]" />
              <h5 className="text-[#E0D6B7] text-xs font-medium uppercase tracking-wider">
                SITEMAP
              </h5>
            </div>
            <nav className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#E0D6B7] hover:text-white transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0D6B7]" />
              <h5 className="text-[#E0D6B7] text-xs font-medium uppercase tracking-wider">
                LIÊN HỆ
              </h5>
            </div>
            <div className="flex flex-col gap-3 text-sm text-[#E0D6B7]">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="hover:text-white transition-colors"
              >
                {contactInfo.phone}
              </a>
              <p className="leading-relaxed">{contactInfo.address}</p>
              <div className="space-y-1 mt-2">
                <p>{contactInfo.hours.weekday}</p>
                <p>{contactInfo.hours.weekend}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <nav className="flex flex-col gap-3">
              {additionalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#E0D6B7] hover:text-white transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Image
              src="/images/btn.png"
              alt="Đặt lịch ngay"
              width={200}
              height={60}
              className="w-full md:w-auto cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-[#E0D6B7]/20 pt-8 mt-8">
        <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E0D6B7]/30 flex items-center justify-center hover:border-[#E0D6B7] hover:bg-[#E0D6B7]/10 transition-all"
                aria-label="Facebook"
              >
                <Image
                  src="/images/facebook.png"
                  alt="Facebook"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E0D6B7]/30 flex items-center justify-center hover:border-[#E0D6B7] hover:bg-[#E0D6B7]/10 transition-all"
                aria-label="TikTok"
              >
                <Image
                  src="/images/tiktok.png"
                  alt="TikTok"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#E0D6B7]/30 flex items-center justify-center hover:border-[#E0D6B7] hover:bg-[#E0D6B7]/10 transition-all"
                aria-label="Zalo"
              >
                <Image
                  src="/images/zalo.png"
                  alt="Zalo"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>
            </div>
          <p className="text-[#E0D6B7]/60 text-xs text-right">
            © 2026—Copyright The OM Lounge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
