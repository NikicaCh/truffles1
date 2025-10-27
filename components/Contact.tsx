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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/manlqwrj";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    inquiryType: "",
    preferredColor: "",
    timeframe: "",
    message: ""
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: "New Truffles Macedonia Inquiry"
        })
      });

      if (res.ok) {
        toast.success("Thank you for your inquiry! We'll contact you within 24 hours.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "",
          inquiryType: "",
          preferredColor: "",
          timeframe: "",
          message: ""
        });
      } else {
        toast.error("Could not send your message. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ y: backgroundY }}>
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
                  <div key={index} className="flex items-start space-x-3">
                    <item.icon className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-muted-foreground">{item.main}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div>
            <Card>
              <CardHeader>
                <CardTitle>Send Us an Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" required value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" name="country" value={formData.country} onChange={(e) => handleInputChange("country", e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Inquiry Type</Label>
                      <Select onValueChange={(value) => handleInputChange("inquiryType", value)}>
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
                      <input type="hidden" name="inquiryType" value={formData.inquiryType} />
                    </div>

                    <div>
                      <Label>When are you looking to adopt?</Label>
                      <Select onValueChange={(value) => handleInputChange("timeframe", value)}>
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
                      <input type="hidden" name="timeframe" value={formData.timeframe} />
                    </div>
                  </div>

                  <div>
                    <Label>Preferred Color</Label>
                    <Select onValueChange={(value) => handleInputChange("preferredColor", value)}>
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
                    <input type="hidden" name="preferredColor" value={formData.preferredColor} />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">Send Inquiry</Button>

                  <p className="text-sm text-muted-foreground text-center">We typically respond within 24 hours.</p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
