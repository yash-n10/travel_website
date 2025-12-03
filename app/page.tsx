"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-secion"
import { DestinationGrid } from "@/components/destinationGrid"
import { TourPackagesSection } from "@/components/tour-package"
import { TestimonialsSection } from "@/components/testimonial"
import { Footer } from "@/components/footer"
import { fetchTourPackages, fetchTestimonials } from "@/utils/api"
import { TourPackage, Testimonial, HeroSlide } from "@/types/index"
import { TourRedirectButton } from "@/components/tour-redirect-button"
import HolidayBanner from '@/components/holidaySpecial';
import { FloatingVideoGrid } from "@/components/videoPannel"
import { WhyUsSection } from "@/components/whyUsSection"


const fallbackTestimonials = [
  {
    name: "John Smith",
    location: "Tourist",
    rating: 5,
    text: "I had an amazing experience with this company. The service was top-notch, and the staff was incredibly friendly. I highly recommend them!",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Sarah Johnson",
    location: "Traveler",
    rating: 5,
    text: "Excellent service and great value for money. The tour was well organized and exceeded my expectations.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Mike Wilson",
    location: "Explorer",
    rating: 5,
    text: "Professional team with great attention to detail. Will definitely book with them again!",
    image: "/placeholder.svg?height=60&width=60",
  },
];

// removed fallbackPackages data

const heroSlides: HeroSlide[] = [
  {
    image: "/images/M1.jpg",
    categories: [
      { name: "Heritage", image: "/images/M1.jpg" },
      { name: "Cities", image: "/images/new_slide2.jpg" },
      { name: "Beach", image: "/images/new_slide3.jpg" },

    ],
  },
  {
    image: "/images/q2_final.jpg",
    categories: [
      { name: "Cities", image: "/images/new_slide2.jpg" },
      { name: "Heritage", image: "/images/new_slide3.jpg" },
      { name: "Beach", image: "/images/new_slide1.jpg" },

    ],
  },
 
  {
    image: "/images/AA11.jpg",
    categories: [
      { name: "Beach", image: "/images/new_slide3.jpg" },
      { name: "Cities", image: "/images/new_slide1.jpg" },
      { name: "Heritage", image: "/images/new_slide2.jpg" },

    ],
  },
];

export default function GoSamyatiTravel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [openPolicy, setOpenPolicy] = useState<string | null>(null)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [packages, setPackages] = useState<TourPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const result = await res.json();
      
        setTestimonials(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-white w-screen">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      <HeroSection 
        heroSlides={heroSlides}
        currentHeroSlide={currentHeroSlide}
        setCurrentHeroSlide={setCurrentHeroSlide}
      />
      
      <DestinationGrid />
      
      <TourPackagesSection 
        title="GOSAMYATI SPECIALS" 
        packages={packages.slice(0, 4)}
        isLoading={isLoading}
        error={error}
        fallbackPackages={[]}
      />
      
      <TourPackagesSection 
        title="VISIT THE HEART OF INDIA" 
        packages={packages.slice(4, 8)}
        isLoading={isLoading}
        error={error}
        fallbackPackages={[]}
      />
      
      <TourPackagesSection 
        title="EXPLORE THE WORLD" 
        packages={packages.slice(0, 4)}
        isLoading={isLoading}
        error={error}
        fallbackPackages={[]}
      />
      <HolidayBanner />
      <FloatingVideoGrid />

      <TestimonialsSection 
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />

      <WhyUsSection />
      
      <Footer />
    </div>
  )
}