"use client";

import { LittersGrid } from "./LittersGrid";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { UPCOMING_LITTERS } from "@/data/litters";

export function UpcomingLittersPage() {
  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/#contact";
  };

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <h2 className="sr-only">Planned litters</h2>
        <LittersGrid litters={UPCOMING_LITTERS} />
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <p className="text-muted-foreground mb-4">
          Ready to reserve or ask questions about a litter?
        </p>
        <Button
          size="lg"
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 sm:px-8"
          onClick={scrollToContact}
        >
          <Phone className="h-4 w-4 mr-2" />
          Contact Us
        </Button>
      </section>
    </>
  );
}
