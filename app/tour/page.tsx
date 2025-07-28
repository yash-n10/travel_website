"use client"

export const dynamic = "force-dynamic";

import { Suspense } from "react"
import TourPageClient from "./tourPageClient";

export default function TourPage() {
  return (
    <Suspense fallback={<div className="p-0 text-center">Loading tour page...</div>}>
      <TourPageClient />
    </Suspense>
  )
}
