"use client";
import { useState, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const galleryImages = [
    { src: "/GALLERY/lagotto-europe-brown-and-white-puppy-run.jpeg", alt: "Brown and white Lagotto Romagnolo puppy running", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-brown-and-white-puppy.jpeg", alt: "Brown and white Lagotto Romagnolo puppy", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-christmas.jpeg", alt: "Brown Lagotto puppy at Christmas", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-cutting-hair.jpeg", alt: "Brown Lagotto puppy getting groomed", category: "Grooming" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-garden.jpeg", alt: "Brown Lagotto puppy in garden", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-grass.jpeg", alt: "Brown Lagotto puppy on grass", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-standing.jpeg", alt: "Brown Lagotto puppy standing portrait", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-white.jpeg", alt: "Brown and white Lagotto puppy", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-with-white-legs.jpeg", alt: "Brown Lagotto puppy with white legs", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-brown-puppy-with-white.jpeg", alt: "Brown Lagotto puppy with white markings", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-brown-puppy.jpeg", alt: "Brown Lagotto Romagnolo puppy", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-dark-brown-forest.jpeg", alt: "Dark brown Lagotto in forest", category: "Nature" },
    { src: "/GALLERY/lagotto-europe-lightbrown-with-trophy.jpeg", alt: "Light brown Lagotto with trophy", category: "Awards" },
    { src: "/GALLERY/lagotto-europe-medal-and-trophy.jpeg", alt: "Championship medal and trophy", category: "Awards" },
    { src: "/GALLERY/lagotto-europe-medal.jpeg", alt: "Dog show championship medal", category: "Awards" },
    { src: "/GALLERY/lagotto-europe-medals.jpeg", alt: "Multiple championship medals", category: "Awards" },
    { src: "/GALLERY/lagotto-europe-mixed-puppies.jpeg", alt: "Mixed color Lagotto puppies", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-mixed-puppies.tree.jpeg", alt: "Lagotto puppies near tree", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-mixed-puppy.jpeg", alt: "Mixed color Lagotto puppy", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-puppies-on-couch.jpeg", alt: "Lagotto puppies relaxing on couch", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-trophy-on-table.jpeg", alt: "Championship trophy on display", category: "Awards" },
    { src: "/GALLERY/lagotto-europe-trophy.jpeg", alt: "Dog show championship trophy", category: "Awards" },
    { src: "/GALLERY/lagotto-europe-two-brown-puppies-and-truffles.jpeg", alt: "Two brown puppies with truffles", category: "Truffles" },
    { src: "/GALLERY/lagotto-europe-white -with-brown-years-puppy.jpeg", alt: "White puppy with brown ears", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-white-and-brown-puppy-forest.jpeg", alt: "White and brown puppy in forest", category: "Nature" },
    { src: "/GALLERY/lagotto-europe-white-competition.jpeg", alt: "White Lagotto at dog show competition", category: "Shows" },
    { src: "/GALLERY/lagotto-europe-white-on-competition.jpeg", alt: "White Lagotto competing at show", category: "Shows" },
    { src: "/GALLERY/lagotto-europe-white-puppy-and-truffles.jpeg", alt: "White puppy with truffle harvest", category: "Truffles" },
    { src: "/GALLERY/lagotto-europe-white-puppy-igor.jpeg", alt: "White puppy Igor", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-white-puppy.jpeg", alt: "White Lagotto Romagnolo puppy", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-white-with-brown-eyes-puppy.jpeg", alt: "White puppy with brown markings around eyes", category: "Puppies" },
    { src: "/GALLERY/lagotto-europe-whitw-with-brown-puppy.jpeg", alt: "White puppy with brown markings", category: "Puppies" },
    { src: "/GALLERY/truffle-europe-one.jpeg", alt: "Fresh truffle harvest", category: "Truffles" },
    { src: "/GALLERY/truffle-europe-with-cheese.jpeg", alt: "Truffles with cheese", category: "Truffles" },
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

  
  
  

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % visibleImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? visibleImages.length - 1 : selectedImage - 1);
    }
  };

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
            <Button onClick={showMore} className="px-6">
              Show more
            </Button>
          )}
          {visibleCount > 9 && (
            <Button variant="outline" onClick={showLess} className="px-6">
              Show less
            </Button>
          )}
        </div>

        {/* Image Modal */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-full p-0">
            {selectedImage !== null && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src={visibleImages[selectedImage].src}
                  alt={visibleImages[selectedImage].alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />

                {/* Navigation Buttons */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </motion.div>

                {/* Close Button */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>

                {/* Image Info */}
                <motion.div
                  className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm">{visibleImages[selectedImage].category}</p>
                  <p className="text-xs opacity-75">
                    {selectedImage + 1} of {visibleImages.length}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
