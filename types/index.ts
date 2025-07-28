export type TourPackage = {
  description: string;
  slug: string;
  id: number;
  title: string;
  days: string;
  nights: string;
  price: string;
  basic_info: string;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  category: string;
  country?: string;
  destination?: string;
  highlights: string[];
  rating: number;
  review: number;
  groupSize: number;
  itinerary: ItineraryDay[];
  duration?: string;
   // Keeping basic_info as optional since it was in original
};

export type ItineraryDay = {
  content: string;
  day: string;
  title: string;
};

export type Testimonial = {
  id: number;
  title: string;
  testimonial: string;
  name: string;
  location: string;
  text: string;
  rating?: number;
  image?: string;
};

export type HeroSlide = {
  image: string;
  categories: {
    name: string;
    image: string;
  }[];
};