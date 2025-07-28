"use client"

import Image from "next/image"
import { Quote } from "lucide-react"
import { Testimonial } from "@/types/index"
import { useMemo } from "react"

// Array of different static profile images
const staticAvatarImages = [
  "/images/profile.jpeg",
  "/images/profile2.jpeg",
  "/images/profile3.jpeg",
  "/images/profile4.jpeg",
  "/images/profile.jpeg",
  "/images/profile2.jpeg",
  "/images/profile3.jpeg",
  "/images/profile4.jpeg",
]

export function TestimonialsSection({
  testimonials,
  currentTestimonial,
  setCurrentTestimonial
}: {
  testimonials: Testimonial[]
  currentTestimonial: number
  setCurrentTestimonial: (value: number) => void
}) {
  // Get a random fallback image for the current testimonial
  const randomFallbackImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * staticAvatarImages.length)
    return staticAvatarImages[randomIndex]
  }, [currentTestimonial]) // Change when testimonial changes

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">Testimonials</h2>

        {testimonials.length > 0 ? (
          <div className="relative max-w-2xl mx-auto">
            {/* Orbiting avatars */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-96 h-96 relative">
                {staticAvatarImages.map((image, index) => {
                  const angle = (index / staticAvatarImages.length) * 2 * Math.PI
                  const radius = 180
                  const x = radius * Math.cos(angle)
                  const y = radius * Math.sin(angle)
                  return (
                    <Image
                      key={index}
                      src={image}
                      alt="Orbiting Avatar"
                      width={50}
                      height={50}
                      className="rounded-full absolute opacity-40 blur-sm"
                      style={{
                        left: `calc(50% + ${x}px - 25px)`,
                        top: `calc(50% + ${y}px - 25px)`
                      }}
                    />
                  )
                })}
              </div>
            </div>

            {/* Central avatar with quote icon */}
            <div className="relative mx-auto w-20 h-20 mb-6">
              <Image
                src={testimonials[currentTestimonial].image ?? randomFallbackImage}
                alt={testimonials[currentTestimonial].name}
                width={80}
                height={80}
                className="rounded-full object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute -top-2 -left-2 bg-red-600 text-white p-1 rounded-full shadow">
                <Quote className="w-4 h-4" />
              </div>
            </div>

            {/* Rest of your testimonial content... */}
            <p className="text-sm text-red-600 font-semibold mb-1">{testimonials[currentTestimonial].title}</p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4 px-4">
              {testimonials[currentTestimonial].text}
            </p>
            <p className="font-semibold text-gray-900">
              {testimonials[currentTestimonial].name}
            </p>
            <p className="text-sm text-gray-600 mb-6">
              {testimonials[currentTestimonial].location}
            </p>

            {/* Dot navigation */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-red-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-lg">Loading testimonials...</p>
        )}
      </div>
    </section>
  )
}