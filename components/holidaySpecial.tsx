import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

interface HolidayBannerProps {
  className?: string;
  images?: string[]; // Array of image URLs for the slider
}

const HolidayBanner: React.FC<HolidayBannerProps> = ({ 
  className,
  images = [
    "/images/london.jpeg",
    "/images/peris.jpeg",
    "/images/dubai.jpeg",
  ] 
}) => {
  return (
    <div className={`bg-white max-w-6xl mx-auto overflow-hidden ${className}`}>
      <div className="flex flex-col md:flex-row">
        {/* Image Slider - Left Side */}
        <div className="w-full md:w-1/2 br-4 md:br-none overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop={true}
            className="h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={img} 
                  alt={`Holiday ${index + 1}`}
                  className="w-full h-64 md:h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Text Content - Right Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold uppercase tracking-tight">
              BOOK A HOLIDAY, SPECIALLY
            </h1>
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-6">
              CURATED FOR YOU !!!
            </h1>
            
            <div className="border-t border-black w-full mx-auto my-6"></div>
            
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </p>

            <div className=" mx-auto my-6 rounded-[10px]">
            <Link href="/contact" className="bg-[#FF0000] text-white px-12 py-3 uppercase tracking-wider rounded-[20px] hover:bg-red-600 transition-colors uppercase text-sm font-semibold">
              Enquire Now
            </Link >
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayBanner;