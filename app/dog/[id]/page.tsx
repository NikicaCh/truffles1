import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { availableDogs, getDogById } from '@/data/dogs'
import { DogProfile } from '@/components/DogProfile'

type Props = { params: { id: string } }

export function generateStaticParams() {
  return availableDogs.map(d => ({ id: d.id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const dog = getDogById(params.id)
  if (!dog) return {}
  const title = `${dog.name} - ${dog.gender} Lagotto Romagnolo Puppy | Truffles Macedonia`
  const description = `Meet ${dog.name}, a beautiful ${dog.gender.toLowerCase()} ${dog.color} Lagotto Romagnolo puppy from champion bloodlines. ${dog.age}, health tested, perfect for ${dog.suitableFor.join(', ')}.`
  const canonical = `https://trufflesmacedonia.com/dog/${params.id}`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { title, description }
  }
}

export default function DogPage({ params }: Props) {
  const dog = getDogById(params.id)
  if (!dog) return notFound()
  return (
    <div className="min-h-screen bg-background">
      <DogProfile dog={dog} />
    </div>
  )
}


