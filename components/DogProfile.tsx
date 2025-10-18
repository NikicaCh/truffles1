"use client";
import { useRef, useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowLeft,
  Calendar,
  Weight,
  Heart,
  Shield,
  Award,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import type { Dog } from "../data/dogs";

interface DogProfileProps {
  dog: Dog;
  onBack?: () => void;
}

export function DogProfile({ dog, onBack }: DogProfileProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  // For-sale vs. owned
  const isAvailableDog = dog.status === "Available" || dog.status === "Reserved";
  

  // -------- Image Modal State --------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openImage = (idx: number) => {
    setActiveIndex(idx);
    setIsModalOpen(true);
  };

  const closeImage = () => setIsModalOpen(false);

  const nextImage = () => {
    setActiveIndex((i) => (i + 1) % dog.images.length);
  };

  const prevImage = () => {
    setActiveIndex((i) => (i - 1 + dog.images.length) % dog.images.length);
  };

  // Keyboard controls when modal is open
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  // Scroll to top on dog change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dog.id]);

  const scrollToContact = () => {
    if (onBack) {
      onBack();
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.location.href = "/#contact";
    }
  };

  // Click zones inside modal (left/right half)
  const onModalImageClick = (e: MouseEvent<HTMLDivElement>) => {
    const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - bounds.left;
    if (x < bounds.width / 2) prevImage();
    else nextImage();
  };

  return (
    <div ref={ref} className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Button
            variant="ghost"
            onClick={() => (onBack ? onBack() : router.push("/"))}
            className="mb-8 hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Dogs
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative cursor-zoom-in"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => openImage(0)}
            >
              <ImageWithFallback
                src={dog.images[0]}
                alt={`${dog.name} - Main Photo`}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              {isAvailableDog && (
                <Badge
                  className={`absolute top-4 right-4 ${
                    dog.status === "Available"
                      ? "bg-green-500"
                      : dog.status === "Reserved"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`}
                >
                  {dog.status}
                </Badge>
              )}
            </motion.div>

            {dog.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {dog.images.slice(1).map((image, index) => (
                  <motion.div
                    key={image + index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="cursor-zoom-in"
                    onClick={() => openImage(index + 1)}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${dog.name} - Photo ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Dog Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <motion.h1 className="text-4xl mb-2 text-foreground">{dog.name}</motion.h1>
              <p className="text-xl text-muted-foreground mb-4">
                {dog.gender} • {dog.color}
              </p>

              {/* Price only for available/reserved */}
              {isAvailableDog && <motion.div className="text-2xl text-primary mb-6">{dog.price}</motion.div>}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: "Age", value: dog.age },
                { icon: Weight, label: "Weight", value: dog.weight },
                { icon: Award, label: "Sire", value: dog.parents?.sire ?? "—" },
                { icon: Heart, label: "Dam", value: dog.parents?.dam ?? "—" },
              ].map((item, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="p-0 flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Personality */}
            <div>
              <h3 className="text-lg mb-3">Personality</h3>
              <div className="flex flex-wrap gap-2">
                {dog.personality.map((trait, index) => (
                  <Badge key={index} variant="outline">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Buttons — only for puppies for sale */}
            {isAvailableDog && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1" onClick={scrollToContact}>
                  Inquire About {dog.name}
                </Button>
                <Button variant="outline" size="lg" onClick={scrollToContact}>
                  Schedule Visit
                </Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Description & Health Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>About {dog.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{dog.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Vaccinated", value: dog.healthInfo.vaccinated },
                { label: "Microchipped", value: dog.healthInfo.microchipped },
                { label: "Health Tested", value: dog.healthInfo.healthTested },
                { label: "Health Guarantee", value: dog.healthInfo.healthGuarantee },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <Badge variant={item.value ? "default" : "secondary"}>
                    {item.value ? "✓ Yes" : "Pending"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Features & Suitable */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Features & Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dog.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perfect For</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dog.suitableFor.map((type, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">{type}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Pedigree */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Pedigree Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Sire (Father)</h4>
                  <p className="text-muted-foreground">{dog.parents?.sire}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dam (Mother)</h4>
                  <p className="text-muted-foreground">{dog.parents?.dam}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* -------- Fullscreen Image Viewer -------- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black/90 border-0">
          <div className="relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3 bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={closeImage}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Prev / Next buttons */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Click left/right half to navigate */}
            <div className="relative">
              <div
                className="w-full h-full"
                onClick={onModalImageClick}
                role="button"
                tabIndex={0}
                aria-label="Navigate image"
              >
                <ImageWithFallback
                  src={dog.images[activeIndex]}
                  alt={`${dog.name} - Full Image ${activeIndex + 1}`}
                  className="w-full h-auto max-h-[85vh] object-contain select-none"
                />
              </div>
              <div className="absolute bottom-3 left-3 text-white/90 text-sm bg-black/40 px-2 py-1 rounded">
                {dog.name} — {activeIndex + 1} / {dog.images.length}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
