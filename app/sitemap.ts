import type { MetadataRoute } from 'next'
import { availableDogs } from '@/data/dogs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://trufflesmacedonia.com'
  const today = new Date().toISOString().split('T')[0]
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/#breed`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#farm`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#puppies`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/#gallery`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#awards`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#contact`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 }
  ]

  const dogRoutes: MetadataRoute.Sitemap = availableDogs.map(dog => ({
    url: `${baseUrl}/dog/${dog.id}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.9
  }))

  return [...routes, ...dogRoutes]
}


