"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import { fetchTourPackages } from "@/utils/api"
import { TourPackage } from "@/types/index"

interface BookingSidebarProps {
  tourId: string | number
}

export function BookingSidebar({ tourId }: BookingSidebarProps) {
  const [price, setPrice] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTourPrice = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("Fetching tour packages for price...")
        const packages = await fetchTourPackages()
        
        const matchedTour = packages.find(pkg => String(pkg.id) === String(tourId))
        
        if (!matchedTour) {
          setError("Tour not found")
          return
        }

        setPrice(matchedTour.price)
        console.log("Price loaded:", matchedTour.price)
      } catch (err) {
        console.error("Failed to fetch tour price:", err)
        setError("Error loading price")
      } finally {
        setLoading(false)
      }
    }

    loadTourPrice()
  }, [tourId])

  return (
    <div className="sticky top-2 space-y-2">
      {/* Price Card */}
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <div className="border rounded-md p-4">
          <h3 className="text-sm font-bold text-red-600 mb-4 text-center">Starts from</h3>
          <div className="space-y-4">
            <div className="text-center">
              {loading ? (
                <div className="text-gray-500 text-sm">Loading price...</div>
              ) : error ? (
                <div className="text-red-500 text-sm">{error}</div>
              ) : (
                <>
                  <div className="text-xl font-bold text-red-600">{price}</div>
                  <div className="text-xs text-gray-600">per person</div>
                </>
              )}
            </div>

            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-semibold"
              disabled={loading || !!error}
            >
              BOOK NOW
            </Button>

            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent text-sm mt-2 py-3 font-semibold"
                disabled={loading || !!error}
              >
                Send Enquiry
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-bold text-red-600 mb-4 text-center">Need Help?</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <Phone className="w-4 h-4 text-red-600 mr-3" />
            <span className="text-gray-700">+91 9876543210</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-4 h-4 text-red-600 mr-3" />
            <span className="text-gray-700">holiday@gosam.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}