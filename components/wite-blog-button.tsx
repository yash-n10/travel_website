// components/write-blog-button.tsx
"use client"

import Link from "next/link"
import { PenSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WriteBlogButton() {
  return (
    <Link href="/blog/write" passHref>
      <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white">
        <PenSquare className="w-4 h-4" />
        Write Blog
      </Button>
    </Link>
  )
}