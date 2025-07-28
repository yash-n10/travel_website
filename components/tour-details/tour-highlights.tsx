"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { fetchTourPackages } from "@/utils/api"
import type { TourPackage } from "@/types/index"

interface TourHighlightsProps {
  tourId: string | number
}

export function TourHighlights({ tourId }: TourHighlightsProps) {
  const [tour, setTour] = useState<TourPackage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTour = async () => {
      try {
        setLoading(true)
        setError(null)

        const packages = await fetchTourPackages()
        console.log("All packages fetched:", packages)

        const matchedTour = packages.find(
          (pkg: TourPackage) => String(pkg.id) === String(tourId)
        )

        if (!matchedTour) {
          setError("Tour not found")
          return
        }

        console.log("Matched tour:", matchedTour)
        setTour(matchedTour)
      } catch (err) {
        console.error("Error loading tour:", err)
        setError("Failed to load tour highlights")
      } finally {
        setLoading(false)
      }
    }

    loadTour()
  }, [tourId])

  if (loading) {
    return <div className="mb-6 text-gray-500 text-sm">Loading highlights...</div>
  }

  if (error || !tour) {
    return <div className="mb-6 text-red-500 text-sm">{error || "Could not load tour highlights"}</div>
  }

  const duration = `${tour.days} Days & ${tour.nights} Nights`
  console.log("Tour basic_info:", tour.basic_info)
  console.log("Tour title:", tour.title)

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div className="flex-1">
          <Badge className="bg-orange-100 text-orange-800 mb-2 text-xs">{duration}</Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">{tour.title}</h1>

          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(tour.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({tour.review} reviews)</span>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm mb-4 border border-red-500 p-4 rounded-lg">
            {tour.basic_info || "Explore this amazing destination with our expertly crafted tour package."}
          </p>
        </div>

        <div className="mt-4 md:mt-0 md:ml-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center min-w-[140px]">
            {/* <div className="text-xs text-gray-600 mb-1">Starts from</div> */}
            {/* <div className="text-xl font-bold text-red-600">{tour.price}</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
