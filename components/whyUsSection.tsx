"use client"

import React from "react"

const features = [
  { title: "Customized", subtitle: "Tours" },
  { title: "Experts", subtitle: "Knowledge" },
  { title: "Trusted", subtitle: "Services" },
  { title: "24/7", subtitle: "Support" },
]

export function WhyUsSection() {
  return (
    <div className="py-20 px-4 text-center">
      <h2 className="text-2xl font-semibold text-black mb-1">Why Us</h2>
      <p className="text-xl font-bold text-red-600 mb-8">Because we care !</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#FF0000] text-white rounded-lg py-10 px-4 shadow-md text-lg font-semibold flex flex-col justify-center items-center"
          >
            <span>{feature.title}</span>
            <span>{feature.subtitle}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
