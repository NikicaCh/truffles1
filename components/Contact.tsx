"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MapPin, Phone, Mail, Clock, LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { motion, useScroll, useTransform, useInView } from "motion/react";

interface ContactItem {
  icon: LucideIcon;
  title: string;
  main: string;
  sub: string;
  link?: string;
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    inquiryType: "",
    preferredColor: "",
    timeframe: "",
    message: "",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your inquiry!", {
      description: "We'll contact you within 24 hours. We look forward to connecting with you!",
      duration: 5000,
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      inquiryType: "",
      preferredColor: "",
      timeframe: "",
      message: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Reusable “square input” style
  const fieldStyle =
    "h-12 border-2 border-gray-50 rounded-lg bg-white/90 px-4 " +
    "focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition mt-2";

  const selectTriggerStyle =
    "h-12 border-2 border-gray-50 rounded-lg bg-white/90 " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition mt-2";

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ y: backgroundY }}>
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-bl from-primary to-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-tr from-blue-400 to-primary rounded-full blur-2xl" />
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
            If you want a Lagotto Romagnolo with pedigree from one of Europe’s most awarded FCI kennels — with proven healthy
            genetics and top predispositions — contact us and become part of our canine family!
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
                    main: "Kumanovo, North Macedonia",
                    sub: "Exact address provided upon inquiry for privacy and security",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    main: "+389 70 377 000",
                    sub: "WhatsApp and Viber available",
                    link: "https://wa.me/38970377000",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    main: "truffles.macedonia@gmail.com",
                    sub: "We respond within 24 hours",
                  },
                  {
                    icon: Clock,
                    title: "Response Times",
                    main: "Open 24/7 (CET)",
                    sub: "Emergency contact available for puppy parents",
                  },
                ].map((item: ContactItem, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <item.icon className="h-5 w-5 text-primary mt-1" />
                    </motion.div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.main}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.main}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="border-2 border-gray-10">
              <CardHeader>
                <CardTitle>Send Us an Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1 */}
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
                        placeholder="John Doe"
                        className={fieldStyle}
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className={fieldStyle}
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Row 2 */}
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
                        placeholder="+389 7x xxx xxx"
                        className={fieldStyle}
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Your country"
                        className={fieldStyle}
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                      />
                    </div>
                  </motion.div>

                  {/* Row 3 */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select onValueChange={(value) => handleInputChange("inquiryType", value)}>
                        <SelectTrigger className={selectTriggerStyle}>
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
                      <Select onValueChange={(value) => handleInputChange("timeframe", value)}>
                        <SelectTrigger className={selectTriggerStyle}>
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

                  {/* Row 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Label htmlFor="preferredColor">Preferred Color</Label>
                    <Select onValueChange={(value) => handleInputChange("preferredColor", value)}>
                      <SelectTrigger className={selectTriggerStyle}>
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

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      className="border-2 border-gray-50 rounded-lg bg-white/90 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition mt-2"
                      placeholder="Tell us about your family, experience with dogs, living situation, and any specific questions you have..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                  </motion.div>

                  {/* Submit */}
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
                    We typically respond to all inquiries within 24 hours. Thank you for your interest in our Lagotto Romagnolo
                    dogs!
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
