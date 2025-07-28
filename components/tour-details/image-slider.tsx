"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { fetchTourPackages } from "@/utils/api"
import type { TourPackage } from "@/types/index"

interface ImageSliderProps {
  tourId: string | number  // Accepts both string and number IDs
  autoSlideInterval?: number
  className?: string
}

export function ImageSlider({ 
  tourId, 
  autoSlideInterval = 5000,
  className = ""
}: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [tourData, setTourData] = useState<TourPackage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const fetchTourData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Convert tourId to string if it's a number
      const idString = typeof tourId === 'number' ? tourId.toString() : tourId
      
      // Fetch tour data using the ID
      const packages = await fetchTourPackages(idString)
      
      if (!packages || packages.length === 0) {
        throw new Error("Tour package not found")
      }

      // Find the exact package matching our ID (not just taking index 0)
      const packageData = packages.find(pkg => 
        pkg.id.toString() === idString || 
        pkg.slug === idString
      )

      if (!packageData) {
        throw new Error(`Tour package with ID ${idString} not found in response`)
      }
      
      
      // Process the data with fallbacks
      const processedData = {
        ...packageData,
        title: packageData.title || 'Tour Package',
        days: packageData.days || '0',
        nights: packageData.nights || '0',
        image1: packageData.image1 || '/images/default-tour.jpg',
        // Handle optional images
        ...(packageData.image2 && { image2: packageData.image2 }),
        ...(packageData.image3 && { image3: packageData.image3 }),
        ...(packageData.image4 && { image4: packageData.image4 }),
        ...(packageData.image5 && { image5: packageData.image5 }),
      }

      setTourData(processedData)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : "Failed to load tour")
    } finally {
      setLoading(false)
    }
  }, [tourId])  // Re-fetch when tourId changes

  useEffect(() => {
    fetchTourData()
  }, [fetchTourData])

  // Build images array with only valid URLs
  const images = tourData
    ? [
        tourData.image1,
        ...(tourData.image2 ? [tourData.image2] : []),
        ...(tourData.image3 ? [tourData.image3] : []),
        ...(tourData.image4 ? [tourData.image4] : []),
        ...(tourData.image5 ? [tourData.image5] : []),
      ].filter((img): img is string => !!img)
    : ['/images/default-tour.jpg']

  // Get display values
  const title = tourData?.title || 'Tour Package'
  const duration = tourData?.duration || 
    (tourData?.days && tourData?.nights 
      ? `${tourData.days} Days & ${tourData.nights} Nights` 
      : '')

  // Navigation handlers
  const goToSlide = useCallback((index: number) => {
    if (images.length > 0) {
      const newIndex = (index + images.length) % images.length
      setCurrentSlide(newIndex)
    }
  }, [images.length])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  // Auto-slide effect
  useEffect(() => {
    if (images.length <= 1) return
    
    const interval = setInterval(() => {
      if (!isHovered) nextSlide()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [images.length, isHovered, autoSlideInterval, nextSlide])

  if (loading) {
    return <div className={`relative h-64 md:h-96 w-full bg-gray-200 rounded-lg animate-pulse ${className}`} />
  }

  if (error || !tourData) {
    return (
      <div className={`relative h-64 md:h-96 w-full bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <p className="text-gray-600 mb-2">{error || "Tour unavailable"}</p>
          <button 
            onClick={fetchTourData}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className={`relative h-64 md:h-96 w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        {/* Slides */}
        <div className="relative h-full w-full">
          {images.map((img, index) => (
            <div key={`slide-${index}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}>
              <Image
                src={img}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  // target.src = '/images/default-tour.jpg'
                }}
              />
            </div>
          ))}
        </div>

        {/* Overlay and info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 z-20 text-white">
          <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg">{title}</h1>
          {duration && (
            <p className="text-lg md:text-xl font-medium drop-shadow-md">
              {duration}
            </p>
          )}
        </div>

        {/* Navigation controls */}
        {images.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {images.map((_, index) => (
                <button
                  key={`indicator-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-red-600 w-6' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
            <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-20">
              <ChevronDown className="rotate-90 w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-20">
              <ChevronDown className="-rotate-90 w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </section>
  )
}