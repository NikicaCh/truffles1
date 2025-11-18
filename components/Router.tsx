import { useState, useEffect, Suspense } from 'react';
import { availableDogs, getDogById } from '../data/dogs';
import { DogProfile } from './DogProfile';
import { Hero } from './Hero';
import { AboutBreed } from './AboutBreed';
import { AboutFarm } from './AboutFarm';
import { AvailablePuppies } from './AvailablePuppies';
import { Gallery } from './Gallery';
import { Awards } from './Awards';
import { Contact } from './Contact';
import { OurDogs } from './OurDogs';

export type Route = 'home' | 'dog-profile';

interface RouterProps {
  currentRoute: Route;
  dogId?: string;
  onNavigate: (route: Route, dogId?: string) => void;
}

export function Router({ currentRoute, dogId, onNavigate }: RouterProps) {
  switch (currentRoute) {
    case 'dog-profile':
      if (dogId) {
        const dog = getDogById(dogId);
        if (dog) {
          return (
            <Suspense fallback={<div>Loading...</div>}>
              <DogProfile dog={dog} onBack={() => onNavigate('home')} />
            </Suspense>
          );
        }
      }
      // If dog not found, redirect to home
      onNavigate('home');
      return null;
      
    case 'home':
    default:
      return (
        <main>
          <Hero />
          <AboutBreed />
          <AboutFarm />
          <AvailablePuppies />
          <OurDogs />
          <Gallery />
          <Awards />
          <Contact />
        </main>
      );
  }
}

// Custom hook for URL-based routing
export function useRouter() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [dogId, setDogId] = useState<string | undefined>();

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const dogMatch = path.match(/\/dog\/(.+)/);
      
      if (dogMatch) {
        setCurrentRoute('dog-profile');
        setDogId(dogMatch[1]);
      } else {
        setCurrentRoute('home');
        setDogId(undefined);
      }
    };

    // Handle initial load
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: Route, newDogId?: string) => {
    if (route === 'dog-profile' && newDogId) {
      const newPath = `/dog/${newDogId}`;
      window.history.pushState({}, '', newPath);
      setCurrentRoute('dog-profile');
      setDogId(newDogId);
    } else {
      window.history.pushState({}, '', '/');
      setCurrentRoute('home');
      setDogId(undefined);
    }
  };

  return {
    currentRoute,
    dogId,
    navigate
  };
}