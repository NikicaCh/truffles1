"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { AboutBreed } from "@/components/AboutBreed";
import { AboutFarm } from "@/components/AboutFarm";
import { AvailablePuppies } from "@/components/AvailablePuppies";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { useRouter } from "next/navigation";
import { OurDogs } from "@/components/OurDogs";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentRoute={'home'} onNavigate={() => router.push('/')} />
      <main>
        <Hero />
        <AboutBreed />
        <AboutFarm />
        <AvailablePuppies />
        <OurDogs />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


