"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ChevronLeft, ChevronRight, MapPin, Phone, Star, Award, Heart, Shield } from "lucide-react";
//import dog1 from "/public/all/dog1.jpeg";
//import dog1 from "../public/dog1.jpeg";


export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const carouselOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // SEO-optimized hero images showcasing the breed
  const heroImages = [
    {
      src: "/dog1.jpeg",
      // alt: "Champion Lagotto Romagnolo dog in natural outdoor setting",
      // title: "Champion Bloodline Lagotto Romagnolo",
      // caption: "Our breeding dogs showcase perfect conformation and temperament"
    },
    {
      src: "/dog4.jpeg",
      alt: "Healthy Lagotto Romagnolo puppy playing in countryside",
      // title: "Healthy, Socialized Puppies",
      // caption: "Our puppies are raised with love and expert care"
    },
    {
      src: "/dog3.jpeg",
      alt: "Champion Lagotto Romagnolo dog in natural outdoor setting",
      // title: "Champion Bloodline Lagotto Romagnolo",
      // caption: "Our breeding dogs showcase perfect conformation and temperament"
    },
    {
      src: "/Dog10.55.jpeg",
      alt: "Healthy Lagotto Romagnolo puppy playing in countryside",
      // title: "Healthy, Socialized Puppies",
      // caption: "Our puppies are raised with love and expert care"
    },


  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-advance images for better engagement
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <article id="home" ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-yellow-50/50 via-white to-orange-50/50 pt-20">
      {/* Structured Data - JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PetStore",
            "name": "Truffles Macedonia",
            "description": "Premium Lagotto Romagnolo in Macedonia specializing in champion bloodlines and truffle hunting dogs",
            "url": "https://trufflesmacedonia.com",
            "telephone": "+389-XX-XXX-XXX",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Macedonia",
              "addressLocality": "Macedonia"
            },
            "sameAs": [
              "https://www.facebook.com/trufflesmacedonia",
              "https://www.instagram.com/trufflesmacedonia"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Lagotto Romagnolo Puppies",
              "itemListElement": [{
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Lagotto Romagnolo Puppy",
                  "description": "Healthy, champion bloodline Lagotto Romagnolo puppies"
                }
              }]
            }
          })
        }}
      />

      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-40 left-20 w-32 h-32 bg-yellow-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-orange-300/8 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-200/8 rounded-full blur-xl" />
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 sm:py-8 lg:py-16">
          
          {/* SEO-Optimized Header Content */}
          <motion.header 
            className="text-center mb-12"
            style={{ opacity: headerOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
            className="hidden md:block text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-yellow-600">Truffles Macedonia</span>
              <span className="text-yellow-600"> - Premium Lagotto Romagnolo</span>
              </motion.h1>


            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Truffles Macedonia is a registered FCI kennel with over a decade of experience working with Lagotto Romagnolo dogs. Ranked among the most awarded kennels in Macedonia and beyond, we are recognized as one of Europe’s leading Lagotto Romagnolo breeders.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Badge variant="outline" className="text-sm px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                Macedonia, Europe
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                10+ Years Experience
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Champion Bloodlines
              </Badge>
            </motion.div>
          </motion.header>

          {/* Main Image Carousel */}
          <motion.section 
            className="max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ opacity: carouselOpacity }}
            aria-label="Lagotto Romagnolo Photo Gallery"
          >
            <Card className="overflow-hidden shadow-xl bg-white border border-gray-200">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  
                  {/* Main Image */}
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    className="relative w-full h-full"
                  >
                    <ImageWithFallback
                      src={heroImages[currentImageIndex].src}
                      alt={heroImages[currentImageIndex].alt}
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                    
                    {/* Image Overlay with Title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <motion.div 
                      className="absolute bottom-6 left-6 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {/* <h2 className="text-xl md:text-2xl mb-2">{heroImages[currentImageIndex].title}</h2> */}
                      {/* <p className="text-sm md:text-base opacity-90 max-w-md">{heroImages[currentImageIndex].caption}</p> */}
                    </motion.div>
                  </motion.div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* SEO-Rich Content Below Images */}
                <motion.div 
                  className="p-8 bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl text-foreground mb-6">
                    Our dogs have achieved Champion, Interchampion, and International Champion titles — a testament to their world-class quality and breeding excellence.                    </h2>
                    {/* <p className="text-muted-foreground mb-6 leading-relaxed">
                      The Lagotto Romagnolo is the only dog breed specifically bred for truffle hunting. Originating from the wetlands of Italy, these intelligent, loyal, and hypoallergenic dogs have been perfecting their skills for centuries. At Truffles Macedonia, we preserve this ancient heritage while producing modern family companions that excel both in the field and at home.
                    </p>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      Our champion bloodlines trace back to the finest Italian kennels, ensuring genetic diversity, health, and authentic breed characteristics. Each puppy is health tested, microchipped, and comes with comprehensive health guarantees and pedigree documentation.
                    </p> */}
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-8"
                        onClick={() => scrollToSection('puppies')}
                      >
                        View Available Puppies
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-yellow-600 text-yellow-700 hover:bg-yellow-50 px-8"
                        onClick={() => scrollToSection('breed')}
                      >
                        Learn About Lagotto Romagnolo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Key Features - Enhanced for SEO */}
          <motion.section 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            aria-label="Why Choose Truffles Macedonia"
          >
            <motion.h2 
              className="text-2xl md:text-3xl text-center text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Why Choose Truffles Macedonia for Your Lagotto Romagnolo
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Award, 
                  title: "Champion Bloodlines & Proven Excellence", 
                  desc: "Multi-Champion, Interchampion, and International Champion titles across Europe and beyond — including World Championship placements",
                  keywords: "confirming top genetics, structure, and temperament."
                },
                { 
                  icon: Shield, 
                  title: "Natural Environment & Ethical Breeding", 
                  desc: "Dogs raised cage-free in a 1,000 m² forest area at 850 m altitude, enjoying natural light, fresh air, and social interaction for balanced behavior and optimal development.",
                  // keywords: "health tested, health guarantee, veterinary care"
                },
                { 
                  icon: Heart, 
                  title: "Health Tested & Lifetime Support", 
                  desc: "Comprehensive health screening including hip/elbow X-rays, DNA testing for hereditary diseases, and ongoing veterinary care",
                  keywords: "backed by a 2-year health guarantee and lifelong breeder guidance"
                }
              ].map((feature, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 bg-white border-2 border-gray-100 h-full">
                    <CardContent className="p-0">
                      <motion.div 
                        className="relative mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                          <feature.icon className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                      <h3 className="text-xl text-foreground mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">{feature.desc}</p>
                      <div className="text-xs text-muted-foreground/60 italic">
                        {feature.keywords}
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="text-center mt-20 py-16 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
            aria-label="Truffles Macedonia Statistics and Achievements"
          >
            <motion.h3 
              className="text-xl text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.9 }}
            >
              Trusted by Families Worldwide
            </motion.h3>
            <motion.p 
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2 }}
            >
              Over a dedicated breeding excellence has made us one of Europe's most respected Lagotto Romagnolo breeders
            </motion.p>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { 
                  number: "10+", 
                  label: "Years Breeding Excellence", 
                  desc: "Established 1015",
                  schema: "foundingDate"
                },
                { 
                  number: "150+", 
                  label: "Happy Families Served", 
                  desc: "Worldwide Customers",
                  schema: "numberOfCustomers"
                },
                { 
                  number: "50+", 
                  label: "Champion Offspring", 
                  desc: "Show & Working Titles",
                  schema: "awards"
                }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 2.1 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl md:text-4xl text-yellow-600 mb-2">{stat.number}</div>
                  <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call-to-Action Section */}
          <motion.section 
            className="text-center mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <Card className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-0">
                <h3 className="text-2xl text-foreground mb-4">
                  Ready to Welcome a Lagotto Romagnolo Into Your Family?
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Join the growing community of Lagotto Romagnolo enthusiasts worldwide. Contact us today to learn about our current litters, upcoming breeding plans, and find your perfect truffle hunting companion.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-8"
                    onClick={() => scrollToSection('contact')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Us Today
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-yellow-600 text-yellow-700 hover:bg-yellow-50 px-8"
                    onClick={() => scrollToSection('puppies')}
                  >
                    View Available Puppies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>

      {/* Subtle Floating Animation Elements */}
      <motion.div 
        className="absolute top-1/3 right-12 w-4 h-4 bg-yellow-400/20 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-12 w-3 h-3 bg-orange-300/20 rounded-full"
        animate={{
          y: [0, 10, 0],
          x: [0, 5, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </article>
  );
}