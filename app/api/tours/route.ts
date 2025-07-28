import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters or use defaults
    const limit = searchParams.get('limit') || '8';
    const category = searchParams.get('category') || 'International';
    
    // Create URLSearchParams for the external API
    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit);
    queryParams.append('category', category);
    
    // Add any additional parameters
    searchParams.forEach((value, key) => {
      if (key !== 'limit' && key !== 'category') {
        queryParams.append(key, value);
      }
    });

    const apiUrl = `https://ecomlancers.com/travel_website/Api/tours?${queryParams.toString()}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}