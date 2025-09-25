"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import logo from "../public/logo.jpeg";

interface NavigationProps {
  currentRoute: 'home' | 'dog-profile';
  onNavigate: (route: 'home' | 'dog-profile') => void;
}

export function Navigation({ currentRoute, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (currentRoute !== 'home') {
      onNavigate('home');
      // Wait a bit for the page to load, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (currentRoute === 'home') {
      scrollToSection('home');
    } else {
      onNavigate('home');
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'breed', label: 'About Breed' },
    { id: 'farm', label: 'Our Farm' },
    { id: 'puppies', label: 'Available Puppies' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={handleHomeClick} className="flex items-center space-x-2">
              <Image src={logo} alt="Truffles Macedonia logo" width={120} height={120} priority />
              <span className="sr-only">Truffles Macedonia</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'home') {
                      handleHomeClick();
                    } else {
                      scrollToSection(link.id);
                    }
                  }}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm rounded-lg mt-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'home') {
                      handleHomeClick();
                    } else {
                      scrollToSection(link.id);
                    }
                  }}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md w-full text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}