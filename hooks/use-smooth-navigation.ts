"use client"

import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"

export function useSmoothNavigation() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigateTo = useCallback(
    async (path: string, delay = 300) => {
      setIsNavigating(true)

      try {
        // Add smooth transition delay
        await new Promise((resolve) => setTimeout(resolve, delay))

        // Use router.push for client-side navigation
        router.push(path)
      } catch (error) {
        console.error("Navigation error:", error)

        // Fallback to window.location
        window.location.href = path
      } finally {
        // Reset loading state after a delay
        setTimeout(() => setIsLoading(false), 1000)
      }
    },
    [router],
  )

  return {
    navigateTo,
    isNavigating,
    isLoading,
  }
}
