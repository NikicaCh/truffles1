"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { AboutBreed } from "@/components/AboutBreed";
import { AboutFarm } from "@/components/AboutFarm";
import { Gallery } from "@/components/Gallery";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { useRouter } from "next/navigation";
import { OurDogs } from "@/components/OurDogs";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentRoute={'home'} onNavigate={() => router.push('/')} />
      <main className="flex flex-col">
        <div className="order-1">
          <Hero />
        </div>

        {/* Mobile: show Our Dogs right after Hero. Desktop: keep original order. */}
        <div className="order-2 md:order-5">
          <OurDogs />
        </div>

        <div className="order-3 md:order-2">
          <AboutBreed />
        </div>
        <div className="order-4 md:order-3">
          <AboutFarm />
        </div>
        <div className="order-6">
          <Gallery />
        </div>
        <div className="order-7">
          <Awards />
        </div>
        <div className="order-8">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}


