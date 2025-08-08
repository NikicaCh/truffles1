"use client";
import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Calendar, Users, Eye } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { availableDogs, getAvailableDogs } from "../data/dogs";

export function AvailablePuppies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const availableDogsData = getAvailableDogs();
  const reservedDogs = availableDogs.filter(dog => dog.status === 'Reserved');

  const upcomingLitters = [
    {
      season: "Fall 2024",
      parents: "Champion Aria x Champion Maximus",
      expectedDate: "September 2024",
      expectedCount: "4-6 puppies"
    },
    {
      season: "Winter 2024",
      parents: "Champion Bella x Champion Dante",
      expectedDate: "December 2024",
      expectedCount: "5-7 puppies"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="puppies" ref={ref} className="py-20 bg-muted/30 relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl mb-6">Available Puppies</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our carefully planned litters combine the best genetics, health testing, and early socialization to 
            produce exceptional Lagotto Romagnolo puppies ready for their forever homes.
          </p>
        </motion.div>

        {/* Available Dogs */}
        {availableDogsData.length > 0 && (
          <div className="mb-16">
            <motion.h3 
              className="text-2xl text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Available Now
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableDogsData.map((dog, index) => (
                <motion.div
                  key={dog.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <ImageWithFallback
                        src={dog.images[0]}
                        alt={`${dog.name} - ${dog.gender} Lagotto Romagnolo`}
                        className="w-full h-64 object-cover"
                      />
                      <Badge 
                        className="absolute top-4 right-4 bg-green-500"
                      >
                        Available
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <span className="text-xl">{dog.name}</span>
                          <p className="text-sm text-muted-foreground font-normal">
                            {dog.gender} • {dog.age}
                          </p>
                        </div>
                        <span className="text-lg text-primary">{dog.price}</span>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{dog.birthDate}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Color: {dog.color}</p>
                        <p className="text-sm text-muted-foreground">Weight: {dog.weight}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm mb-2">Personality:</p>
                        <div className="flex flex-wrap gap-1">
                          {dog.personality.slice(0, 3).map((trait, traitIndex) => (
                            <Badge key={traitIndex} variant="outline" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                          {dog.personality.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{dog.personality.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Link href={`/dog/${dog.id}`}>
                          <Button className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Profile
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={scrollToContact}
                        >
                          Inquire About {dog.name}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Reserved Dogs */}
        {reservedDogs.length > 0 && (
          <div className="mb-16">
            <motion.h3 
              className="text-2xl text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Recently Reserved
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reservedDogs.map((dog, index) => (
                <motion.div
                  key={dog.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 opacity-75">
                    <div className="relative">
                      <ImageWithFallback
                        src={dog.images[0]}
                        alt={`${dog.name} - Reserved`}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-blue-500">
                        Reserved
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <span className="text-xl">{dog.name}</span>
                          <p className="text-sm text-muted-foreground font-normal">
                            {dog.gender} • {dog.age}
                          </p>
                        </div>
                        <span className="text-lg text-muted-foreground">{dog.price}</span>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        This {dog.gender.toLowerCase()} has found a loving home! 
                        View profile to see what makes our dogs special.
                      </p>
                      
                      <Link href={`/dog/${dog.id}`}>
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Litters */}
        <div>
          <motion.h3 
            className="text-2xl text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Upcoming Litters
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingLitters.map((litter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="text-center">
                      <h4 className="text-lg mb-2">{litter.season}</h4>
                      <p className="text-muted-foreground mb-1">{litter.parents}</p>
                      <p className="text-sm text-muted-foreground mb-2">{litter.expectedDate}</p>
                      <p className="text-sm">{litter.expectedCount}</p>
                      <Button variant="outline" size="sm" className="mt-4" onClick={scrollToContact}>
                        Reserve Your Spot
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Puppy Information */}
        <motion.div 
          className="mt-16 bg-background rounded-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h3 className="text-2xl text-center mb-6">What's Included with Your Puppy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📋", title: "Health Records", desc: "Complete vaccination records and health certificate" },
              { icon: "🧬", title: "Health Guarantee", desc: "2-year genetic health guarantee" },
              { icon: "🎓", title: "Training Started", desc: "Basic commands and house training foundation" },
              { icon: "📞", title: "Lifetime Support", desc: "Ongoing breeder support and advice" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}