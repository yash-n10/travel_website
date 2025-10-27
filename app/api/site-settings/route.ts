import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://ecomlancers.com/travel_website/Api/site_settings', {
      method: 'POST',
      headers: {
        'Cookie': 'ci_session=9ge1qah1or6liink1ireopifj7an1oae',
      },
      cache: 'no-store',
    })

    const text = await response.text()
    try {
      const json = JSON.parse(text)
      return NextResponse.json(json, { status: response.status })
    } catch {
      return new NextResponse(text, { status: response.status })
    }
  } catch (error) {
    console.error('Error fetching site settings (GET /api/site-settings):', error)
    return NextResponse.json({ message: 'Failed to fetch site settings' }, { status: 500 })
  }
}
