"use client";

import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Heart, Phone } from "lucide-react";
import { FlagBadge } from "./FlagBadge";
import type { Litter } from "@/data/litters";
import { motion } from "motion/react";

interface LitterCardProps {
  litter: Litter;
  index?: number;
}

export function LitterCard({ litter, index = 0 }: LitterCardProps) {
  const handleContact = () => {
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/#contact";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden border-2 border-yellow-200/80 bg-gradient-to-br from-yellow-50/50 via-white to-white shadow-md rounded-xl">
        <div className="h-0.5 w-full bg-gradient-to-r from-yellow-500/60 via-amber-400/60 to-yellow-500/60" />
        <CardContent className="p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide">
            <Calendar className="h-4 w-4" />
            <span>{litter.date}</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">
                Mother
              </p>
              <div className="flex items-center gap-1.5">
                <FlagBadge flag={litter.mother.flag} />
                {litter.mother.dogId ? (
                  <Link
                    href={`/dog/${litter.mother.dogId}`}
                    className="text-sm sm:text-base font-semibold text-foreground hover:text-yellow-600 transition-colors"
                  >
                    {litter.mother.name}
                  </Link>
                ) : (
                  <span className="text-sm sm:text-base font-semibold text-foreground">
                    {litter.mother.name}
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">
                Father
              </p>
              <div className="flex items-center gap-1.5">
                <FlagBadge flag={litter.father.flag} />
                {litter.father.dogId ? (
                  <Link
                    href={`/dog/${litter.father.dogId}`}
                    className="text-sm sm:text-base font-semibold text-foreground hover:text-yellow-600 transition-colors"
                  >
                    {litter.father.name}
                  </Link>
                ) : (
                  <span className="text-sm sm:text-base font-semibold text-foreground">
                    {litter.father.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground pt-1 border-t border-yellow-200/60">
            <Heart className="h-4 w-4 shrink-0" />
            <span>{litter.healthInfo}</span>
          </div>

          <Button
            size="sm"
            className="mt-auto w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white"
            onClick={handleContact}
          >
            <Phone className="h-4 w-4 mr-2" />
            Inquire
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
