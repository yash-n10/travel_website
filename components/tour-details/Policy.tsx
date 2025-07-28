"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function PolicyAccordion() {
  const [openPolicy, setOpenPolicy] = useState<string | null>(null)

  const policies = [
    {
      id: "confirmation",
      title: "CONFIRMATION POLICY",
      content: "Your booking will be confirmed within 24 hours of receiving payment. A confirmation email with all details will be sent to you."
    },
    {
      id: "payment",
      title: "PAYMENT POLICY",
      content: "A 30% deposit is required at the time of booking. The remaining balance must be paid 30 days before departure."
    },
    {
      id: "cancellation",
      title: "CANCELLATION POLICY",
      content: "Cancellations made 60+ days before departure: full refund. 30-60 days: 50% refund. Less than 30 days: no refund."
    }
  ]

  return (
    <div className="space-y-3">
      {policies.map((policy) => (
        <Collapsible
          key={policy.id}
          open={openPolicy === policy.id}
          onOpenChange={(open) => setOpenPolicy(open ? policy.id : null)}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-semibold text-red-600">{policy.title}</h3>
            {openPolicy === policy.id ? (
              <ChevronUp className="w-4 h-4 text-red-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-red-600" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 bg-white border-t text-sm">
            <p className="text-gray-600">{policy.content}</p>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}