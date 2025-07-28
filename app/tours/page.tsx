"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users } from "lucide-react"
import { TourRedirectButton } from "@/components/tour-redirect-button"
import { fetchTourPackages } from "@/utils/api"
import { TourPackage } from "@/types"
import { useSearchParams } from "next/navigation"
import { slugify } from "@/utils/slugify"
import { useRouter } from "next/navigation"
import { Loader2, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"

type Tour = {
  id: number
  title: string
  country: string
  location: string
  duration: string
  price: string
  rating: number
  reviews: number
  image: string
  category: string
  groupSize: string
  highlights: string[]
}

export default function ToursPage() {
  const searchParams = useSearchParams()
  const countryParam = searchParams.get("country")?.toLowerCase()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [tours, setTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedTourId, setSelectedTourId] = useState<string | number | null>(null)
  const router = useRouter()

  const fallbackTours: Tour[] = [
    {
      id: 1,
      title: "Classic European Tour",
      country: "France",
      location: "Paris, France",
      duration: "7 Days",
      price: "$1,299",
      rating: 4.5,
      reviews: 128,
      image: "/images/default-tour-1.jpg",
      category: "culture",
      groupSize: "12 people",
      highlights: ["Eiffel Tower visit", "Louvre Museum", "Seine River Cruise"]
    },
    // Add more fallback tours as needed
  ]

  const categories = [
    { id: "all", name: "All Tours" },
    { id: "heritage", name: "Heritage" },
    // { id: "beach", name: "Beach" },
    { id: "culture", name: "Culture" },
    { id: "adventure", name: "Adventure" },
  ]

  useEffect(() => {
    const loadTours = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data: TourPackage[] = await fetchTourPackages()

        const transformed: Tour[] = data.map((pkg) => ({
          id: pkg.id,
          title: pkg.title || "Untitled Tour",
          country: pkg.country || "Unknown Country",
          location: pkg.destination || pkg.country || "Unknown Location",
          duration: pkg.duration || `${pkg.days || 0} Days`,
          price: pkg.price || "Price on request",
          rating: Math.min(Math.max(pkg.rating || 0, 0), 5),
          reviews: pkg.review || 0,
          image: pkg.image1 || "/images/default-tour.jpg",
          category: (pkg.category || "other").toLowerCase(),
          groupSize: `${pkg.groupSize || 1} people`,
          highlights: pkg.highlights || ["Experience local culture"]
        }))

        setTours(transformed.length > 0 ? transformed : fallbackTours)
      } catch (err) {
        console.error("Tour fetch failed:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        setTours(fallbackTours)
      } finally {
        setIsLoading(false)
      }
    }

    loadTours()
  }, [])

  const filteredTours = tours.filter((tour) => {
    const matchesCategory = selectedCategory === "all" || tour.category?.toLowerCase() === selectedCategory.toLowerCase()
    const matchesCountry = !countryParam || 
                         (tour.country?.toLowerCase().includes(countryParam) || 
                         (tour.location?.toLowerCase().includes(countryParam))
                       )
      return (
        matchesCategory && matchesCountry
      )
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading tours...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Explore Our Tours</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations and create unforgettable memories with our carefully curated tour packages.
          </p>
        </div>

        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded">
            <p>Warning: {error}. Showing {tours === fallbackTours ? 'fallback' : 'API'} data.</p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`text-sm sm:text-base ${
                selectedCategory === category.id ? "bg-red-600 hover:bg-red-700" : ""
              }`}
              size="sm"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative h-60 w-full">
                <Image 
                  src={tour.image} 
                  alt={tour.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white">
                    {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="text-sm truncate">{tour.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(tour.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {tour.rating.toFixed(1)} ({tour.reviews} reviews)
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {(tour.highlights || []).slice(0, 3).map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span className="line-clamp-2">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xl font-bold text-red-600">{tour.price}</span>
                    {!tour.price.includes("request") && (
                      <span className="text-xs text-gray-600 ml-1">per person</span>
                    )}
                  </div>
                   <TourRedirectButton
                    tourId={tour.id}
                    tourTitle={tour.title}
                    variant="default"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    showIcon={true}
                    onTourSelect={(id) => setSelectedTourId(id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTours.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No tours found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCategory("all")
                router.push("/tours")
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}