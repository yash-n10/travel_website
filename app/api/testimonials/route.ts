import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://ecomlancers.com/travel_website/Api/testimonials", {
      // Optionally pass headers here
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
