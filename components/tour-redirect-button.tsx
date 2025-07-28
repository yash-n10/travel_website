// components/tour-redirect-button.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { slugify } from "@/utils/slugify"

interface TourRedirectButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showIcon?: boolean
  tourId: string | number
  tourTitle?: string
  onTourSelect?: (tourId: string | number) => void
  disabled?: boolean
}

export function TourRedirectButton({
  className = "",
  variant = "default",
  size = "default",
  showIcon = true,
  tourId,
  tourTitle = "",
  onTourSelect,
  disabled = false,
}: TourRedirectButtonProps) {
  const handleClick = () => {
    if (onTourSelect) {
      onTourSelect(tourId)
    }
  }

  const href = `/tour?id=${encodeURIComponent(tourId.toString())}${
    tourTitle ? `&title=${encodeURIComponent(slugify(tourTitle))}` : ''
  }`

  return (
    <Link href={href} className={className} onClick={handleClick} prefetch={false}>
      <Button
        variant={variant}
        size={size}
        className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-[#FF0000] hover:bg-red-700 text-white"
        disabled={disabled}
      >
        <span>Book Now</span>
        {showIcon && <ExternalLink className="w-4 h-4" />}
      </Button>
    </Link>
  )
}