"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface BookingRedirectProps {
  tourId: string | number
  className?: string
  children?: React.ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function BookingRedirect({
  tourId,
  className = "",
  children = "Book Now",
  variant = "default",
  size = "default",
}: BookingRedirectProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleBookingRedirect = async () => {
    setIsLoading(true)

    // Add a small delay for smooth transition
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      router.push(`/booking/${tourId}`)
    } catch (error) {
      console.error("Navigation error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleBookingRedirect}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={`transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Redirecting...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
