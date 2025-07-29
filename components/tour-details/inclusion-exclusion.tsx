"use client"

import {
  Bed, // hotel
  Binoculars, // sightseeing
  Bus, // transport
  UtensilsCrossed, // meals
  UserRoundSearch, // guide
  BadgeCheck, // permits
  ShieldCheck, // insurance
  ReceiptText, // taxes
  Activity, // activities
  LifeBuoy, // support
  Plane, // airfare
  Shirt, // laundry
  HandCoins, // tips
  CupSoda, // beverage
  ShoppingBag, // shopping
  Puzzle, // add_on
  Ticket, // entry_fees
  Stethoscope, // medical
  PlaneTakeoff, // air
  Train, // train
  Wallet, // personal_expense
  StarHalf, // optional_activity
  ShieldQuestion, // travel_insurance
  Sandwich, // lunches
  MapPin,
  Car,
  Utensils,
  Clock
} from "lucide-react";

export function InclusionExclusion() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-red-600 mb-3">INCLUSION</h3>
      <div className="flex flex-wrap gap-8 justify-start mb-6 flex justify-center">
        {[
          { icon: <Bed className="w-5 h-5 text-white" />, label: "Hotel" },
          { icon: <Binoculars className="w-5 h-5 text-white" />, label: "Sightseeing" },
          { icon: <Bus className="w-5 h-5 text-white" />, label: "Transport" },
          { icon: <UtensilsCrossed className="w-5 h-5 text-white" />, label: "Meals" },
          { icon: <UserRoundSearch className="w-5 h-5 text-white" />, label: "Guide" },
          { icon: <BadgeCheck className="w-5 h-5 text-white" />, label: "Permits" },
          { icon: <ShieldCheck className="w-5 h-5 text-white" />, label: "Insurance" },
          { icon: <ReceiptText className="w-5 h-5 text-white" />, label: "Taxes" },
          { icon: <Activity className="w-5 h-5 text-white" />, label: "Activities" },
          { icon: <LifeBuoy className="w-5 h-5 text-white" />, label: "Support" },
          { icon: <Plane className="w-5 h-5 text-white" />, label: "Airfare" },
          { icon: <Shirt className="w-5 h-5 text-white" />, label: "Laundry" },
          { icon: <HandCoins className="w-5 h-5 text-white" />, label: "Tips" },
          { icon: <CupSoda className="w-5 h-5 text-white" />, label: "Beverage" },
          { icon: <ShoppingBag className="w-5 h-5 text-white" />, label: "Shopping" },
          { icon: <Puzzle className="w-5 h-5 text-white" />, label: "Add On" },
          { icon: <Ticket className="w-5 h-5 text-white" />, label: "Entry Fees" },
          { icon: <Stethoscope className="w-5 h-5 text-white" />, label: "Medical" },
          { icon: <Clock className="w-5 h-5 text-white" />, label: "Delays" },
          { icon: <PlaneTakeoff className="w-5 h-5 text-white" />, label: "Air" },
          { icon: <Train className="w-5 h-5 text-white" />, label: "Train" },
          { icon: <Wallet className="w-5 h-5 text-white" />, label: "Personal Expense" },
          { icon: <StarHalf className="w-5 h-5 text-white" />, label: "Optional Activity" },
          { icon: <ShieldQuestion className="w-5 h-5 text-white" />, label: "Travel Insurance" },
          { icon: <Sandwich className="w-5 h-5 text-white" />, label: "Lunches" },
        ].map((item, index) => (
          <div key={`inclusion-${index}`} className="text-center">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
              {item.icon}
            </div>
            <span className="text-xs text-red-600 font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      <hr className="border-t-2 border-red-600 mb-6" />

      <h3 className="text-lg font-bold text-red-600 mb-3">EXCLUSION</h3>
      <div className="flex flex-wrap gap-40 justify-start flex justify-center">
        {[
          { icon: <Bed className="w-5 h-5 text-white" />, label: "Hotel" },
          { icon: <MapPin className="w-5 h-5 text-white" />, label: "Sightseeing" },
          { icon: <Car className="w-5 h-5 text-white" />, label: "Transport" },
          { icon: <Utensils className="w-5 h-5 text-white" />, label: "Meals" }
        ].map((item, index) => (
          <div key={`exclusion-${index}`} className="text-center">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
              {item.icon}
            </div>
            <span className="text-xs text-red-600 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
