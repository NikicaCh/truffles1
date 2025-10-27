import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { availableDogs, ourDogs } from "@/data/dogs";
import { DogProfile } from "@/components/DogProfile";

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
  const title = `${dog.name} - ${dog.gender} Lagotto Romagnolo ${
    isPuppy ? "Puppy" : ""
  } | Truffles Macedonia`;

  const description = isPuppy
    ? `Meet ${dog.name}, a beautiful ${dog.gender.toLowerCase()} ${
        dog.color
      } Lagotto Romagnolo puppy from champion bloodlines. ${dog.age}, health tested, perfect for ${dog.suitableFor.join(
        ", "
      )}.`
    : `Discover ${dog.name}, our ${dog.gender.toLowerCase()} ${
        dog.color
      } Lagotto Romagnolo. ${dog.age}, health tested, ${dog.features.join(
        ", "
      )}.`;

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
      <DogProfile dog={dog} />
    </div>
  );
}
