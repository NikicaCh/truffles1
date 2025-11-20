"use client";
import { useRef, useEffect, useState, MouseEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Award,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Activity,
  Shield,
  Bone,
  CheckCircle2
} from "lucide-react";
import { motion, useInView } from "motion/react";
import type { Dog, ParentInfo } from "../data/dogs";
import { getourDogs } from "../data/dogs";

interface DogProfileProps {
  dog: Dog;
  onBack?: () => void;
}

export function DogProfile({ dog, onBack }: DogProfileProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();
  const params = useSearchParams();

  // Determine where to send the user back (default to Available)
  const from = params.get("from"); // "available" | "our" | null
  const backHash = from === "our" ? "#our-dogs" : "#puppies";

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

  // -------- Show More state for thumbnails --------
  const [showAllImages, setShowAllImages] = useState(false);

  // Count of photos not fully shown initially (beyond the first visible thumbnail)
  const hiddenCount = Math.max(0, dog.images.length - 2); // we fully show index 0 (main) + index 1 (thumb)

  // Helper to get parent name string
  const getParentName = (parent: ParentInfo | string) => {
    return typeof parent === 'string' ? parent : parent.name;
  };

  const renderParentInfo = (parent: ParentInfo | string) => {
    if (typeof parent === 'string') {
      return <p className="text-muted-foreground">{parent}</p>;
    }
    
    // Check if this parent is one of our dogs
    const ourDogs = getourDogs();
    const parentDog = ourDogs.find(d => 
      d.url && parent.url && d.url === parent.url
    );
    
    return (
      <div className="space-y-2">
        <p className="text-muted-foreground flex items-center gap-2">
          {parentDog ? (
            // If it's our dog, link to their profile page
            <a 
              href={`/dog/${parentDog.id}?from=our`} 
              className="text-primary hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/dog/${parentDog.id}?from=our`);
              }}
            >
              {parent.name}
            </a>
          ) : (
            <span>{parent.name}</span>
          )}
          {parent.url && (
            <a href={parent.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </p>
        {/* Awards only for parents */}
        {parent.awards && parent.awards.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {parent.awards.map((award, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-100">
                <Award className="w-2 h-2 mr-1" /> {award}
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={ref} className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => (onBack ? onBack() : router.push(`/${backHash}`))}
            className="mb-8 hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Dogs
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] gap-8">
          {/* Image Gallery */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Main image (index 0) */}
            <motion.div
              className="relative cursor-zoom-in"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => openImage(0)}
            >
              <ImageWithFallback
                src={dog.images[0]}
                alt={`${dog.name} - Main Photo`}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
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

            {/* Thumbnails */}
            {dog.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {/* Second image (index 1) */}
                {dog.images[1] && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="cursor-zoom-in"
                    onClick={() => openImage(1)}
                  >
                    <ImageWithFallback
                      src={dog.images[1]}
                      alt={`${dog.name} - Photo 2`}
                      className="w-full h-[120px] object-cover rounded-lg shadow-md"
                    />
                  </motion.div>
                )}

                {/* Third image (index 2) */}
                {dog.images[2] && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="cursor-zoom-in"
                    onClick={() => openImage(2)}
                  >
                    <ImageWithFallback
                      src={dog.images[2]}
                      alt={`${dog.name} - Photo 3`}
                      className="w-full h-[120px] object-cover rounded-lg shadow-md"
                    />
                  </motion.div>
                )}

                {/* Fourth image or show more button */}
                {dog.images[3] && (
                  !showAllImages && dog.images[4] ? (
                    <div className="relative h-[120px] rounded-lg overflow-hidden cursor-pointer" onClick={() => openImage(3)}>
                      <ImageWithFallback
                        src={dog.images[3]}
                        alt={`${dog.name} - Hidden preview`}
                        className="w-full h-full object-cover scale-105 filter blur-sm brightness-75"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-medium bg-black/40 hover:bg-black/50 transition-colors">
                        <span className="text-sm">+{dog.images.length - 4}</span>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="cursor-zoom-in"
                      onClick={() => openImage(3)}
                    >
                      <ImageWithFallback
                        src={dog.images[3]}
                        alt={`${dog.name} - Photo 4`}
                        className="w-full h-[120px] object-cover rounded-lg shadow-md"
                      />
                    </motion.div>
                  )
                )}
              </div>
            )}
          </motion.div>

          {/* Dog Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                {dog.url ? (
                  <a
                    href={dog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline gap-2 hover:opacity-80 transition-opacity group"
                  >
                    <h1 className="text-3xl text-foreground group-hover:text-primary">
                      {dog.name}
                    </h1>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  </a>
                ) : (
                  <h1 className="text-3xl text-foreground">
                    {dog.name}
                  </h1>
                )}
                {dog.aka && (
                  <span className="text-base text-muted-foreground">
                    <span className="italic">aka</span> <span className="font-medium text-foreground">{dog.aka}</span>
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">
                {dog.gender} • {dog.color}
              </p>
            </div>

            {/* Info Cards - 2 column grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Age Card with birth date */}
              <Card className="p-3">
                <CardContent className="p-0 flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Age</p>
                    <p className="font-medium text-sm">{dog.age}</p>
                    <p className="text-xs text-muted-foreground">Born: {dog.birthDate}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Other cards */}
              {[
                { icon: Weight, label: "Weight", value: dog.weight },
                { icon: Award, label: "Sire", value: getParentName(dog.parents?.sire) ?? "—" },
                { icon: Heart, label: "Dam", value: getParentName(dog.parents?.dam) ?? "—" },
              ].map((item, index) => (
                <Card key={index} className="p-3">
                  <CardContent className="p-0 flex items-center space-x-2">
                    <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium text-sm truncate" title={item.value}>{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Awards Section - integrated in right column */}
            {dog.awards && dog.awards.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-600" />
                    Awards & Titles
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {dog.awards.map((award, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100 border-yellow-200 text-xs"
                      >
                        {award}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Buttons — only for puppies for sale */}
            {isAvailableDog && (
              <div className="flex flex-col sm:flex-row gap-3">
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
          {dog.description && (
            <Card>
              <CardHeader>
                <CardTitle>About {dog.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {dog.description}
                </p>
              </CardContent>
            </Card>
          )}

          <Card className={!dog.description ? "lg:col-span-2" : ""}>
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Hips</p>
                      <p className="font-medium">{dog.healthInfo.hips}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Bone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Elbows</p>
                      <p className="font-medium">{dog.healthInfo.elbows}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Patella</p>
                      <p className="font-medium">{dog.healthInfo.patella}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Genetic Testing</p>
                      <p className="font-medium">{dog.healthInfo.geneticTesting}</p>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Features & Suitable - Only show if they exist */}
        {(dog.features && dog.features.length > 0) || (dog.suitableFor && dog.suitableFor.length > 0) ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {dog.features && dog.features.length > 0 && (
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
          )}

          {dog.suitableFor && dog.suitableFor.length > 0 && (
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
          )}
        </div>
        ) : null}

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
                  {renderParentInfo(dog.parents.sire)}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dam (Mother)</h4>
                  {renderParentInfo(dog.parents.dam)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* -------- Fullscreen Image Viewer -------- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
        
        className="max-w-5xl w-full p-0 bg-black/90 border-0">
          <div className="relative">
            {/* Close button */}
            {/* <Button
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3 bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={closeImage}
            >
              <X className="h-5 w-5" />
            </Button> */}

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
