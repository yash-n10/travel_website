"use client";

import {
  Bed, Binoculars, Bus, UtensilsCrossed, UserRoundSearch, BadgeCheck, ShieldCheck,
  ReceiptText, Activity, LifeBuoy, Plane, Shirt, HandCoins, CupSoda, ShoppingBag,
  Puzzle, Ticket, Stethoscope, Clock, PlaneTakeoff, Train, Wallet, StarHalf,
  ShieldQuestion, Sandwich
} from "lucide-react";

const icons: Record<string, JSX.Element> = {
  hotel: <Bed className="w-5 h-5 text-white" />,
  sightseeing: <Binoculars className="w-5 h-5 text-white" />,
  transport: <Bus className="w-5 h-5 text-white" />,
  meals: <UtensilsCrossed className="w-5 h-5 text-white" />,
  guide: <UserRoundSearch className="w-5 h-5 text-white" />,
  permits: <BadgeCheck className="w-5 h-5 text-white" />,
  insurance: <ShieldCheck className="w-5 h-5 text-white" />,
  taxes: <ReceiptText className="w-5 h-5 text-white" />,
  activities: <Activity className="w-5 h-5 text-white" />,
  support: <LifeBuoy className="w-5 h-5 text-white" />,
  airfare: <Plane className="w-5 h-5 text-white" />,
  laundry: <Shirt className="w-5 h-5 text-white" />,
  tips: <HandCoins className="w-5 h-5 text-white" />,
  beverage: <CupSoda className="w-5 h-5 text-white" />,
  shopping: <ShoppingBag className="w-5 h-5 text-white" />,
  add_on: <Puzzle className="w-5 h-5 text-white" />,
  entry_fees: <Ticket className="w-5 h-5 text-white" />,
  medical: <Stethoscope className="w-5 h-5 text-white" />,
  delays: <Clock className="w-5 h-5 text-white" />,
  air: <PlaneTakeoff className="w-5 h-5 text-white" />,
  train: <Train className="w-5 h-5 text-white" />,
  personal_expense: <Wallet className="w-5 h-5 text-white" />,
  optional_activity: <StarHalf className="w-5 h-5 text-white" />,
  travel_insurance: <ShieldQuestion className="w-5 h-5 text-white" />,
  lunches: <Sandwich className="w-5 h-5 text-white" />,
};

export function InclusionExclusion({
  inclusion = [],
  exclusion = [],
}: {
  inclusion: string[];
  exclusion: string[];
}) {
  console.log(`Inclusion: ${JSON.stringify(inclusion)}`);
  console.log(`Exclusion: ${JSON.stringify(exclusion)}`);
  return (
    <div className="mb-6">
      {/* Inclusion Section */}
      <h3 className="text-lg font-bold text-red-600 mb-3">INCLUSION</h3>
      <div className="flex flex-wrap gap-16 justify-start mb-6">
        {inclusion.map((item, index) =>
          icons[item] ? (
            <div key={`inclusion-${index}`} className="text-center w-28">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                {icons[item]}
              </div>
              <span className="text-xs text-red-600 font-medium">{item.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
            </div>
          ) : null
        )}
      </div>

      <hr className="border-t-2 border-red-600 mb-6" />

      {/* Exclusion Section */}
      <h3 className="text-lg font-bold text-red-600 mb-3">EXCLUSION</h3>
      <div className="flex flex-wrap gap-16 justify-start">
        {exclusion.map((item, index) =>
          icons[item] ? (
            <div key={`exclusion-${index}`} className="text-center w-28">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                {icons[item]}
              </div>
              <span className="text-xs text-red-600 font-medium">{item.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
