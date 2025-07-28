// utils/api.ts
import { TourPackage, Testimonial } from "@/types";

// Simple in-memory cache (consider using a more robust solution for production)
const responseCache = new Map<string, Promise<any>>();

export async function fetchTourPackages(params: string | Record<string, any> = {}): Promise<TourPackage[]> {
  const cacheKey = typeof params === 'string' 
    ? `tour-${params}`
    : `tour-${JSON.stringify(params)}`;

  try {
    const queryString = typeof params === 'string' 
      ? `id=${params}`
      : new URLSearchParams(params).toString();
    
    const url = `/api/tours?${queryString}`;
    console.log('Fetching from URL:', url); // Debug log

    const fetchPromise = fetch(url, {
      next: { 
        tags: ['tours'],
        revalidate: 3600
      },
      cache: 'force-cache'
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : null;
      })
      .then(responseData => {
        console.log('Parsed response:', responseData); // Debug log
        
        // Handle array response
        if (Array.isArray(responseData)) {
          return responseData.map(processTourPackage);
        }
        // Handle object with data array
        if (responseData?.data) {
          return Array.isArray(responseData.data) 
            ? responseData.data.map(processTourPackage)
            : [];
        }
        // Handle single object response
        if (responseData && typeof responseData === 'object') {
          return [processTourPackage(responseData)];
        }
        // Fallback for unexpected formats
        console.warn('Unexpected API response format:', responseData);
        return [];
      })
      .catch(error => {
        console.error('Error fetching tour packages:', error);
        return []; // Return empty array as fallback
      });

    responseCache.set(cacheKey, fetchPromise);
    return await fetchPromise;
  } catch (error) {
    console.error('Error in fetchTourPackages:', error);
    return [];
  }
}

// Helper function to process individual tour package
function processTourPackage(item: any): TourPackage {
  
  return {
    id: ensureNumber(item.id, 0),
    slug: ensureString(item.slug, 'untitled-tour'),
    title: ensureString(item.title, 'Untitled Tour'),
    description: ensureString(item.description, 'No description available'),
    days: ensureString(item.days, '0'),
    nights: ensureString(item.nights, '0'),
    price: formatPrice(item.price),
    basic_info: ensureString(item.basic_info, 'No basic info available'),
    image1: processMainImageUrl(item.image1),
    image2: processOptionalImageUrl(item.image2),
    image3: processOptionalImageUrl(item.image3),
    image4: processOptionalImageUrl(item.image4),
    image5: processOptionalImageUrl(item.image5),
    category: ensureString(item.category, 'Other'),
    country: optionalString(item.country),
    destination: optionalString(item.destination),
    highlights: processHighlights(item.highlights),
    rating: clampNumber(ensureNumber(item.rating, 4.0), 0, 5),
    review: ensureNumber(item.review, 0),
    groupSize: ensureNumber(item.groupSize, 1),
    itinerary: item.iternary ? item.iternary.map((day: any) => ({
      day: ensureString(day.day, 'DAY 1'),
      title: ensureString(day.location, 'Untitled Day'),
      content: ensureString(day.iternary_detail, 'No details available')
    })) : []
  };
}

// Updated fetchTestimonials with caching
export async function fetchTestimonials(params = {}): Promise<Testimonial[]> {
  const cacheKey = `testimonials-${JSON.stringify(params)}`;
  
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }

  try {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const url = `https://ecomlancers.com/travel_website/Api/testimonials${query ? `?${query}` : ""}`;

    const fetchPromise = fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
      cache: 'force-cache'
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        return response.json();
      })
      .then(data => Array.isArray(data) ? data : data?.data || [])
      .catch(error => {
        console.error("Error fetching testimonials:", error);
        return [];
      });

    responseCache.set(cacheKey, fetchPromise);
    return await fetchPromise;
  } catch (error) {
    console.error("Error in fetchTestimonials:", error);
    return [];
  }
}

// Helper functions remain the same
function processMainImageUrl(imageUrl: unknown): string {
  if (!imageUrl) return '/images/default-tour.jpg';
  const urlString = String(imageUrl);
  return urlString.startsWith('http') 
    ? urlString
    : `https://ecomlancers.com/travel_website/uploads/${encodeURIComponent(urlString)}`;
}

function processOptionalImageUrl(imageUrl: unknown): string | undefined {
  if (!imageUrl) return undefined;
  const urlString = String(imageUrl);
  return urlString.startsWith('http') 
    ? urlString
    : `https://ecomlancers.com/travel_website/uploads/${encodeURIComponent(urlString)}`;
}

function ensureNumber(value: unknown, defaultValue: number): number {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}

function ensureString(value: unknown, defaultValue: string): string {
  return value !== undefined && value !== null 
    ? String(value) 
    : defaultValue;
}

function optionalString(value: unknown): string | undefined {
  return value !== undefined && value !== null 
    ? String(value) 
    : undefined;
}

function formatPrice(price: unknown): string {
  if (!price) return 'Price on request';
  // const numericValue = String(price).replace(/[^0-9.]/g, '');
  const numericValue=Number(price).toLocaleString('en-IN');
  // return `₹${numericValue}`;
  // const numericValue2=price.toLocaleString('en-IN', {style: 'currency',currency: 'INR',});
  return `INR ${numericValue}`;
}

function processHighlights(highlights: unknown): string[] {
  if (!Array.isArray(highlights)) {
    return ['Experience local culture'];
  }
  return highlights
    .filter(item => item !== undefined && item !== null)
    .map(String);
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}