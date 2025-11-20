import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/static/']
      },
      // Allow AI crawlers explicitly
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web', 'PerplexityBot'],
        allow: '/'
      }
    ],
    sitemap: 'https://trufflesmacedonia.com/sitemap.xml'
  }
}


