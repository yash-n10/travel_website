"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"

type HeroSlide = {
  image: string;
  categories: {
    name: string;
    image: string;
  }[];
};

export function HeroSection({
  heroSlides,
  currentHeroSlide,
  setCurrentHeroSlide,
}: {
  heroSlides: HeroSlide[];
  currentHeroSlide: number;
  setCurrentHeroSlide: React.Dispatch<React.SetStateAction<number>>;
}) {
  const rawCategories = heroSlides[currentHeroSlide]?.categories || [];

  // Fill to ensure 3 cards
  const categories = [...rawCategories];
  while (categories.length < 3) {
    categories.push({
      name: "Coming Soon",
      image: "/images/placeholder.jpg", // Ensure this image exists in /public/images
    });
  }

  const [leftCard, centerCard, rightCard] = categories;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat">
        <Image
          src={heroSlides[currentHeroSlide]?.image || "/images/placeholder.jpg"}
          alt="Slide background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Cards */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="flex justify-center items-center">
            {/* Left Card */}
            <div className="relative cursor-pointer transition-all duration-500 ease-in-out z-20 scale-95 -mr-4 opacity-95 w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-300">
                <Image
                  alt={leftCard.name}
                  src={leftCard.image || "/images/placeholder.jpg"}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center drop-shadow-2xl">{leftCard.name}</h3>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-2xl border border-white/10"></div>
              </div>
            </div>

            {/* Center Card */}
            <div className="relative cursor-pointer transition-all duration-500 ease-in-out z-30 scale-105 mx-2 w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-300">
                <Image
                  alt={centerCard.name}
                  src={centerCard.image || "/images/placeholder.jpg"}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center drop-shadow-2xl">{centerCard.name}</h3>
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-1 bg-white rounded-full opacity-90 shadow-lg"></div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-2xl border border-white/10"></div>
              </div>
            </div>

            {/* Right Card */}
            <div className="relative cursor-pointer transition-all duration-500 ease-in-out z-20 scale-95 -ml-4 opacity-95 w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-300">
                <Image
                  alt={rightCard.name}
                  src={rightCard.image || "/images/placeholder.jpg"}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center drop-shadow-2xl">{rightCard.name}</h3>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-2xl border border-white/10"></div>
              </div>
            </div>
          </div>

          {/* Left Arrow
          <button
            onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 z-40 disabled:opacity-50 shadow-xl border border-white/20"
          >
            <svg className="lucide lucide-chevron-left w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18L9 12l6-6" /></svg>
          </button> */}

          {/* Right Arrow
          <button
            onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 z-40 disabled:opacity-50 shadow-xl border border-white/20"
          >
            <svg className="lucide lucide-chevron-right w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
          </button> */}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeroSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg border border-white/30 ${
              index === currentHeroSlide
                ? "bg-white scale-125 shadow-white/50"
                : "bg-white/50 hover:bg-white/75 hover:scale-110"
            }`}
          />
        ))}
      </div>

      {/* Scroll to Top Button */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 z-50 border-2 border-white/20">
        <svg className="lucide lucide-arrow-up w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 12l7-7 7 7"></path>
          <path d="M12 19V5"></path>
        </svg>
      </button>
    </section>
  );
}
