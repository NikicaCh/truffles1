"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    inquiryType: '',
    preferredColor: '',
    timeframe: '',
    message: ''
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    toast.success("Thank you for your inquiry! We'll contact you within 24 hours.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      inquiryType: '',
      preferredColor: '',
      timeframe: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-bl from-primary to-yellow-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-tr from-yellow-400 to-primary rounded-full blur-2xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl mb-6">Get in Touch</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to welcome a Lagotto Romagnolo into your family? We'd love to hear from you! 
            Contact us to learn more about our available puppies and upcoming litters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl mb-6">Contact Information</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: "Location",
                    main: "Ohrid Region, North Macedonia",
                    sub: "Exact address provided upon inquiry for privacy and security"
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    main: "+389 70 123 456",
                    sub: "WhatsApp available"
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    main: "info@trufflesmacedonia.com",
                    sub: "We respond within 24 hours"
                  },
                  {
                    icon: Clock,
                    title: "Response Times",
                    main: "Monday - Sunday: 9:00 AM - 7:00 PM CET",
                    sub: "Emergency contact available for puppy parents"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <item.icon className="h-5 w-5 text-primary mt-1" />
                    </motion.div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-muted-foreground">{item.main}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      q: "What's the adoption process?",
                      a: "Initial inquiry → Application → Phone/video interview → Deposit → Puppy selection → Final payment → Pickup/delivery"
                    },
                    {
                      q: "Do you ship internationally?",
                      a: "Yes! We arrange safe transport to most countries. All health certifications and export requirements are handled."
                    },
                    {
                      q: "What health testing do you do?",
                      a: "All breeding dogs are tested for hips, elbows, eyes, and genetic disorders common to the breed."
                    },
                    {
                      q: "Can we visit the farm?",
                      a: "Absolutely! We encourage visits by appointment. Virtual tours are also available for international clients."
                    }
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <h5 className="font-medium mb-1">{faq.q}</h5>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send Us an Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="current-litter">Current Available Puppies</SelectItem>
                          <SelectItem value="future-litter">Future Litter Reservation</SelectItem>
                          <SelectItem value="general-info">General Information</SelectItem>
                          <SelectItem value="visiting">Visit Request</SelectItem>
                          <SelectItem value="adult-dog">Adult Dog Availability</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeframe">When are you looking to adopt?</Label>
                      <Select onValueChange={(value) => handleInputChange('timeframe', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediately">Immediately</SelectItem>
                          <SelectItem value="3-months">Within 3 months</SelectItem>
                          <SelectItem value="6-months">Within 6 months</SelectItem>
                          <SelectItem value="year">Within a year</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Label htmlFor="preferredColor">Preferred Color</Label>
                    <Select onValueChange={(value) => handleInputChange('preferredColor', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brown">Brown</SelectItem>
                        <SelectItem value="orange">Orange/Red</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="mixed">Brown/Orange/White Mix</SelectItem>
                        <SelectItem value="no-preference">No Preference</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your family, experience with dogs, living situation, and any specific questions you have..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" className="w-full">
                      Send Inquiry
                    </Button>
                  </motion.div>

                  <motion.p 
                    className="text-sm text-muted-foreground text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    We typically respond to all inquiries within 24 hours. Thank you for your interest in our Lagotto Romagnolo dogs!
                  </motion.p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}