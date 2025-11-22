import type { MetadataRoute } from 'next'
import { availableDogs, ourDogs } from '@/data/dogs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://trufflesmacedonia.com'
  const today = new Date().toISOString().split('T')[0]
  
  // Only include the homepage - hash fragments (#breed, #farm, etc.) are not allowed in sitemaps
  // They are client-side navigation anchors, not separate pages
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: today, changeFrequency: 'weekly', priority: 1 }
  ]

  // Include available puppies in sitemap
  const dogRoutes: MetadataRoute.Sitemap = availableDogs.map(dog => ({
    url: `${baseUrl}/dog/${dog.id}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.9
  }))

  // Include our breeding dogs in sitemap
  const ourDogRoutes: MetadataRoute.Sitemap = ourDogs.map(dog => ({
    url: `${baseUrl}/dog/${dog.id}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.85
  }))

  return [...routes, ...dogRoutes, ...ourDogRoutes]
}


