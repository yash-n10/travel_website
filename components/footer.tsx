"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Linkedin,
} from "lucide-react"

export function Footer() {
  return (
    <div className="relative mt-20"> {/* Added top margin to prevent content overlap */}
      {/* Red background container - now responsive height */}
      <div className="bg-[#FF0000] h-[30vh] sm:h-[45vh] absolute bottom-0 w-full"></div>
      
      {/* Main content container - responsive width and positioning */}
      <div className="bg-[#F7F7F7] text-black py-8 sm:py-10 rounded-lg px-6 sm:px-8 md:px-12 lg:px-20 w-[90vw] sm:w-[85vw] md:w-[80vw] mx-auto relative z-10 bottom-[10vh] sm:bottom-[8vh] md:bottom-[5vh]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ABOUT GOSAMYATI - adjusted margins for mobile */}
            <div className="space-y-4 ">
              <h3 className="text-lg font-bold mb-3 sm:mb-4">ABOUT GOSAMYATI</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about-us" className="hover:underline block py-1">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline block py-1">
                    We are Hiring
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline block py-1">
                    Gosamyati Review
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="hover:underline block py-1">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:underline block py-1">
                    Privacy Policies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline block py-1">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* TRAVEL DESTINATION IMAGES - adjusted for mobile */}
            <div>
              <h3 className="text-lg font-bold mb-4 md:ml-4 lg:ml-10">TRAVEL DESTINATION</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-2">
                {[
                  { src: "/images/Australia.jpeg", alt: "Australia" },
                  { src: "/images/dubai.jpeg", alt: "Dubai" },
                  { src: "/images/mauritius-beach.jpeg", alt: "Mauritius" },
                  { src: "/images/hongKong.jpeg", alt: "Hong Kong" },
                ].map((img, idx) => (
                  <div key={idx} className="relative h-20 sm:h-24 aspect-square w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="rounded-xl object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACT INFO - improved mobile layout */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-1">Call Us</h4>
              <p className="break-all">+91 9540882200</p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-1">Email Us</h4>
              <p className="break-all">holiday@gosam.com</p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-1">Follow Us</h4>
              <div className="flex justify-center sm:justify-start space-x-4 mt-1">
                <Facebook className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer" />
                <Instagram className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer" />
                <Linkedin className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer" />
                <Youtube className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer" />
                <Mail className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer" />
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}