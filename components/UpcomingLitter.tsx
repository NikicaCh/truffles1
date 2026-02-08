"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import { UPCOMING_LITTERS } from "@/data/litters";

type UpcomingLitterProps = {
  onContact?: () => void;
};

export function UpcomingLitter({ onContact }: UpcomingLitterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id="upcoming-litter"
      ref={ref}
      className="max-w-5xl mx-auto mb-3"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Card className="relative overflow-hidden border-2 border-yellow-200 bg-gradient-to-br from-yellow-50/60 via-white to-white shadow-lg">
        <div className="h-0.5 w-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500" />
        <CardContent className="p-3 sm:p-4">
          <div className="text-center">
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Badge className="bg-yellow-600 text-white text-[11px] sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 shadow-sm">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                Upcoming Litters
              </Badge>
              <span className="text-[11px] sm:text-sm font-medium text-yellow-700">
                February / March 2026
              </span>
            </motion.div>

            <motion.h2
              className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Planned litters — reserve your puppy
            </motion.h2>

            <motion.ul
              className="text-xs sm:text-sm text-muted-foreground mb-4 flex flex-wrap justify-center gap-x-3 gap-y-0.5 sm:gap-x-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {UPCOMING_LITTERS.map((l) => (
                <li key={l.id} className="list-none">
                  <span className="text-foreground font-medium">{l.mother.name.split(" from ")[0]}</span>
                  <span className="mx-1">×</span>
                  <span className="text-foreground font-medium">{l.father.name.split(" ")[0]}</span>
                  <span className="ml-1">· {l.date}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-6 sm:px-8 shadow-md font-semibold"
              >
                <Link href="/upcoming-litters" className="inline-flex items-center">
                  View upcoming litters
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
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
