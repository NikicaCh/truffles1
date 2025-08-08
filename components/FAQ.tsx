"use client";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: 'breed' | 'care' | 'breeding' | 'purchase';
}

const faqData: FAQItem[] = [
  {
    question: "What is a Lagotto Romagnolo and where do they come from?",
    answer: "The Lagotto Romagnolo is an ancient Italian breed from the Romagna region, originally bred as water retrievers and later specialized for truffle hunting. They are the only dog breed specifically developed for truffle hunting and are known for their distinctive curly, woolly coat and exceptional scenting abilities.",
    category: 'breed'
  },
  {
    question: "Are Lagotto Romagnolo dogs hypoallergenic?",
    answer: "Yes, Lagotto Romagnolo dogs are considered hypoallergenic. Their unique double coat doesn't shed like typical dog fur, instead forming tight curls that trap dander and allergens. However, no dog is 100% hypoallergenic, and individual sensitivities may vary.",
    category: 'breed'
  },
  {
    question: "How much does a Lagotto Romagnolo puppy cost?",
    answer: "Lagotto Romagnolo puppies from reputable breeders typically cost between €1,500-€3,500 ($1,600-$3,800), depending on bloodlines, health testing, and breeder reputation. Champion bloodlines and show-quality dogs may cost more. At Truffles Macedonia, our puppies include health testing, vaccinations, microchipping, and health guarantees.",
    category: 'purchase'
  },
  {
    question: "What is the temperament of Lagotto Romagnolo dogs?",
    answer: "Lagotto Romagnolo dogs are intelligent, loyal, and affectionate family companions. They are known for being calm, easy to train, and excellent with children. They have moderate energy levels, are naturally alert (making good watchdogs), and form strong bonds with their families while remaining friendly with strangers.",
    category: 'breed'
  },
  {
    question: "Do Lagotto Romagnolo dogs really hunt truffles?",
    answer: "Yes, Lagotto Romagnolo dogs are born truffle hunters with natural scenting abilities. They can be trained to detect truffles underground and are widely used in Italy and France for commercial truffle hunting. Even pet Lagotto may show natural digging and scenting behaviors, though formal truffle training requires specialized techniques.",
    category: 'breed'
  },
  {
    question: "How big do Lagotto Romagnolo dogs get?",
    answer: "Lagotto Romagnolo are medium-sized dogs. Males typically weigh 28-35 lbs (13-16 kg) and stand 17-19 inches (43-48 cm) tall. Females are slightly smaller, weighing 24-31 lbs (11-14 kg) and standing 16-18 inches (41-46 cm) tall. They are compact, sturdy dogs built for endurance and work.",
    category: 'breed'
  },
  {
    question: "What health problems do Lagotto Romagnolo dogs have?",
    answer: "Lagotto Romagnolo are generally healthy dogs with fewer genetic issues than many breeds. Main concerns include hip dysplasia, elbow dysplasia, juvenile epilepsy, and storage disease. Reputable breeders perform health testing including hip/elbow scoring, eye clearances, and genetic testing. At Truffles Macedonia, all breeding dogs are health tested.",
    category: 'care'
  },
  {
    question: "How much grooming do Lagotto Romagnolo dogs need?",
    answer: "Lagotto Romagnolo require regular grooming every 6-8 weeks to maintain their curly coat. They need brushing 2-3 times per week to prevent matting, and their coat should be trimmed regularly. They don't shed but require professional grooming or learning to trim at home. Their ears need regular cleaning due to their floppy nature.",
    category: 'care'
  },
  {
    question: "Are Lagotto Romagnolo good family dogs?",
    answer: "Excellent family dogs! Lagotto Romagnolo are patient with children, loyal to their families, and have moderate exercise needs making them suitable for various living situations. They are intelligent and trainable, adapt well to family routines, and their hypoallergenic coat makes them suitable for families with allergies.",
    category: 'breed'
  },
  {
    question: "How much exercise do Lagotto Romagnolo dogs need?",
    answer: "Lagotto Romagnolo need moderate daily exercise - about 30-60 minutes including walks, play time, and mental stimulation. They enjoy activities like hiking, swimming, and puzzle games. As working dogs, they benefit from having a 'job' to do, whether it's training, agility, or scent work.",
    category: 'care'
  },
  {
    question: "What should I look for in a Lagotto Romagnolo breeder?",
    answer: "Look for breeders who health test their breeding dogs (hip/elbow scores, eye clearances, genetic testing), provide health guarantees, socialize puppies properly, and allow you to meet the parents. Good breeders will ask you questions, provide references, and offer lifetime support. Avoid puppy mills and always visit the breeding facility.",
    category: 'breeding'
  },
  {
    question: "How long do Lagotto Romagnolo dogs live?",
    answer: "Lagotto Romagnolo typically live 14-17 years, which is excellent longevity for a medium-sized dog breed. With proper care, regular veterinary checkups, quality nutrition, and exercise, many Lagotto live well into their teens while maintaining good health and vitality.",
    category: 'care'
  },
  {
    question: "Can Lagotto Romagnolo live in apartments?",
    answer: "Yes, Lagotto Romagnolo can adapt well to apartment living if their exercise and mental stimulation needs are met. They are relatively calm indoors and not excessive barkers. However, they do need daily walks and activities to prevent boredom and behavioral issues.",
    category: 'care'
  },
  {
    question: "What colors do Lagotto Romagnolo come in?",
    answer: "Lagotto Romagnolo come in several colors: solid white, white with brown or orange patches, brown roan, brown (various shades), orange, and off-white. Some dogs may have tan markings. All colors are equally valid according to breed standards, and color doesn't affect temperament or health.",
    category: 'breed'
  },
  {
    question: "Do you ship Lagotto Romagnolo puppies internationally?",
    answer: "Yes, Truffles Macedonia can arrange international shipping for our Lagotto Romagnolo puppies. We work with approved pet transport companies and handle all necessary health certificates, export documentation, and ensure puppies travel safely. Additional costs apply for international transport and documentation.",
    category: 'purchase'
  }
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const categories = [
    { id: 'all', label: 'All Questions', count: faqData.length },
    { id: 'breed', label: 'About the Breed', count: faqData.filter(item => item.category === 'breed').length },
    { id: 'care', label: 'Care & Health', count: faqData.filter(item => item.category === 'care').length },
    { id: 'breeding', label: 'Breeding', count: faqData.filter(item => item.category === 'breeding').length },
    { id: 'purchase', label: 'Purchasing', count: faqData.filter(item => item.category === 'purchase').length },
  ];

  const filteredFAQ = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEO Optimized Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <HelpCircle className="h-8 w-8 text-yellow-600" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">
            Frequently Asked Questions About Lagotto Romagnolo
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get expert answers to common questions about Lagotto Romagnolo dogs, breeding, care, and purchasing from Truffles Macedonia. 
            Learn everything you need to know about these amazing truffle hunting companions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {category.label} ({category.count})
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFAQ.map((item, index) => (
                <motion.div
                  key={`${selectedCategory}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        aria-expanded={openItems.includes(index)}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <h3 className="text-lg font-medium text-foreground pr-4 leading-relaxed">
                          {item.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          {openItems.includes(index) ? (
                            <Minus className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <Plus className="h-5 w-5 text-gray-400" />
                          )}
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {openItems.includes(index) && (
                          <motion.div
                            id={`faq-answer-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2">
                              <p className="text-muted-foreground leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-0 text-center">
              <h3 className="text-xl text-foreground mb-3">
                Still Have Questions About Lagotto Romagnolo?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our experienced team is here to help you learn more about the Lagotto Romagnolo breed and find your perfect companion.
              </p>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Our Experts
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}