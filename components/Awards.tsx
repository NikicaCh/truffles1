"use client";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Award, Trophy, Star, Shield } from "lucide-react";

export function Awards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const awards = [
    {
      title: "FCI Kennel Recognition",
      description: "Recognized among Europe's leading and most decorated FCI kennels for breeding excellence",
      year: "2015",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      image: undefined // Add image path here: "/awards/fci-recognition.jpg"
    },
    {
      title: "Champion Bloodlines",
      description: "Multiple Best in Show winners and European championship titles across our breeding program",
      year: "Ongoing",
      icon: Award,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      image: undefined // Add image path here: "/awards/champion-trophy.jpg"
    },
    {
      title: "Health Excellence Certification",
      description: "All breeding dogs certified with optimal hip and elbow scores, ensuring genetic soundness",
      year: "2014",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      image: undefined // Add image path here: "/awards/health-cert.jpg"
    },
    {
      title: "Breeding Excellence Award",
      description: "Recognized for preserving authentic Lagotto Romagnolo traits and working abilities",
      year: "2017",
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      image: undefined // Add image path here: "/awards/breeding-award.jpg"
    },
    {
      title: "International Export License",
      description: "Authorized to export puppies worldwide with full health certifications and documentation",
      year: "2016",
      icon: Shield,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      image: undefined // Add image path here: "/awards/export-license.jpg"
    },
    {
      title: "DNA Testing Excellence",
      description: "All breeding dogs fully DNA-tested for hereditary diseases, ensuring genetic health",
      year: "2015",
      icon: Star,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      image: undefined // Add image path here: "/awards/dna-testing.jpg"
    }
  ];

  return (
    <section id="awards" ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-gray-50 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute top-10 right-20 w-36 h-36 bg-yellow-400/5 rounded-full blur-3xl"
        style={{ y: backgroundY }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 left-20 w-28 h-28 bg-primary/5 rounded-full blur-2xl"
        style={{ y: floatingY }}
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Trophy className="h-8 w-8 text-yellow-600" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl mb-6">Awards & Recognition</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our commitment to breeding excellence has been recognized by international organizations and dog shows across Europe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => {
            const IconComponent = award.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -5,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full border-2">
                  <CardContent className="p-0">
                    {/* Trophy/Certificate Image */}
                    {award.image ? (
                      <motion.div
                        className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <ImageWithFallback
                          src={award.image}
                          alt={`${award.title} - Award Trophy`}
                          className="w-full h-full object-contain p-4"
                        />
                      </motion.div>
                    ) : (
                      <motion.div 
                        className={`flex items-center justify-center w-full h-32 ${award.bgColor} mb-0`}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <IconComponent className={`h-12 w-12 ${award.color}`} />
                      </motion.div>
                    )}
                    
                    <motion.div
                      className="p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      {/* Icon badge - only show if image is present */}
                      {award.image && (
                        <motion.div 
                          className={`inline-flex items-center justify-center w-10 h-10 ${award.bgColor} rounded-lg mb-4`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <IconComponent className={`h-5 w-5 ${award.color}`} />
                        </motion.div>
                      )}
                      
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground pr-2">
                          {award.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {award.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs font-medium text-primary">
                          {award.year}
                        </span>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="bg-background rounded-lg p-8 max-w-4xl mx-auto border-2 border-gray-100"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl mb-4">Our Commitment to Excellence</h3>
            <p className="text-muted-foreground leading-relaxed">
              These awards reflect our dedication to breeding healthy, well-tempered Lagotto Romagnolos that honor the breed's 
              heritage. We continue to pursue excellence in every aspect of our breeding program, from genetic health testing 
              to socialization and lifelong support for our puppies and their families.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

