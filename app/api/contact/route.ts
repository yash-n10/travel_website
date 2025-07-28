import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Prepare the data to match what your external API expects
    const formData = new URLSearchParams()
    
    // Map the new form fields to the expected API parameters
    formData.append('name', `${body.firstName} ${body.lastName}`.trim())
    formData.append('email', body.email)
    formData.append('contact', body.phone || '')
    
    // Combine all trip details into the message field
    const tripDetails = [
      `Preferred Destination: ${body.preferredDestination || 'Not specified'}`,
      `Travel Dates: ${body.departureDate || 'Not specified'} to ${body.returnDate || 'Not specified'}`,
      `Number of Travelers: ${body.numberOfTravelers || 'Not specified'}`,
      `Hotel Category: ${body.hotelCategory || 'Not specified'}`,
      `Travel Interests: ${body.travelInterests || 'None provided'}`,
      `Additional Message: ${body.additionalMessage || 'None provided'}`
    ].join('\n')
    
    formData.append('message', tripDetails)

    // Forward the request to your actual API endpoint
    const response = await fetch('https://ecomlancers.com/travel_website/Api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    })

    const data = await response.text() // Get raw response first
    
    try {
      // Try to parse as JSON
      const jsonData = JSON.parse(data)
      return NextResponse.json(jsonData, { status: response.status })
    } catch {
      // If not JSON, return as text
      return new NextResponse(data, { status: response.status })
    }

  } catch (error) {
    console.error('Error in contact API route:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}