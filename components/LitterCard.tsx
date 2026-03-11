"use client";

import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Heart, Phone, ArrowRight } from "lucide-react";
import { FlagBadge } from "./FlagBadge";
import type { Litter } from "@/data/litters";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/navigation";

interface LitterCardProps {
  litter: Litter;
  index?: number;
}

export function LitterCard({ litter, index = 0 }: LitterCardProps) {
  const router = useRouter();

  const openLitterPage = () => {
    router.push(`/new-litters/${litter.slug}`);
  };

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
      <Card
        className="h-full overflow-hidden border border-border bg-white shadow-md rounded-xl cursor-pointer transition-shadow hover:shadow-lg"
        role="link"
        tabIndex={0}
        onClick={openLitterPage}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openLitterPage();
        }}
      >
        <div className="relative h-56 w-full overflow-hidden bg-muted/30">
          <ImageWithFallback
            src={litter.posterImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px] opacity-40"
            style={{ objectPosition: litter.posterObjectPosition ?? "center" }}
          />
          <ImageWithFallback
            src={litter.posterImage}
            alt={`${litter.title} poster`}
            className="absolute inset-0 w-full h-full object-contain p-2"
            style={{ objectPosition: "center" }}
          />
        </div>
        <div className="h-px w-full bg-border" />
        <CardContent className="p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide">
            <Calendar className="h-4 w-4" />
            <span>{litter.dateLabel}</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">Mother</p>
              <div className="flex items-center gap-1.5">
                <FlagBadge flag={litter.mother.flag} />
                <Link
                  href={`/dog/${litter.mother.dogId}`}
                  className="text-sm sm:text-base font-semibold text-foreground hover:text-yellow-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  {litter.mother.name}
                </Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">Father</p>
              <div className="flex items-center gap-1.5">
                <FlagBadge flag={litter.father.flag} />
                <Link
                  href={`/dog/${litter.father.dogId}`}
                  className="text-sm sm:text-base font-semibold text-foreground hover:text-yellow-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  {litter.father.name}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground pt-1 border-t border-border">
            <Heart className="h-4 w-4 shrink-0" />
            <span>{litter.healthInfo}</span>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={(e) => {
                e.stopPropagation();
                openLitterPage();
              }}
            >
              Litter page
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              size="sm"
              className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleContact();
              }}
            >
              <Phone className="h-4 w-4 mr-2" />
              Inquire
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
