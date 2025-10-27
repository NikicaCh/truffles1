"use client";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const testimonials = [
    {
      name: "Sarah & Michael Johnson",
      location: "London, UK",
      rating: 5,
      text: "We got our Lagotto Romeo from Truffles Macedonia two years ago, and he has been the perfect addition to our family. The professionalism and care shown by the breeders was exceptional. Romeo is healthy, intelligent, and has the most wonderful temperament.",
      dogName: "Romeo",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Elena Rossi",
      location: "Milan, Italy",
      rating: 5,
      text: "As a truffle hunter, I needed an authentic Lagotto with real working ability. Luna from Truffles Macedonia exceeded all expectations. She found her first truffles at just 8 months old! The breeding quality is outstanding.",
      dogName: "Luna",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "David & Emma Wilson",
      location: "Sydney, Australia",
      rating: 5,
      text: "The entire process from inquiry to bringing Stella home was seamless. The team provided constant updates, photos, and support. Stella arrived healthy and well-socialized. We couldn't be happier with our decision.",
      dogName: "Stella",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    // {
    //   name: "Hans & Greta Müller",
    //   location: "Munich, Germany",
    //   rating: 5,
    //   text: "Bruno is now 3 years old and continues to amaze us every day. His intelligence and loyalty are remarkable. The health guarantee and ongoing support from Truffles Macedonia shows their commitment to their dogs' wellbeing.",
    //   dogName: "Bruno",
    //   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    // },
    // {
    //   name: "Maria & Carlos Rodriguez",
    //   location: "Barcelona, Spain",
    //   rating: 5,
    //   text: "Our Bella is the most gentle and loving dog with our children. Despite being a working breed, she adapts perfectly to family life. The early socialization program at Truffles Macedonia really shows in her confident, friendly nature.",
    //   dogName: "Bella",
    //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    // },
    // {
    //   name: "Jean & Pierre Dubois",
    //   location: "Lyon, France",
    //   rating: 5,
    //   text: "As professional dog trainers, we appreciate the excellent foundation these puppies receive. Maximus came to us with basic training already started and was eager to learn. The breeding program focuses on intelligence and trainability.",
    //   dogName: "Maximus",
    //   image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    // }
  ];

  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
      >
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      </motion.div>
    ));
  };

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute top-10 right-20 w-36 h-36 bg-yellow-400/5 rounded-full blur-3xl"
        style={{ y: backgroundY }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 left-20 w-28 h-28 bg-primary/5 rounded-full blur-2xl"
        style={{ y: backgroundY }}
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
          <h2 className="text-3xl md:text-4xl mb-6">Happy Families</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We maintain warm and friendly relationships with every owner and believe in long-term cooperation and transparent communication.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
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
              <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-0">
                  <motion.div 
                    className="flex items-center space-x-4 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <motion.img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <div className="flex space-x-1 mt-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.blockquote 
                    className="text-sm text-muted-foreground italic mb-3 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    "{testimonial.text}"
                  </motion.blockquote>
                  
                  <motion.p 
                    className="text-xs text-primary"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    Proud parent of {testimonial.dogName}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="bg-background rounded-lg p-8 max-w-4xl mx-auto"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl mb-4">Join Our Extended Family</h3>
            <p className="text-muted-foreground mb-6">
              When you choose a puppy from Truffles Macedonia, you're not just getting a dog - 
              you're joining a community of Lagotto lovers who support each other throughout their dogs' lives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: "🏆", title: "100+ Happy Families", subtitle: "Worldwide" },
                { icon: "⭐", title: "5.0 Star Rating", subtitle: "Customer satisfaction" },
                { icon: "🤝", title: "Lifetime Support", subtitle: "Always here to help" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h4 className="mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}