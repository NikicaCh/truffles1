"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logoSquare from "../public/logotto.webp";

/* Tiny config */
const TITLE_COLOR_HEX = "#B8860B";
const ANIM = "motion-safe:animate-fade-in-up";
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "breed", label: "About Breed" },
  { id: "farm", label: "Our Farm" },
  { id: "our-dogs", label: "Our Dogs" },
  { id: "gallery", label: "Gallery" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;

type Route = "home" | "dog-profile";

interface NavigationProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
}

export function Navigation({ currentRoute, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll with header offset
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = window.innerWidth < 768 ? 100 : 128;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMenuOpen(false);
  }

  function handleHome() {
    if (currentRoute === "home") scrollToSection("home");
    else onNavigate("home");
  }

  function handleNavClick(id: string) {
    id === "home" ? handleHome() : scrollToSection(id);
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 lg:px-8">
        {/* ===== MOBILE HEADER ===== */}
        <div className="md:hidden relative flex items-center justify-between h-auto py-3">
          {/* Left: Logo (square-ish) */}
          <div className="absolute left-0 flex items-center">

          <div className={`relative h-[100px] w-[60px] overflow-visible ${ANIM} [animation-delay:100ms]`}>
                <Image
                  src={logoSquare}
                  alt="Truffles Macedonia logo"
                  fill
                  priority
                  sizes="60px"
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-110 origin-left will-change-transform"
                />
            
          </div>
            
          </div>

          {/* Center: Title (h1, two lines, animated) */}
          <div className="flex-1 text-center px-2 ml-10 mt-4">
            <h1
              onClick={handleHome}
              role="button"
              aria-label="Go to home"
              title="Truffles Macedonia – Premium Lagotto Romagnolo"
              className={`font-semibold text-xl sm:text-2xl leading-snug tracking-tight whitespace-normal break-words md:animate-none ${ANIM} [animation-delay:180ms]`}
              style={{ color: TITLE_COLOR_HEX, lineHeight: 1.15, wordBreak: "keep-all" }}
            >
              Truffles Macedonia – Premium
              <br />
              Lagotto Romagnolo
            </h1>
          </div>

          {/* Right: Hamburger */}
          <div className="absolute right-0 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((s) => !s)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* ===== DESKTOP HEADER ===== */}
        <div className="hidden md:flex items-center justify-between h-36">
          {/* Left: Logo (set width/height to control aspect) */}
              <div className={`relative h-[100px] w-[220px] overflow-visible ${ANIM} [animation-delay:100ms]`}>
                <Image
                  src={logoSquare}
                  alt="Truffles Macedonia logo"
                  fill
                  priority
                  sizes="180px"
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-110 origin-left will-change-transform"
                />
            
          </div>

          {/* Right: Links (animated as a group) */}
          <div className={`flex items-center space-x-6 ${ANIM} [animation-delay:200ms]`}>
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNavClick(l.id)}
                className="text-foreground hover:text-primary px-2 py-2 rounded-md transition-colors whitespace-nowrap"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        {isMenuOpen && (
          <div className={`md:hidden mt-2 ${ANIM} [animation-delay:100ms]`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleNavClick(l.id)}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md w-full text-left transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
