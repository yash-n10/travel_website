"use client"

import Image from "next/image"

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
  const prevSlide = () => {
    setCurrentHeroSlide(
      currentHeroSlide === 0 ? heroSlides.length - 1 : currentHeroSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentHeroSlide(
      currentHeroSlide === heroSlides.length - 1 ? 0 : currentHeroSlide + 1
    );
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat">
        <Image
          src={heroSlides[currentHeroSlide]?.image || "/images/placeholder.jpg"}
          alt="Slide background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center px-4 z-20">
        {/* <h1 className="text-white text-3xl sm:text-5xl font-bold text-center drop-shadow-2xl">
          Welcome to Go Samayati
        </h1> */}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-30 transition-all duration-100"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-30 transition-all duration-100"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeroSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-100 shadow-lg border border-white/30 ${
              index === currentHeroSlide
                ? "bg-white scale-125 shadow-white/50"
                : "bg-white/50 hover:bg-white/75 hover:scale-110"
            }`}
          />
        ))}
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-100 hover:scale-110 z-50 border-2 border-white/20"
      >
        <svg
          className="lucide lucide-arrow-up w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M5 12l7-7 7 7"></path>
          <path d="M12 19V5"></path>
        </svg>
      </button>
    </section>
  );
}
