// OurDogs.tsx
"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Eye } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { getourDogs } from "../data/dogs";

export function OurDogs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const ourDogsData = getourDogs();

  const router = useRouter();
  const openDog = (id: string) => router.push(`/dog/${id}?from=our`);

  return (
    <section id="our-dogs" ref={ref} className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Parallax */}
      <motion.div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" style={{ y: backgroundY }} />
      <motion.div className="absolute bottom-20 left-10 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl" style={{ y: floatingY }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl mb-6">Our Dogs</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            All our dogs hold Champion, Interchampion, and International Champion titles, confirming their top quality and breeding potential.
            Our female Kali from Truffles Macedonia achieved remarkable international success — third place at the World Championship in Geneva,
            winner of the Grand Prix of Geneva, the Swiss Championship, and Trial Champion title.
          </p>
        </motion.div>

        {ourDogsData.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ourDogsData.map((dog, index) => (
                <motion.div
                  key={dog.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    role="link"
                    tabIndex={0}
                    onClick={() => openDog(dog.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openDog(dog.id);
                    }}
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={dog.images[0]}
                        alt={`${dog.name} - ${dog.gender} Lagotto Romagnolo`}
                        className="w-full h-64 object-cover"
                      />
                    </div>

                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <span className="text-xl hover:underline">{dog.name}</span>
                          <p className="text-sm text-muted-foreground font-normal">
                            {dog.gender} • {dog.age}
                          </p>
                        </div>
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
                        <Button
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDog(dog.id);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
