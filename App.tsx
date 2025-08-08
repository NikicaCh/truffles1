import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Router, useRouter } from "./components/Router";
import { SEOHead } from "./components/SEOHead";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { Sitemap } from "./components/Sitemap";
import { availableDogs } from "./data/dogs";

export default function App() {
  const { currentRoute, dogId, navigate } = useRouter();

  // Get dog data for SEO
  const currentDog = dogId ? availableDogs.find(dog => 
    dog.name.toLowerCase().replace(/\s+/g, '-') === dogId
  ) : null;

  // Generate SEO data based on current route
  const getSEOData = () => {
    if (currentRoute === 'dog-profile' && currentDog) {
      return {
        title: `${currentDog.name} - ${currentDog.gender} Lagotto Romagnolo Puppy | Truffles Macedonia`,
        description: `Meet ${currentDog.name}, a beautiful ${currentDog.gender.toLowerCase()} ${currentDog.color} Lagotto Romagnolo puppy from champion bloodlines. ${currentDog.age}, health tested, perfect for ${currentDog.suitableFor.join(', ')}. Available at Truffles Macedonia.`,
        keywords: `${currentDog.name}, Lagotto Romagnolo puppy, ${currentDog.gender}, ${currentDog.color}, ${currentDog.age}, champion bloodlines, truffle hunting dog, hypoallergenic dog, Truffles Macedonia`,
        canonicalUrl: `https://trufflesmacedonia.com/dog/${dogId}`,
        dogName: currentDog.name,
        dogPrice: currentDog.price
      };
    }
    
    return {
      title: "Truffles Macedonia - Premier Lagotto Romagnolo Breeders | Champion Bloodlines | Truffle Dogs Europe",
      description: "Europe's leading Lagotto Romagnolo breeders since 1999. Champion bloodline puppies, health tested, authentic Italian truffle hunting dogs. Located in Macedonia, shipping worldwide. Expert breeding, lifetime support.",
      keywords: "Lagotto Romagnolo breeder, Lagotto Romagnolo puppies for sale, truffle hunting dogs, champion bloodlines, European dog breeder, Macedonia, Italian water dog, hypoallergenic dogs, curly coat dogs, working dogs, family dogs, truffle dogs Europe",
      canonicalUrl: "https://trufflesmacedonia.com"
    };
  };

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: "Home", href: "/" }
    ];

    if (currentRoute === 'dog-profile' && currentDog) {
      breadcrumbs.push(
        { label: "Available Puppies", href: "/#puppies" },
        { label: currentDog.name, current: true }
      );
    }

    return breadcrumbs;
  };

  const seoData = getSEOData();
  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Components */}
      <SEOHead {...seoData} />
      <Sitemap />

      <Navigation currentRoute={currentRoute} onNavigate={navigate} />
      
      {/* Breadcrumbs for better navigation structure */}
      {currentRoute === 'dog-profile' && (
        <Breadcrumbs items={breadcrumbs} onNavigate={navigate} />
      )}
      
      <Router 
        currentRoute={currentRoute} 
        dogId={dogId} 
        onNavigate={navigate} 
      />
      
      <Footer />
    </div>
  );
}