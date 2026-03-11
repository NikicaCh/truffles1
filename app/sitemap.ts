import type { MetadataRoute } from 'next'
import { availableDogs, ourDogs } from '@/data/dogs'
import { getNewLitters } from '@/data/litters'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lagottomacedonia.com'
  const today = new Date().toISOString().split('T')[0]
  
  // Only include the homepage - hash fragments (#breed, #farm, etc.) are not allowed in sitemaps
  // They are client-side navigation anchors, not separate pages
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/new-litters`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 }
  ]

  const newLitterRoutes: MetadataRoute.Sitemap = getNewLitters().map((litter) => ({
    url: `${baseUrl}/new-litters/${litter.slug}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.75
  }))

  // Include individual dog profile pages
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

  return [...routes, ...newLitterRoutes, ...dogRoutes, ...ourDogRoutes]
}


