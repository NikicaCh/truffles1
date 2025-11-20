import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { availableDogs, ourDogs } from "@/data/dogs";
import { DogProfile } from "@/components/DogProfile";

import { Suspense } from "react";


type Props = { params: { id: string } };

// 🔹 Combine both sets for static generation
export function generateStaticParams() {
  return [...availableDogs, ...ourDogs].map((d) => ({ id: d.id }));
}

// 🔹 Unified data lookup
function getAnyDogById(id: string) {
  return (
    availableDogs.find((d) => d.id === id) ||
    ourDogs.find((d) => d.id === id)
  );
}

// 🔹 Unified SEO metadata
export function generateMetadata({ params }: Props): Metadata {
  const dog = getAnyDogById(params.id);
  if (!dog) return {};

  const isPuppy = availableDogs.some((d) => d.id === params.id);
  const displayName = dog.aka ? `${dog.name} aka ${dog.aka}` : dog.name;
  const title = `${displayName} - ${dog.gender} Lagotto Romagnolo ${
    isPuppy ? "Puppy" : ""
  } | Truffles Macedonia`;

  let description = "";

  if (isPuppy) {
    const suitable = dog.suitableFor ? dog.suitableFor.join(", ") : "families and active individuals";
    description = `Meet ${displayName}, a beautiful ${dog.gender.toLowerCase()} ${
        dog.color
      } Lagotto Romagnolo puppy from champion bloodlines. ${dog.age}, health tested, perfect for ${suitable}.`;
  } else {
    const features = dog.features ? dog.features.join(", ") : "exceptional temperament and conformation";
    description = `Discover ${displayName}, our ${dog.gender.toLowerCase()} ${
        dog.color
      } Lagotto Romagnolo. ${dog.age}, health tested, ${features}.`;
  }

  const canonical = `https://trufflesmacedonia.com/dog/${params.id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
  };
}

// 🔹 Single page component for both
export default function DogPage({ params }: Props) {
  const dog = getAnyDogById(params.id);
  if (!dog) return notFound();

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <DogProfile dog={dog} />
      </Suspense>
    </div>
  );
}
