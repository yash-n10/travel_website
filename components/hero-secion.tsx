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
  setCurrentHeroSlide
}: {
  heroSlides: HeroSlide[],
  currentHeroSlide: number,
  setCurrentHeroSlide: React.Dispatch<React.SetStateAction<number>>
}) {
  const categories = heroSlides[currentHeroSlide].categories.slice(0, 3)
  const [mainCard, ...sideCards] = categories

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={heroSlides[currentHeroSlide].image}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Cards Layer */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        {/* Center Main Card */}
        <div className="relative z-30 -translate-y-6 left-[10px]">
          <Card className="relative overflow-hidden rounded-2xl w-72 h-96 shadow-xl border-2 border-white/20">
            <Image
              src={mainCard.image}
              alt={mainCard.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-xl sm:text-2xl font-bold">{mainCard.name}</h3>
            </div>
          </Card>
        </div>

        {/* Right Side Cards */}
        <div className="absolute top-1/2 left-1/2 ml-[90px] translate-y-[-50%] translate-x-[160px] z-20">
          <div className="flex gap-4">
            {sideCards.map((card, index) => (
              <Card
                key={index}
                className="relative overflow-hidden rounded-2xl w-60 h-80 opacity-80 hover:opacity-100 transition-opacity border-2 border-white/10"
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{card.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 right-[120px] translate-y-[-50%] translate-x-[160px] z-20">
          <div className="flex gap-4">
            {sideCards.map((card, index) => (
              <Card
                key={index}
                className="relative overflow-hidden rounded-2xl w-60 h-80 opacity-80 hover:opacity-100 transition-opacity border-2 border-white/10"
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{card.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeroSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/30 ${
              index === currentHeroSlide ? "bg-white shadow-md" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
