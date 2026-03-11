"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import { getNewLitters } from "@/data/litters";

type UpcomingLitterProps = {
  onContact?: () => void;
};

export function UpcomingLitter({ onContact }: UpcomingLitterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const newLitters = getNewLitters();

  return (
    <motion.section
      id="upcoming-litter"
      ref={ref}
      className="max-w-5xl mx-auto mb-3"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Card className="relative overflow-hidden border border-border bg-white shadow-lg">
        <div className="h-px w-full bg-border" />
        <CardContent className="p-3 sm:p-4">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
              <Badge className="bg-yellow-600 text-white text-[11px] sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 shadow-sm">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                New Litters
              </Badge>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
              We are happy to share our newest litters
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              {newLitters.length} litters are now born. You can view each poster and meet both parents before contacting us.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
              <Button asChild size="lg" className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-6 sm:px-8 shadow-md font-semibold">
                <Link href="/new-litters" className="inline-flex items-center">
                  View new litters
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-yellow-600 text-yellow-700 hover:bg-yellow-50"
                onClick={() => {
                  if (onContact) {
                    onContact();
                    return;
                  }
                  const contact = document.getElementById("contact");
                  if (contact) contact.scrollIntoView({ behavior: "smooth" });
                  else window.location.href = "/#contact";
                }}
              >
                Contact us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
