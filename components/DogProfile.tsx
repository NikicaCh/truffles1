"use client";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, Calendar, Weight, Heart, Shield, Award, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Dog } from "../data/dogs";

interface DogProfileProps {
  dog: Dog;
  onBack?: () => void;
}

export function DogProfile({ dog, onBack }: DogProfileProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dog.id]); // Re-run when dog changes

  const scrollToContact = () => {
    if (onBack) {
      onBack();
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Navigate to home with hash for direct section navigation
      window.location.href = '/#contact';
    }
  };

  return (
    <div ref={ref} className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => (onBack ? onBack() : router.push('/'))}
            className="mb-8 hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Dogs
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ImageWithFallback
                src={dog.images[0]}
                alt={`${dog.name} - Main Photo`}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <Badge 
                className={`absolute top-4 right-4 ${
                  dog.status === 'Available' ? 'bg-green-500' : 
                  dog.status === 'Reserved' ? 'bg-blue-500' : 'bg-gray-500'
                }`}
              >
                {dog.status}
              </Badge>
            </motion.div>
            
            {dog.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {dog.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${dog.name} - Photo ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Dog Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <motion.h1 
                className="text-4xl mb-2 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {dog.name}
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {dog.gender} • {dog.color}
              </motion.p>
              <motion.div 
                className="text-2xl text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {dog.price}
              </motion.div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: "Age", value: dog.age },
                { icon: Weight, label: "Weight", value: dog.weight },
                { icon: Award, label: "Sire", value: dog.parents.sire.split(' ').slice(-2).join(' ') },
                { icon: Heart, label: "Dam", value: dog.parents.dam.split(' ').slice(-2).join(' ') }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-4">
                    <CardContent className="p-0 flex items-center space-x-3">
                      <item.icon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Personality Traits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h3 className="text-lg mb-3">Personality</h3>
              <div className="flex flex-wrap gap-2">
                {dog.personality.map((trait, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge variant="outline">{trait}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <Button 
                size="lg" 
                className="flex-1"
                onClick={scrollToContact}
                disabled={dog.status !== 'Available'}
              >
                {dog.status === 'Available' ? 'Inquire About' : 'Contact About'} {dog.name}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToContact}
              >
                Schedule Visit
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* About This Dog */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>About {dog.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {dog.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Health Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Vaccinated", value: dog.healthInfo.vaccinated },
                  { label: "Microchipped", value: dog.healthInfo.microchipped },
                  { label: "Health Tested", value: dog.healthInfo.healthTested },
                  { label: "Health Guarantee", value: dog.healthInfo.healthGuarantee }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <Badge variant={item.value ? "default" : "secondary"}>
                      {item.value ? "✓ Yes" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features and Suitability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Features & Highlights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {dog.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.8 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Suitable For */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Perfect For</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {dog.suitableFor.map((type, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.9 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">{type}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Parents Information */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Pedigree Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Sire (Father)</h4>
                  <p className="text-muted-foreground">{dog.parents.sire}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dam (Mother)</h4>
                  <p className="text-muted-foreground">{dog.parents.dam}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}