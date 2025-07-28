"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { TourRedirectButton } from "@/components/tour-redirect-button"
import { TourPackage } from "@/types/index"
import { slugify } from "@/utils/slugify"
import { useState } from "react"

interface TourPackagesSectionProps {
  title: string
  packages: TourPackage[]
  isLoading: boolean
  error: string | null
  fallbackPackages: TourPackage[]
}

export function TourPackagesSection({ 
  title, 
  packages,
  isLoading,
  error,
  fallbackPackages
}: TourPackagesSectionProps) {
  const [selectedTourId, setSelectedTourId] = useState<string | number | null>(null)

  const renderPackageCards = () => {
    if (isLoading) {
      return Array(4).fill(0).map((_, index) => (
        <Card key={`loading-${index}`} className="overflow-hidden animate-pulse bg-white rounded-lg shadow-sm h-full">
          <div className="relative h-32 sm:h-36 md:h-40 bg-gray-200" />
          <CardContent className="p-3 md:p-4">
            <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
            <div className="h-8 w-full bg-gray-200 rounded" />
          </CardContent>
        </Card>
      ))
    }

    const packagesToShow = (error || !packages?.length) ? fallbackPackages : packages
   
    return packagesToShow.map((pkg) => {
      if (!pkg.id || !pkg.title) {
        console.warn(`Skipping tour package with missing ID or title`, pkg)
        return null
      }
      return (
        <Card key={pkg.id} className="overflow-hidden bg-white rounded-[20px] shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
          <div className="relative h-50 sm:h-70 md:h-60">
            <Image 
              src={pkg.image1 || "/images/default-tour.jpg"} 
              alt={pkg.title || "Tour package"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
            />
          </div>
          <CardContent className="p-3 md:p-4 flex-grow flex flex-col">
            {/* {pkg.duration && (
              <div className="text-xs text-gray-500 mb-1">
                {pkg.duration}
              </div>
            )} */}
            <div className="text-xs text-gray-500 mb-1">
                {pkg.nights} Nights & {pkg.days} Days  
            </div>
            <h3 className="font-bold text-red-600 mb-1 text-sm md:text-base leading-tight line-clamp-2 uppercase">
              {pkg.title}
            </h3>
            <p className="text-sm md:text-base font-semibold text-gray-900 mb-3">
              {pkg.price || "Price not available"}
            </p>
            <div className="mt-auto">
              <TourRedirectButton
                tourId={pkg.id}
                tourTitle={pkg.title}
                variant="default"
                size="sm"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                showIcon={true}
                onTourSelect={setSelectedTourId}
              />
            </div>
          </CardContent>
        </Card>
      )
    }).filter(Boolean)
  }

  return (
    <section className="py-12 sm:py-16 bg-white w-[90vw] mx-auto">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          
          {/* <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{title}</h2> */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">{title}</h2>
          {!isLoading && (
            <Link 
              href="/tours" 
              className="text-red-600 hover:underline flex items-center text-xs sm:text-sm transition-colors"
              prefetch={false}
            >
              View all <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {renderPackageCards()}
        </div>
      </div>
    </section>
  )
}