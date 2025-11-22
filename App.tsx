import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Router, useRouter } from "./components/Router";
import { SEOHead } from "./components/SEOHead";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { Sitemap } from "./components/Sitemap";
import { availableDogs } from "./data/dogs";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App() {
  const { currentRoute, dogId, navigate } = useRouter();

  // Get dog data for SEO
  const currentDog = dogId ? availableDogs.find(dog => 
    dog.name.toLowerCase().replace(/\s+/g, '-') === dogId
  ) : null;

  // Generate SEO data based on current route
  const getSEOData = () => {
    if (currentRoute === 'dog-profile' && currentDog) {
      const suitable = currentDog.suitableFor ? currentDog.suitableFor.join(', ') : 'families and active individuals';
      return {
        title: `${currentDog.name} - ${currentDog.gender} Lagotto Romagnolo Puppy | Truffles Macedonia`,
        description: `Meet ${currentDog.name}, a beautiful ${currentDog.gender.toLowerCase()} ${currentDog.color} Lagotto Romagnolo puppy from champion bloodlines. ${currentDog.age}, health tested, perfect for ${suitable}. Available at Truffles Macedonia.`,
        keywords: `${currentDog.name}, Lagotto Romagnolo puppy, ${currentDog.gender}, ${currentDog.color}, ${currentDog.age}, champion bloodlines, truffle hunting dog, hypoallergenic dog, Truffles Macedonia`,
        canonicalUrl: `https://trufflesmacedonia.com/dog/${dogId}`,
        dogName: currentDog.name,
      };
    }
    
    return {
      title: "Truffles Macedonia - Premium Lagotto Romagnolo | Champion Bloodlines | Truffle Dogs Europe",
      description: "Europe's leading Lagotto Romagnolo breeders since 1999. Champion bloodline puppies, health tested, authentic Italian truffle hunting dogs. Located in Macedonia, shipping worldwide. Expert breeding, lifetime support.",
      keywords: "Lagotto Romagnolo breeder, Lagotto Romagnolo puppies for sale, truffle hunting dogs, champion bloodlines, European dog breeder, Macedonia, Italian water dog, hypoallergenic dogs, curly coat dogs, working dogs, family dogs, truffle dogs Europe",
      canonicalUrl: "https://trufflesmacedonia.com"
    };
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: "Home", href: "/", current: false }
    ];
    if (currentRoute === 'dog-profile' && currentDog) {
      breadcrumbs.push(
        { label: "Available Puppies", href: "/#puppies", current: false },
        { label: currentDog.name, current: true, href: `/dog/${dogId}` }
      );
    }
    return breadcrumbs;
  };

  const seoData = getSEOData();
  const breadcrumbs = getBreadcrumbs();

  const handleBreadcrumbNavigate = (href: string) => {
    if (href.startsWith('/dog/')) {
      const id = href.replace('/dog/', '');
      navigate('dog-profile', id);
    } else {
      navigate('home');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Components */}
      <SEOHead {...seoData} />
      <Sitemap />

      <Navigation currentRoute={currentRoute} onNavigate={navigate} />
      
      {/* Breadcrumbs for better navigation structure */}
      {currentRoute === 'dog-profile' && (
        <Breadcrumbs items={breadcrumbs} onNavigate={handleBreadcrumbNavigate} />
      )}
      
      <Router 
        currentRoute={currentRoute} 
        dogId={dogId} 
        onNavigate={navigate} 
      />
      <SpeedInsights />
      <Footer />
    </div>
  );
}