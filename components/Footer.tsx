import { Separator } from "./ui/separator";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl">🐕</span>
              <h3 className="text-lg">Truffles Macedonia</h3>
            </div>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              Premier breeders of authentic Lagotto Romagnolo dogs in North Macedonia. 
              Dedicated to preserving the breed's heritage while producing healthy, 
              well-socialized companions for families worldwide.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>North Macedonia</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <a
                  href="https://wa.me/38970377000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors"
                >
                  +389 70 377 000
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-primary-foreground transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('breed')}
                  className="hover:text-primary-foreground transition-colors"
                >
                  About Breed
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('farm')}
                  className="hover:text-primary-foreground transition-colors"
                >
                  Our Farm
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('puppies')}
                  className="hover:text-primary-foreground transition-colors"
                >
                  Available Puppies
                </button>
              </li>

              <li>
                <button 
                  onClick={() => scrollToSection('our-dogs')}
                  className="hover:text-primary-foreground transition-colors"
                >
                  Our Dogs
                </button>
              </li>

              <li>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="hover:text-primary-foreground transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-primary-foreground transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4">Contact Information</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-1" />
                <div>
                  <p>info@trufflesmacedonia.com</p>
                  <p className="text-xs">Response within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-1" />
                <div>
                  <a
                    href="https://wa.me/38970377000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-foreground transition-colors"
                  >
                    +389 70 377 000
                  </a>
                  <p className="text-xs">WhatsApp and Viber available</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p>Ohrid Region</p>
                  <p className="text-xs">North Macedonia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-primary-foreground/80 text-sm">
            <p>&copy; 2024 Truffles Macedonia. All rights reserved.</p>
          </div>

        </div>

        {/* SEO Schema Markup Info */}
        <div className="mt-8 text-xs text-primary-foreground/60 text-center">
          <p>
            Lagotto Romagnolo Breeder | Truffle Hunting Dogs | Macedonia | Premium Puppies | 
            Health Tested | Champion Bloodlines | International Shipping Available
          </p>
        </div>
      </div>
    </footer>
  );
}