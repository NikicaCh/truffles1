"use client";
import { useEffect } from 'react';
import { availableDogs } from '../data/dogs';

export function Sitemap() {
  useEffect(() => {
    // Generate sitemap data for SEO
    const generateSitemap = () => {
      const baseUrl = 'https://trufflesmacedonia.com';
      const currentDate = new Date().toISOString().split('T')[0];
      
      const urls = [
        {
          loc: baseUrl,
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: '1.0'
        },
        {
          loc: `${baseUrl}/#breed`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.8'
        },
        {
          loc: `${baseUrl}/#farm`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.8'
        },
        {
          loc: `${baseUrl}/#puppies`,
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: '0.9'
        },
        {
          loc: `${baseUrl}/#gallery`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.7'
        },
        {
          loc: `${baseUrl}/#awards`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.7'
        },
        {
          loc: `${baseUrl}/#contact`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.8'
        }
      ];

      // Add individual dog pages
      availableDogs.forEach(dog => {
        const dogSlug = dog.name.toLowerCase().replace(/\s+/g, '-');
        urls.push({
          loc: `${baseUrl}/dog/${dogSlug}`,
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: '0.9'
        });
      });

      // Store sitemap data in console for development (in production, this would be generated server-side)
      console.log('SEO Sitemap Generated:', urls);
      
      // You could also store this data to be used by a server-side sitemap generator
      if (typeof window !== 'undefined') {
        (window as any).sitemapData = urls;
      }
    };

    generateSitemap();
  }, []);

  return null; // This component doesn't render anything
}