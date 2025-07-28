"use client"

export const dynamic = "force-dynamic";

import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ImageSlider } from "@/components/tour-details/image-slider"
import { TourHighlights } from "@/components/tour-details/tour-highlights"
import { Itinerary } from "@/components/tour-details/itineary"
import { InclusionExclusion } from "@/components/tour-details/inclusion-exclusion"
import { RelatedPackages } from "@/components/tour-details/relatedPackeges"
import { PolicyAccordion } from "@/components/tour-details/Policy"
import { BookingSidebar } from "@/components/tour-details/booking-sidebar"
import { Footer } from "@/components/footer"
import { TourRedirectButton } from "@/components/tour-redirect-button"
import { fetchTourPackages } from "@/utils/api"
import { TourPackage } from "@/types/index"
import { TourPackagesSection } from "@/components/tour-package";

export default function TourPageClient() {
  const searchParams = useSearchParams()
  const [tourPackage, setTourPackage] = useState<TourPackage | null>(null)
  const [relatedPackages, setRelatedPackages] = useState<TourPackage[]>([])
  const [selectedTourId, setSelectedTourId] = useState<string | number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const tourId = searchParams.get("id")
  const [packages, setPackages] = useState<TourPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!tourId) {
      setLoading(false)
      setError("Tour ID not specified")
      return
    }
    async function loadTour() {
      try {
    setLoading(true)
    
    // Ensure tourId exists before making the call
    if (!tourId) {
      setError("Tour ID not specified")
      return
    }
        const packages = await fetchTourPackages(tourId)
        if (!packages || packages.length === 0) {
          setError("Tour not found")
          return
        }

        const foundPackage = packages[0]
        setTourPackage(foundPackage)

        // Load related packages
        const related = await fetchTourPackages({
          category: foundPackage.category,
          exclude: foundPackage.id,
          limit: 4
        })
        setRelatedPackages(related)

      } catch (err) {
        setError("Failed to load tour details")
        console.error("Tour loading error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadTour()
  }, [tourId])

    useEffect(() => {
    const loadPackages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchTourPackages({
          limit: 8,
          category: 'International'
        });
        
        const packageData = Array.isArray(data) ? data : [];
        setPackages(packageData);
        
        if (packageData.length === 0) {
          setError('No tour packages found');
        }
      } catch (err) {
        console.error('Failed to fetch packages:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setPackages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPackages();
  }, []);

  const duration = tourPackage 
    ? `${tourPackage.days} Days & ${tourPackage.nights} Nights`
    : ""

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    )
  }

  if (error || !tourPackage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Tour Package Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "The requested tour package could not be loaded."}</p>
          <Link href="/tours">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Browse All Tours
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Updated ImageSlider usage - now only needs tourId */}
      <ImageSlider tourId={tourId || ""} />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">

            <TourHighlights tourId={tourId || ""} />

            {/* <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <TourRedirectButton
                tourId={tourPackage.id}
                tourTitle={tourPackage.title}
                className="bg-red-600 hover:bg-red-700"
                showIcon={true}
                onTourSelect={setSelectedTourId} // Pass the setter function
              />
              <Link href="/contact" prefetch={false}>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 text-sm font-semibold bg-transparent"
                >
                  SEND AN ENQUIRY
                </Button>
              </Link>
            </div> */}

            <Itinerary tourId={tourId || ""} />
            <InclusionExclusion />

            <div className="mb-6">
              <h3 className="text-lg font-bold text-red-600 mb-3">KNOW BEFORE YOU GO</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Check visa requirements well in advance of your travel date.
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Local currency is recommended for small purchases and tips.
                </li>
              </ul>
            </div>

            <TourPackagesSection 
                    title="Related" 
                    packages={packages.slice(4, 8)}
                    isLoading={isLoading}
                    error={error}
                    fallbackPackages={[]}
                  />
            <PolicyAccordion />
          </div>

          <div className="lg:col-span-1">
            <BookingSidebar tourId={tourId || ""} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}