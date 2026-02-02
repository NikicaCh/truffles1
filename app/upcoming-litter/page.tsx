import type { Metadata } from "next";
import { UpcomingLitter } from "@/components/UpcomingLitter";

export const metadata: Metadata = {
  title: "Upcoming Litter - Truffles Macedonia",
  description:
    "Upcoming Lagotto Romagnolo litter from Truffles Macedonia. New puppies expected February 15th, 2026.",
  alternates: { canonical: "https://lagottomacedonia.com/upcoming-litter" },
  openGraph: {
    title: "Upcoming Litter - Truffles Macedonia",
    description:
      "Upcoming Lagotto Romagnolo litter from Truffles Macedonia. New puppies expected February 15th, 2026.",
    url: "https://lagottomacedonia.com/upcoming-litter",
  },
};

export default function UpcomingLitterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50/50 via-white to-orange-50/50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UpcomingLitter />
      </div>
    </main>
  );
}
