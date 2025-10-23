import { NextRequest, NextResponse } from 'next/server'

// GET -> Fetch vacancies (external endpoint requires POST)
export async function GET() {
  try {
    const response = await fetch('https://ecomlancers.com/travel_website/Api/vacancy', {
      method: 'POST',
      headers: {
        'Cookie': 'ci_session=pmfhnu0ab2kknenskeol32v501f8ca96',
      },
      cache: 'no-store',
    })

    const text = await response.text()
    console.log("text", text)
    try {
      const json = JSON.parse(text)
      return NextResponse.json(json, { status: response.status })
    } catch {
      return new NextResponse(text, { status: response.status })
    }
  } catch (error) {
    console.error('Error fetching vacancies (GET /api/hiring):', error)
    return NextResponse.json({ message: 'Failed to fetch vacancies' }, { status: 500 })
  }
}

// POST -> Submit job application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({} as any))

    const form = new URLSearchParams()
    if (body.name) form.append('name', String(body.name))
    if (body.email) form.append('email', String(body.email))
    if (body.contact || body.phone) form.append('contact', String(body.contact || body.phone))
    if (body.position || body.position_id || body.job_id) form.append('position', String(body.position || body.position_id || body.job_id))
    if (body.message) form.append('message', String(body.message))

    const response = await fetch('https://ecomlancers.com/travel_website/Api/job_application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
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
    console.error('Error forwarding job application (POST /api/hiring):', error)
    return NextResponse.json({ message: 'Failed to submit application' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
