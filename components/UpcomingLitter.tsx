"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Phone } from "lucide-react";

type UpcomingLitterProps = {
  onContact?: () => void;
};

export function UpcomingLitter({ onContact }: UpcomingLitterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleContactClick = () => {
    if (onContact) {
      onContact();
      return;
    }

    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.href = "/#contact";
  };

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
        <CardContent className="p-3 sm:p-5">
          <div className="text-center">
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Badge className="bg-yellow-600 text-white text-[11px] sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming Litter
              </Badge>
              <span className="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-[11px] sm:text-sm font-medium text-yellow-700">
                February 15th, 2026
              </span>
            </motion.div>

            <motion.h2
              className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1.5 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              New Puppies Coming
            </motion.h2>

            <motion.p
              className="hidden sm:block text-sm sm:text-base text-muted-foreground mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              From our exceptional champion bloodlines
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-2 border-t border-yellow-200"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                className="p-2.5 sm:p-4 text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260 }}
              >
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                  Mother
                </p>
                <Link
                  href="/dog/lara-from-truffles-macedonia"
                  className="text-[13px] sm:text-base md:text-lg font-semibold text-foreground hover:text-yellow-600 transition-colors duration-200"
                >
                  Lara from Truffles Macedonia
                </Link>
              </motion.div>

              <motion.div
                className="p-2.5 sm:p-4 text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260 }}
              >
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                  Father
                </p>
                <Link
                  href="/dog/igor-del-casale-brioso"
                  className="text-[13px] sm:text-base md:text-lg font-semibold text-foreground hover:text-yellow-600 transition-colors duration-200"
                >
                  Igor del Casale Brioso
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-3 pt-2 border-t border-yellow-200"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className="hidden sm:block text-sm text-muted-foreground mb-2">
                Ready to reserve or ask questions about this litter?
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  size="lg"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 sm:px-8"
                  onClick={handleContactClick}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
