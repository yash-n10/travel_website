"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Linkedin,
  MessageCircle ,
} from "lucide-react"
import { FaWhatsapp ,FaGoogle } from "react-icons/fa";
import { SiGoogle } from "react-icons/si"; 
export function Footer() {
  return (
    <div className="relative mt-20">
      {/* Red background container */}
      <div className="bg-[#FF0000] h-[80%] sm:h-[80%] absolute bottom-0 w-full"></div>

      {/* Main content container */}
      <div className="bg-[#F7F7F7] text-black py-8 sm:py-10 rounded-lg px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-48  mx-[5%] relative z-10 bottom-[10vh] sm:bottom-[8vh] md:bottom-[5vh]">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20">
          {/* ABOUT GOSAMYATI */}
          <div className="space-y-4">
            <h3 className="text-lg xl:text-xl font-bold mb-3 sm:mb-4">ABOUT GOSAMYATI</h3>
            <ul className="space-y-2 text-sm xl:text-base">
              <li><Link href="/about-us" className="hover:underline block py-1">About Us</Link></li>
              <li><Link href="#" className="hover:underline block py-1">We are Hiring</Link></li>
              <li><Link href="#" className="hover:underline block py-1">Gosamyati Review</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:underline block py-1">Terms and Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:underline block py-1">Privacy Policies</Link></li>
              <li><Link href="#" className="hover:underline block py-1">Support</Link></li>
            </ul>
          </div>

          {/* TRAVEL DESTINATIONS */}
          <div>
          <h3 className="text-lg xl:text-xl font-bold text-left mb-4">
            TRAVEL DESTINATION
          </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { src: "/images/Australia.jpeg", alt: "Australia" },
                { src: "/images/dubai.jpeg", alt: "Dubai" },
                { src: "/images/mauritius-beach.jpeg", alt: "Mauritius" },
                { src: "/images/hongKong.jpeg", alt: "Hong Kong" },
              ].map((img, idx) => (
                <div key={idx} className="relative h-20 sm:h-24 lg:h-28 xl:h-32 aspect-square w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="rounded-xl object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm xl:text-base">
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-1">Call Us</h4>
            <p className="break-all">+91 9540882200</p>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-1">Email Us</h4>
            <p className="break-all">info@gosamyati.com</p>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-1">Follow Us</h4>
            <div className="flex justify-center sm:justify-start space-x-4 mt-1">
              <a href="https://www.linkedin.com/company/105933434/admin/dashboard/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 xl:w-6 xl:h-6 text-red-600 hover:text-red-800 cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/gosamyatiexpeditions/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 xl:w-6 xl:h-6 text-red-600 hover:text-red-800 cursor-pointer" />
              </a>
              <a href="https://wa.me/+919354571654" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="w-5 h-5 xl:w-6 xl:h-6 text-red-600 hover:text-red-800 cursor-pointer" />
              </a>
               <a href="https://share.google/T6mnJFHnguRR1VBGE" target="_blank" rel="noopener noreferrer">
                  <FaGoogle className="w-5 h-6 xl:w-6 xl:h-6 text-red-600 hover:text-red-800 cursor-pointer" />
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
