// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { slugify } from '@/utils/slugify'
import { fetchTourPackages } from './utils/api'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Match /tour/123 but not /tour/123/slug-here
  if (pathname.match(/^\/tour\/[^/]+$/)) {
    const tourId = pathname.split('/')[2]
    
    try {
      // Try fetching from API first
      const apiResponse = await fetch(`${request.nextUrl.origin}/api/tours/${tourId}`)
      
      if (apiResponse.ok) {
        const tour = await apiResponse.json()
        if (tour?.title) {
          const slug = slugify(tour.title)
          return NextResponse.redirect(new URL(`/tour/${tourId}/${slug}`, request.url))
        }
      }
      
      // Fallback to direct database fetch if API fails
      const packages = await fetchTourPackages({ id: tourId })
      if (packages?.length > 0) {
        const slug = slugify(packages[0].title)
        return NextResponse.redirect(new URL(`/tour/${tourId}/${slug}`, request.url))
      }
      
      // If no tour found, redirect to tours listing
      return NextResponse.redirect(new URL('/tours', request.url))
      
    } catch (error) {
      console.error('Middleware tour fetch error:', error)
      // Continue to next middleware if error occurs
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}