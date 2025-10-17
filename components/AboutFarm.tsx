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
      title: "Experience & Excellence",
      description: "Over a decade of dedicated breeding with award-winning Lagotto Romagnolos. Recognized among Europe’s leading and most decorated FCI kennels" ,
      icon: "🏆"
    },
    {
      title: "Health Testing",
      description: "All breeding dogs are fully DNA-tested and have certified hip and elbow X-rays. Ensuring sound genetics and freedom from hereditary diseases All breeding dogs undergo comprehensive health testing including hips, elbows, and eyes",
      icon: "🧬"
    },
    {
      title: "Natural Living & Socialization",
      description: "Our dogs live freely in a 1,000 m² forest environment at 850 m altitude. Each puppy is carefully socialized, trained, and raised with personal attention",
      icon: "🌲"
    },
    {
      title: "Lifetime Support",
      description: "We provide lifelong guidance to every owner — from nutrition and training to health care. Truffles Macedonia believes in lasting partnerships and transparent communication",
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
          Our dogs and puppies do not live in cages or boxes but freely in a 1,000-square-meter forest area with individual rooms for rest and comfort.          </p>
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
              src="/dog7.jpeg"
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
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Located at 850 meters above sea level, our mountain setting ensures a peaceful, healthy environment that promotes natural development and excellent physical condition.          
            </p>
          
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
<Card className="p-6 text-center hover:shadow-lg transition-shadow h-full flex flex-col justify-between">
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