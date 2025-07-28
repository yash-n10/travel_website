"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, ExternalLink } from "lucide-react"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

interface EnhancedBookButtonProps {
  tourId: string | number
  tourTitle?: string
  price?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showIcon?: boolean
}

export function EnhancedBookButton({
  tourId,
  tourTitle,
  price,
  className = "",
  variant = "default",
  size = "default",
  showIcon = false,
}: EnhancedBookButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleBooking = async () => {
    setIsLoading(true)

    // Smooth transition with loading state
    try {
      // Add analytics tracking if needed
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "book_now_click", {
          tour_id: tourId,
          tour_title: tourTitle,
          price: price,
        })
      }

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))

      router.push(`/booking/${tourId}`)
    } catch (error) {
      console.error("Booking redirect error:", error)
      setIsLoading(false)

      // Fallback: try window.location
      window.location.href = `/booking/${tourId}`
    }
  }

  return (
    <Button
      onClick={handleBooking}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={`
        relative overflow-hidden transition-all duration-300 transform 
        hover:scale-105 hover:shadow-lg active:scale-95
        ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Redirecting...</span>
        </div>
      ) : (
        <div className="flex items-center">
          <span>Book Now</span>
          {showIcon && <ExternalLink className="w-4 h-4 ml-2" />}
        </div>
      )}

      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-md" />
    </Button>
  )
}
