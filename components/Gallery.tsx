"use client";
import { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const modalIconButtonClass =
    "h-10 w-10 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border border-white/10 shadow-lg";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const galleryImages = [
    { src: "/GALLERY/lagotto-europe-brown-and-white-puppy-run.jpeg", alt: "Brown and white Lagotto Romagnolo puppy running", category: "Zoomies" },
    { src: "/GALLERY/lagotto-europe-brown-and-white-puppy.jpeg", alt: "Brown and white Lagotto Romagnolo puppy", category: "Puppy Portrait" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-christmas.jpeg", alt: "Brown Lagotto puppy at Christmas", category: "Holiday Mood" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-cutting-hair.jpeg", alt: "Brown Lagotto puppy getting groomed", category: "Grooming Day" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-grass.jpeg", alt: "Brown Lagotto puppy on grass", category: "Grass Time" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-standing.jpeg", alt: "Brown Lagotto puppy standing portrait", category: "Show Stance" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-white.jpeg", alt: "Brown and white Lagotto puppy", category: "Puppy Portrait" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-with-white-legs.jpeg", alt: "Brown Lagotto puppy with white legs", category: "Little Details" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-with-white.jpeg", alt: "Brown Lagotto puppy with white markings", category: "Puppy Portrait" },
    { src: "/GALLERY/lagotto-europe-brown-puppy.jpeg", alt: "Brown Lagotto Romagnolo puppy", category: "Puppy Portrait" },
    { src: "/GALLERY/lagotto-europe-dark-brown-forest.jpeg", alt: "Dark brown Lagotto in forest", category: "Outdoors" },
    { src: "/GALLERY/lagotto-europe-lightbrown-with-trophy.jpeg", alt: "Light brown Lagotto with trophy", category: "Titles & Trophies" },
    { src: "/GALLERY/lagotto-europe-medal-and-trophy.jpeg", alt: "Championship medal and trophy", category: "Titles & Trophies" },
    { src: "/GALLERY/lagotto-europe-medal.jpeg", alt: "Dog show championship medal", category: "Titles & Trophies" },
    { src: "/GALLERY/lagotto-europe-medals.jpeg", alt: "Multiple championship medals", category: "Titles & Trophies" },
    { src: "/GALLERY/lagotto-europe-mixed-puppies.jpeg", alt: "Mixed color Lagotto puppies", category: "The Squad" },
    { src: "/GALLERY/lagotto-europe-mixed-puppies.tree.jpeg", alt: "Lagotto puppies near tree", category: "Tiny Explorers" },
    { src: "/GALLERY/lagotto-europe-mixed-puppy.jpeg", alt: "Mixed color Lagotto puppy", category: "Puppy Portrait" },
    { src: "/GALLERY/lagotto-europe-trophy-on-table.jpeg", alt: "Championship trophy on display", category: "Titles & Trophies" },
    { src: "/GALLERY/man-feeding-dogs-lagotto-romagnolo.webp", alt: "Man feeding dogs", category: "Snack Time" },
    { src: "/GALLERY/lagotto-romagnolo-high-jump.webp", alt: "Lagotto romagnolo high jump", category: "Air Time" },
    
    { src: "/GALLERY/lagotto-white.webp", alt: "White Lagotto Romagnolo", category: "White Coat" },
    { src: "/GALLERY/lagotto-romagnolo-jump.webp", alt: "Lagotto romagnolo jump", category: "Air Time" },
    { src: "/GALLERY/white-lagotto-romagnolo.webp", alt: "White Lagotto Romagnolo", category: "White Coat" },
    { src: "/GALLERY/man-with-dogs-lagotto-romagnolo.webp", alt: "Man with dogs", category: "Family Time" },




    { src: "/GALLERY/lagotto-europe-trophy.jpeg", alt: "Dog show championship trophy", category: "Titles & Trophies" },
    { src: "/GALLERY/lagotto-europe-two-brown-puppies-and-truffles.jpeg", alt: "Two brown puppies with truffles", category: "Truffle Work" },
    { src: "/GALLERY/lagotto-europe-white -with-brown-years-puppy.jpeg", alt: "White puppy with brown ears", category: "Puppy Portrait" },
    { src: "/GALLERY/lagotto-europe-white-and-brown-puppy-forest.jpeg", alt: "White and brown puppy in forest", category: "Outdoors" },
    { src: "/GALLERY/lagotto-europe-white-on-competition.jpeg", alt: "White Lagotto competing at show", category: "In the Ring" },
    { src: "/GALLERY/lagotto-europe-white-puppy-and-truffles.jpeg", alt: "White puppy with truffle harvest", category: "Truffle Work" },
    { src: "/GALLERY/lagotto-europe-white-puppy-igor.jpeg", alt: "White puppy Igor", category: "Meet Igor" },
    { src: "/GALLERY/lagotto-europe-white-puppy.jpeg", alt: "White Lagotto Romagnolo puppy", category: "Puppy Portrait" },
    { src: "/GALLERY/lagotto-europe-white-with-brown-eyes-puppy.jpeg", alt: "White puppy with brown markings around eyes", category: "Puppy Portrait" },
    { src: "/GALLERY/lagotto-europe-whitw-with-brown-puppy.jpeg", alt: "White puppy with brown markings", category: "Puppy Portrait" },
    { src: "/GALLERY/truffle-europe-one.jpeg", alt: "Fresh truffle harvest", category: "Truffle Work" },
    { src: "/GALLERY/truffle-europe-with-cheese.jpeg", alt: "Truffles with cheese", category: "Truffle Work" },
  ];

  const visibleImages = galleryImages.slice(0, visibleCount);
  const hasMore = visibleCount < galleryImages.length;

  const showMore = () => setVisibleCount((c) => Math.min(c + 9, galleryImages.length));


const showLess = () => {
  setVisibleCount(9);

  // After the DOM re-renders with 9 images, position the last one ~mid-screen
  const scrollWhenReady = () => {
    const images = document.querySelectorAll<HTMLImageElement>("#gallery img");
    if (images.length >= 9) {
      const lastVisibleImage = images[8]; // 9th image
      const rect = lastVisibleImage.getBoundingClientRect();

      // Place the bottom of the 9th image at ~55% of the viewport height
      // so the next section ("Happy Families") peeks in below it.
      const target =
        window.scrollY + rect.bottom - window.innerHeight * 0.55;

      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      // Try again on the next frame until images are rendered
      requestAnimationFrame(scrollWhenReady);
    }
  };

  requestAnimationFrame(scrollWhenReady);
};

  
  
  

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % visibleImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? visibleImages.length - 1 : selectedImage - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedImage(selectedImage === 0 ? visibleImages.length - 1 : selectedImage - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedImage((selectedImage + 1) % visibleImages.length);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, visibleImages.length]);

  return (
    <section id="gallery" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        style={{ y: backgroundY }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl mb-6">Our Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A glimpse into the life of our Lagotto family — training, shows, daily adventures, and unforgettable moments at Truffles Macedonia.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {visibleImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedImage(index)}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.06 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                rotateY: 5,
                transition: { type: "spring", stiffness: 400 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <ImageWithFallback src={image.src} alt={image.alt} className="w-full h-64 object-cover" />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="text-sm bg-black/50 px-3 py-1 rounded">{image.category}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More / Less Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {hasMore && (
            <Button variant="outline" size="lg" onClick={showMore} className="px-6">
              Show more
            </Button>
          )}
          {visibleCount > 9 && (
            <Button variant="outline" size="lg" onClick={showLess} className="px-6">
              Show less
            </Button>
          )}
        </div>

        {/* Image Modal */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent
            fullScreen
            showCloseButton={false}
            overlayClassName="bg-black/50 backdrop-blur-xl"
            className="bg-transparent border-0 shadow-none"
            onClick={(e) => {
              // When fullscreen, Radix "outside click" won't fire. Treat clicks on the empty backdrop as close.
              if (e.target === e.currentTarget) setSelectedImage(null);
            }}
          >
            {selectedImage !== null && (
              <div
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <ImageWithFallback
                  src={visibleImages[selectedImage].src}
                  alt={visibleImages[selectedImage].alt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 z-50",
                    modalIconButtonClass,
                  )}
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 z-50",
                    modalIconButtonClass,
                  )}
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("absolute top-4 right-4 z-50", modalIconButtonClass)}
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </Button>

                {/* Image Info */}
                <div className="absolute bottom-4 left-4 z-50 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                  <p className="text-sm font-medium">{visibleImages[selectedImage].category}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {selectedImage + 1} of {visibleImages.length}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
