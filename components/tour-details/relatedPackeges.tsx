"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TourPackage } from "@/types/index"

export function RelatedPackages({ packages }: { packages: TourPackage[] }) {
  if (packages.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-red-600 mb-3">RELATED PACKAGES</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="text-center">
            <div className="relative h-20 mb-2 rounded overflow-hidden">
              <Image 
                src={pkg.image1} 
                alt={pkg.title} 
                fill 
                className="object-cover" 
              />
            </div>
            <Badge variant="outline" className="text-xs mb-1 px-2 py-0.5">
              {pkg.days} Days & {pkg.nights} Nights
            </Badge>
            <h4 className="font-bold text-red-600 text-xs mb-1">{pkg.title}</h4>
            <p className="text-xs text-gray-600 mb-2">{pkg.price}</p>
            <Link href={`/tours/${pkg.id}`}>
              <Button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 w-full h-7">
                View Details
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}