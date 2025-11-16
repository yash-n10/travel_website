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
      content: [
     
        "30% of total amount will be paid ten days before the trip.",
        "For few hotels and during peak period, we may request to pay the full amount at the time of booking.",
        "Booking policy is subject to change depending upon the travel period and destinations opted for (Peak period like Diwali Holiday and year end, etc)."
      ]
    },
    {
      id: "payment",
      title: "REFUND POLICY",
      content: ["Refund turnaround time to customer's bank account within 10-15 working days from the date of cancellation confirmation."]
    },
    {
      id: "cancellation",
      title: "CANCELLATION POLICY",
      content: [
        "Cancellations made 30 days before the date of departure will incur a cancellation fee equivalent to 10% of the total tour cost.", 
        "Cancellations made before 15 days the date of departure will incur a cancellation fee equivalent to 50% of the total tour cost.",
        "Cancellations made before 14 days to departure date will incur a cancellation fee equivalent to 100% of the total tour cost. ","Flight Ticket cancellation will follow the airlines company policy.",
        "Cancellation Policies may vary based on any specific cancellation charges as charged by the third-party service provider.",
        "Cancellation default policy will not be applicable on Holiday and Peak season (Diwali, Pooja holiday, New year/X-mas, Few long weekends" 

      ]
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
            {Array.isArray(policy.content) ? (
              <ul className="list-disc pl-5 text-gray-600 space-y-1 marker:text-red-600">
                {policy.content.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 marker:text-red-600">{policy.content}</p>
            )}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}