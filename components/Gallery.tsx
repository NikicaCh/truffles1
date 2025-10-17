"use client";
import { useState, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Beautiful Lagotto Romagnolo running in nature",
      category: "Activities"
    },
    {
      src: "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Lagotto Romagnolo portrait showing curly coat",
      category: "Adults"
    },
    {
      src: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Lagotto Romagnolo puppy with characteristic curls",
      category: "Puppies"
    },
    {
      src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Multiple Lagotto Romagnolo dogs in countryside",
      category: "Farm Life"
    },
    {
      src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Adorable Lagotto Romagnolo puppy portrait",
      category: "Puppies"
    },
    {
      src: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Lagotto Romagnolo in natural farm setting",
      category: "Farm Life"
    },
    {
      src: "https://images.unsplash.com/photo-1588269845464-96a4daa06a65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Brown Lagotto Romagnolo adult dog",
      category: "Adults"
    },
    {
      src: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Lagotto Romagnolo puppy playing outdoors",
      category: "Puppies"
    },
    {
      src: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Lagotto Romagnolo mother with puppies",
      category: "Family"
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" ref={ref} className="py-20 relative overflow-hidden">
      {/* Parallax Background Elements */}
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
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedImage(index)}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
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
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Navigation Buttons */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
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
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
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
                  <p className="text-sm">{galleryImages[selectedImage].category}</p>
                  <p className="text-xs opacity-75">
                    {selectedImage + 1} of {galleryImages.length}
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