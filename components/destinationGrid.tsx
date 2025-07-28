"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export function DestinationGrid() {
  return (
    <section className="py-12 sm:py-16 bg-white w-[90vw] mx-auto">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">PACK & GO GETAWAYS</h2>
        
        {/* Mobile: Single column stack */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          <Link href={`/tours?country=Karnataka`}>
            <Card className="relative overflow-hidden rounded-lg h-[200px] group cursor-pointer">
              <Image src="/images/Karnataka 1.jpg" alt="Karnataka " fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Karnataka</h3>
              </div>
            </Card>
          </Link>
          <Link href={`/tours?country=Andaman`}>
            <Card className="relative overflow-hidden rounded-lg h-[200px] group cursor-pointer">
              <Image src="/images/Andaman.jpg" alt="Andaman" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Andaman</h3>
              </div>
            </Card>
          </Link>
          <Link href={`/tours?country=Kerala`}>
            <Card className="relative overflow-hidden rounded-lg h-[200px] group cursor-pointer">
              <Image src="/images/Kerala1.jpg" alt="Kerala" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Kerala</h3>
              </div>
            </Card>
          </Link>
          <Link href={`/tours?country=Himachal Pradesh`}>
            <Card className="relative overflow-hidden rounded-lg h-[200px] group cursor-pointer">
              <Image src="/images/Himachal_Pradesh.jpg" alt="Himachal Pradesh" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Himachal Pradesh</h3>
              </div>
            </Card>
          </Link>
          <Link href={`/tours?country=Ladakh`}>
            <Card className="relative overflow-hidden rounded-lg h-[200px] group cursor-pointer">
              <Image src="/images/ladakh.jpg" alt="Ladakh" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Ladakh</h3>
              </div>
            </Card>
          </Link>
          <Link href={`/tours?country=Hong Kong`}>
            <Card className="relative overflow-hidden rounded-lg h-[200px] group cursor-pointer">
              <Image src="/images/hongKong.jpeg" alt="Hong Kong" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">Hong Kong</h3>
              </div>
            </Card>
          </Link>
        </div>

        {/* Desktop: Exact layout matching reference image */}
        <div className="hidden md:flex gap-4 h-[400px]">
          {/* Left Column - 2x2 grid */}
          <div className="flex flex-col gap-4 w-1/3">
            <div className="flex gap-4 h-1/2">
              {/* Kenya - top left */}
              <Link href={`/tours?country=Karnataka`} className="flex-1">
                <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer">
                  <Image src="/images/Karnataka 1.jpg" alt="Karnataka" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">Karnataka</h3>
                  </div>
                </Card>
              </Link>
            </div>
            <div className="flex gap-4 h-1/2">
              {/* Australia - bottom left */}
              <Link href={`/tours?country=Andaman`} className="flex-1">
                <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer">
                  <Image src="/images/Andaman.jpg" alt="Andaman" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">Andaman</h3>
                  </div>
                </Card>
              </Link>
              {/* Mauritius - bottom right of left section */}
              <Link href={`/tours?country=Kerala`} className="flex-1">
                <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer">
                  <Image src="/images/Kerala1.jpg" alt="Kerala" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">Kerala</h3>
                  </div>
                </Card>
              </Link>
            </div>
          </div>

          {/* Middle Column - Switzerland (tall) */}
          <div className="w-1/3">
            <Link href={`/tours?country=Himachal Pradesh`} className="block h-full">
              <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer">
                <Image src="/images/Himachal_Pradesh.jpg" alt="Himachal Pradesh" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-semibold text-white">Himachal Pradesh</h3>
                </div>
              </Card>
            </Link>
          </div>

          {/* Right Column - London and Hong Kong stacked */}
          <div className="flex flex-col gap-4 w-1/3">
            {/* London - top right */}
            <Link href={`/tours?country=Ladakh`} className="h-1/2">
              <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer">
                <Image src="/images/ladakh.jpg" alt="London" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold text-white">Ladakh</h3>
                </div>
              </Card>
            </Link>
            {/* Hong Kong - bottom right */}
            <Link href={`/tours?country=Hong Kong`} className="h-1/2">
              <Card className="relative overflow-hidden rounded-lg h-full group cursor-pointer">
                <Image src="/images/hongKong.jpeg" alt="Hong Kong" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"/>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold text-white">Hong Kong</h3>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}