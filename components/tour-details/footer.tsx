"use client"

import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-red-600 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">ABOUT GOSAMYATI</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/about-us" className="hover:underline">
                  About US
                </Link>
              </li>
              <li>We are Hiring</li>
              <li>Gosamyati Review</li>
              <li>Terms and Conditions</li>
              <li>Privacy Policies</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">TRAVEL DESTINATION</h3>
            <div className="grid grid-cols-2 gap-1">
              <div className="relative h-12">
                <Image src="/images/portlouis.jpeg" alt="Port Louis" fill className="rounded object-cover" />
              </div>
              <div className="relative h-12">
                <Image
                  src="/images/mauritius-beach.jpeg"
                  alt="Mauritius Beach"
                  fill
                  className="rounded object-cover"
                />
              </div>
              <div className="relative h-12">
                <Image src="/images/mount-everest.webp" alt="Mount Everest" fill className="rounded object-cover" />
              </div>
              <div className="relative h-12">
                <Image src="/images/heritage-hotel.webp" alt="Heritage Hotel" fill className="rounded object-cover" />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1">Call Us</h4>
              <p className="text-xs">+91 9940882200</p>
            </div>
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1">Email Us</h4>
              <p className="text-xs">holiday@gosam.com</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Follow Us</h4>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
                <div className="w-4 h-4 bg-white bg-opacity-20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}