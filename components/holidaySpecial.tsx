import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

interface HolidayBannerProps {
  className?: string;
  images?: string[];
}

const HolidayBanner: React.FC<HolidayBannerProps> = ({
  className,
  images = [
    "/images/image_box2.jpeg",
    "/images/image_box1.jpeg",
    "/images/image_box3.jpeg",
    "/images/image_box4.jpeg",
  ],
}) => {
  return (
    <section className="pt-10 pb-4 sm:pt-14 sm:pb-4 bg-white w-[90vw] mx-auto">
      <div className={`bg-white pt-8 max-w-8xl mx-auto overflow-hidden ${className}`}>
        <div className="flex flex-col md:flex-row">
          {/* Image Slider */}
          <div className="w-full md:w-1/2 overflow-hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop
              className="h-full"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Holiday ${index + 1}`}
                    className="w-full h-52 sm:h-64 md:h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 px-4 sm:px-8 py-6 flex flex-col justify-center text-center md:text-left">
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                Book a holiday, specially
                <br />
                curated for you !!!
              </h1>

              <div className="border-t border-black w-20 mx-auto md:mx-0"></div>

              <p className="text-gray-600 text-sm sm:text-base">
                Discover handpicked destinations, personalized experiences, and stress-free
                planning—all tailored to your taste. Whether you crave adventure, relaxation, or
                cultural exploration, your dream getaway starts here. Let us craft the perfect
                escape, just for you!
              </p>

              <div className="flex justify-center md:justify-start">
                <Link
                  href="/contact"
                  className="bg-[#FF0000] text-white px-8 sm:px-12 py-2 sm:py-3 rounded-[20px] hover:bg-red-600 transition-colors text-sm font-semibold tracking-wider uppercase"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolidayBanner;
