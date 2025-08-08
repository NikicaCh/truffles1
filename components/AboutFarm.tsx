"use client";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export function AboutFarm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const farmFeatures = [
    {
      title: "25+ Years Experience",
      description: "Decades of dedicated breeding experience with Lagotto Romagnolo",
      icon: "📅"
    },
    {
      title: "Health Testing",
      description: "All breeding dogs undergo comprehensive health testing including hips, elbows, and eyes",
      icon: "🩺"
    },
    {
      title: "Early Socialization",
      description: "Puppies are raised in our home with early neurological stimulation and socialization",
      icon: "👶"
    },
    {
      title: "Lifetime Support",
      description: "We provide ongoing support and guidance throughout your dog's lifetime",
      icon: "🤝"
    }
  ];

  return (
    <section id="farm" ref={ref} className="py-20 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-400 to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl mb-6">About Truffles Macedonia</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Located in the beautiful countryside of North Macedonia, our family-owned breeding program is dedicated to 
            preserving the authentic Lagotto Romagnolo breed while producing healthy, well-socialized companions for families worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            className="space-y-6"
            style={{ y: floatingY }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Beautiful countryside farm setting with Lagotto Romagnolo dogs"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl mb-6">Our Commitment to Excellence</h3>
            <div className="space-y-6">
              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                At Truffles Macedonia, we believe that breeding exceptional Lagotto Romagnolo dogs goes beyond genetics. 
                Our dogs live as part of our family, ensuring they develop the stable temperament and social skills that 
                make them perfect companions.
              </motion.p>
              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Each puppy is carefully raised with love, proper nutrition, veterinary care, and early training. 
                We work closely with international breed clubs to maintain the highest standards and preserve the 
                working heritage of this remarkable breed.
              </motion.p>
              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Our breeding program focuses on health, temperament, and conformation, with many of our dogs 
                achieving championship titles and working certifications in truffle hunting.
              </motion.p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {farmFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h4 className="text-lg mb-3">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 bg-muted/50 rounded-lg p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center">
            <motion.h3 
              className="text-2xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              Our Breeding Philosophy
            </motion.h3>
            <motion.p 
              className="text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              "We breed not just for beauty, but for the complete dog - one that embodies the true spirit of the Lagotto Romagnolo. 
              Our dogs are athletes, companions, and working partners. Every puppy that leaves our home carries with them the legacy 
              of their ancestors and the promise of being a cherished family member for years to come."
            </motion.p>
            <motion.p 
              className="mt-4 italic"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              - The Truffles Macedonia Family
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}