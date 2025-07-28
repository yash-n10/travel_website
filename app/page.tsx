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

const fallbackPackages: TourPackage[] = [
  {
    id: 1,
    title: "LONDON PACKAGE",
    days: "6",
    nights: "5",
    price: "INR 40,000",
    image1: "/images/london.jpeg",
    category: "International",
    destination: "London",
    highlights: [
      "London Eye visit",
      "Thames River cruise",
      "Historical city tour"
    ],
    rating: 4.8,
    review: 124,
    groupSize: 15,
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in London",
        content: "Arrive at Heathrow Airport, transfer to hotel, and free time to explore."
      },
      {
        day: "Day 2",
        title: "City Tour",
        content: "Visit Buckingham Palace, Big Ben, and Westminster Abbey."
      }
    ],
    duration: "5 Nights & 6 Days",
    slug: "",
    description: "",
    basic_info: ""
  },
  {
    id: 2,
    title: "PARIS PACKAGE",
    days: "8",
    nights: "7",
    price: "INR 55,000",
    image1: "/images/peris.jpeg",
    category: "International",
    destination: "Paris",
    highlights: [
      "Eiffel Tower visit",
      "Louvre Museum tour",
      "Seine River cruise"
    ],
    rating: 4.9,
    review: 156,
    groupSize: 12,
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Paris",
        content: "Arrive at Charles de Gaulle Airport, transfer to hotel."
      },
      {
        day: "Day 2",
        title: "City Highlights",
        content: "Visit Eiffel Tower and Champs-Élysées."
      }
    ],
    duration: "7 Nights & 8 Days",
    slug: "",
    description: "",
    basic_info: ""
  },
  {
    id: 3,
    title: "DUBAI PACKAGE",
    days: "5",
    nights: "4",
    price: "INR 35,000",
    image1: "/images/dubai.jpeg",
    category: "International",
    destination: "Dubai",
    highlights: [
      "Burj Khalifa visit",
      "Desert safari",
      "Palm Jumeirah tour"
    ],
    rating: 4.7,
    review: 98,
    groupSize: 20,
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Dubai",
        content: "Arrive at Dubai International Airport, transfer to hotel."
      },
      {
        day: "Day 2",
        title: "Modern Dubai",
        content: "Visit Burj Khalifa and Dubai Mall."
      }
    ],
    duration: "4 Nights & 5 Days",
    slug: "",
    description: "",
    basic_info: ""
  },
  {
    id: 4,
    title: "SINGAPORE PACKAGE",
    days: "7",
    nights: "6",
    price: "INR 45,000",
    image1: "/images/singapore.jpeg",
    category: "International",
    destination: "Singapore",
    highlights: [
      "Marina Bay Sands",
      "Gardens by the Bay",
      "Sentosa Island"
    ],
    rating: 4.8,
    review: 112,
    groupSize: 18,
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Singapore",
        content: "Arrive at Changi Airport, transfer to hotel."
      },
      {
        day: "Day 2",
        title: "City Tour",
        content: "Visit Merlion Park and Chinatown."
      }
    ],
    duration: "6 Nights & 7 Days",
    slug: "",
    description: "",
    basic_info: ""
  }
];

const heroSlides: HeroSlide[] = [
  {
    image: "/images/heritage-hotel.webp",
    categories: [
      { name: "Heritage", image: "/images/portlouis.jpeg" },
      { name: "Culture", image: "/images/mauritius-beach.jpeg" },
    ],
  },
  {
    image: "/images/mauritius-beach.jpeg",
    categories: [
      { name: "Beach", image: "/images/mauritius-beach.jpeg" },
      { name: "Cities", image: "/images/portlouis.jpeg" },
    ],
  },
  {
    image: "/images/heritage-hotel.webp",
    categories: [
      { name: "Heritage", image: "/images/portlouis.jpeg" },
      { name: "Culture", image: "/images/mauritius-beach.jpeg" },
    ],
  },
  {
    image: "/images/mauritius-beach.jpeg",
    categories: [
      { name: "Beach", image: "/images/mauritius-beach.jpeg" },
      { name: "Cities", image: "/images/portlouis.jpeg" },
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
    <div className="min-h-screen bg-white">
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
        fallbackPackages={fallbackPackages}
      />
      
      <TourPackagesSection 
        title="VISIT THE HEART OF INDIA" 
        packages={packages.slice(4, 8)}
        isLoading={isLoading}
        error={error}
        fallbackPackages={fallbackPackages}
      />
      
      <TourPackagesSection 
        title="EXPLORE THE WORLD" 
        packages={packages.slice(0, 4)}
        isLoading={isLoading}
        error={error}
        fallbackPackages={fallbackPackages}
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