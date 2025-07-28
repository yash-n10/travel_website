"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4 md:gap-0">
        {/* Logo */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="GoSamyati Logo"
              width={120}
              height={40}
              className="h-10 w-auto ml-0 sm:ml-20"
              style={{ transform: "scale(1.5)" }}
            />
          </Link>
        </div>

        {/* Search & optional actions */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 sm:gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full px-4 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            />
          </div>

          {/* Example Button (uncomment if needed) */}
          {/* <Button variant="outline" className="border-red-300 text-red-600">
            Sign In
          </Button> */}
        </div>
      </div>
    </header>
  )
}
