// app/api/tours/[id]/route.ts
import { NextResponse } from 'next/server'
import { fetchTourPackages } from '@/utils/api'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const packages = await fetchTourPackages({ id: params.id })
    if (!packages || packages.length === 0) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }
    return NextResponse.json(packages[0])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tour' },
      { status: 500 }
    )
  }
}