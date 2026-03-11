import type { Metadata } from "next";
import { UpcomingLittersNav } from "@/components/UpcomingLittersNav";
import { Footer } from "@/components/Footer";
import { UpcomingLittersPage } from "@/components/UpcomingLittersPage";

const canonical = "https://lagottomacedonia.com/new-litters";
const title = "New Litters | Truffles Macedonia";
const description = "Our newest litters are born. View each litter poster, meet the mother and father, and contact us for updates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Truffles Macedonia – New Litters" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function NewLittersRoute() {
  return (
    <div className="min-h-screen bg-background">
      <UpcomingLittersNav />
      <main className="flex flex-col pt-20">
        <article className="bg-gradient-to-br from-yellow-50/50 via-white to-orange-50/50">
          <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">New Litters</h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Our latest puppies are here - see each litter poster and both parents.
            </p>
          </header>
          <UpcomingLittersPage />
        </article>
      </main>
      <Footer />
    </div>
  );
}
