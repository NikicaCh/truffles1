import type { MetadataRoute } from 'next'
import { availableDogs, ourDogs } from '@/data/dogs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://trufflesmacedonia.com'
  const today = new Date().toISOString().split('T')[0]
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/#breed`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#farm`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#puppies`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/#our-dogs`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#gallery`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#awards`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#contact`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 }
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


