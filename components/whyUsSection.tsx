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
      <h2 className="text-3xl font-semibold text-black mb-1">Why Us</h2>
      <p className="text-3xl font-bold text-red-600 mb-8">Because we care !</p>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
  {features.map((feature, index) => (
    <div
      key={index}
      className="bg-[#FF0000] text-white rounded-xl py-14 px-6 shadow-lg text-xl font-semibold flex flex-col justify-center items-center min-h-[225px] w-full"
    >
      <span className="mb-2 text-3xl text-center">{feature.title}</span>
      <span className="text-3xl font-medium text-center">{feature.subtitle}</span>
    </div>
  ))}
</div>


    </div>
  )
}
