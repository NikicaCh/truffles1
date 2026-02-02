"use client";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export function AboutBreed() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const breedTraits = [
    {
      title: "Intelligence",
      description: "Highly intelligent and trainable with excellent problem-solving abilities",
      // icon: "🧠"
    },
    {
      title: "Hypoallergenic",
      description: "Non-shedding, curly coat perfect for families with allergies",
      // icon: "🌟"
    },
    {
      title: "Active & Energetic",
      description: "Loves outdoor activities, swimming, and mental stimulation",
      // icon: "⚡"
    },
    {
      title: "Family Friendly",
      description: "Gentle with children and excellent family companions",
      // icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "Natural Hunters",
      description: "Born truffle hunters with exceptional scenting abilities",
      // icon: "🔍"
    },
    {
      title: "Loyal & Devoted",
      description: "Forms strong bonds with their family and are naturally protective",
      // icon: "💝"
    }
  ];

  return (
    <section id="breed" ref={ref} className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Parallax Elements */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        style={{ y: backgroundY }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl"
        style={{ y: floatingY }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl mb-6">About the Lagotto Romagnolo</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          The Lagotto Romagnolo is an intelligent, affectionate, and versatile breed known for its exceptional truffle-hunting ability.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          At Truffles Macedonia, we’ve dedicated over ten years to preserving the breed’s finest traits — health, character, and instinct.          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl mb-6">    Breed Characteristics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {breedTraits.map((trait, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-3">
                        <motion.span 
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {/* {trait.icon} */}
                        </motion.span>
                        <div>
                          <h4 className="mb-1">{trait.title}</h4>
                          <p className="text-sm text-muted-foreground">{trait.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: floatingY }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ImageWithFallback
              src="/GALLERY/lagotto-romagnolo-laying-down.webp"
                 alt="Lagotto Romagnolo puppy standing by the window showing curly coat and alert posture"
                className="w-full h-80 object-cover rounded-lg shadow-lg mt-40"

              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { title: "Size", subtitle: "Medium-sized breed", details: ["Males: 43–48 cm", "Females: 41–46 cm" , "Weight: 11–16 kg"] },
            { title: "Lifespan", subtitle: "Healthy & Long-lived", details: ["Typically 14–17 years" , "Often exceeds 15 years with proper care"] },
            { title: "Exercise Needs", subtitle: "Moderate to High", details: ["Requires 45–60 minutes of daily exercise" ,
" Enjoys scent work, training, and mental challenges"] }
          ].map((item, index) => (



            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 text-center">
                  <h4 className="text-xl mb-3">{item.title}</h4>
                  <p className="text-muted-foreground">{item.subtitle}</p>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-sm">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}