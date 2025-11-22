"use client";
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  dogName?: string;
}

export function SEOHead({
  title = "Truffles Macedonia - Premium Lagotto Romagnolo | Champion Bloodlines | Truffle Hunting Dogs",
  description = "Truffles Macedonia - Europe's leading Lagotto Romagnolo breeders. Healthy, champion bloodline puppies from authentic Italian truffle hunting dogs. Health tested, socialized, perfect family companions. Located in Macedonia, shipping worldwide.",
  keywords = "Lagotto Romagnolo breeder, Lagotto Romagnolo puppies, truffle hunting dogs, dog breeder Macedonia, champion bloodlines, Italian water dog, hypoallergenic dogs, curly coat dogs, working dogs, family dogs, European dog breeder",
  canonicalUrl = "https://trufflesmacedonia.com",
  ogImage = "https://trufflesmacedonia.com/og-image.jpg",
  articlePublishedTime,
  articleModifiedTime,
  dogName
}: SEOHeadProps) {

  useEffect(() => {
    // Update document title
    document.title = title;

    // Remove existing meta tags to avoid duplicates
    const existingMetas = document.querySelectorAll('meta[data-seo="true"]');
    existingMetas.forEach(meta => meta.remove());

    // Create meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'Truffles Macedonia' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'language', content: 'en' },
      { name: 'revisit-after', content: '7 days' },
      { name: 'distribution', content: 'global' },
      { name: 'rating', content: 'general' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:alt', content: 'Lagotto Romagnolo dogs at Truffles Macedonia breeding facility' },
      { property: 'og:site_name', content: 'Truffles Macedonia' },
      { property: 'og:locale', content: 'en_US' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      
      // Additional SEO
      { name: 'theme-color', content: '#EAB308' },
      { name: 'msapplication-TileColor', content: '#EAB308' },
      { name: 'application-name', content: 'Truffles Macedonia' },
      { name: 'apple-mobile-web-app-title', content: 'Truffles Macedonia' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'mobile-web-app-capable', content: 'yes' }
    ];

    // Add article-specific meta tags
    if (articlePublishedTime) {
      metaTags.push({ property: 'article:published_time', content: articlePublishedTime });
    }
    if (articleModifiedTime) {
      metaTags.push({ property: 'article:modified_time', content: articleModifiedTime });
    }

    // Create and append meta tags
    metaTags.forEach(({ name, property, content }) => {
      const meta = document.createElement('meta');
      if (name) meta.name = name;
      if (property) meta.setAttribute('property', property);
      meta.content = content;
      meta.setAttribute('data-seo', 'true');
      document.head.appendChild(meta);
    });

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Add structured data
    const structuredData: any = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://trufflesmacedonia.com/#business",
          "name": "Truffles Macedonia",
          "alternateName": "Truffles Macedonia Lagotto Romagnolo Breeders",
          "description": "Premium Lagotto Romagnolo specializing in champion bloodlines and authentic Italian truffle hunting dogs",
          "url": "https://trufflesmacedonia.com",
          "telephone": "+389-XX-XXX-XXX",
          "email": "truffles.macedonia@gmail.com",
          "foundingDate": "1999",
          "founder": {
            "@type": "Person",
            "name": "Truffles Macedonia Team"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "North Macedonia",
            "addressLocality": "Macedonia"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "41.6086",
            "longitude": "21.7453"
          },
          "openingHours": "Mo-Su 09:00-18:00",
          "priceRange": "€€€",
          "servesCuisine": "Pet Services",
          "acceptsReservations": true,
          "currenciesAccepted": "EUR, USD",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer",
          "areaServed": [
            {
              "@type": "Country",
              "name": "North Macedonia"
            },
            {
              "@type": "Continent", 
              "name": "Europe"
            },
            {
              "@type": "Place",
              "name": "Worldwide"
            }
          ],
          "makesOffer": [
            {
              "@type": "Offer",
              "name": "Lagotto Romagnolo Puppies",
              "description": "Healthy, champion bloodline Lagotto Romagnolo puppies",
              "seller": {
                "@id": "https://trufflesmacedonia.com/#business"
              }
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dog Breeding Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Lagotto Romagnolo Breeding",
                  "description": "Professional breeding of champion bloodline Lagotto Romagnolo dogs"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Product",
                  "name": "Lagotto Romagnolo Puppy",
                  "description": "Health tested, socialized Lagotto Romagnolo puppies",
                  "brand": {
                    "@type": "Brand",
                    "name": "Truffles Macedonia"
                  }
                }
              }
            ]
          },
          "sameAs": [
            "https://www.facebook.com/trufflesmacedonia",
            "https://www.instagram.com/trufflesmacedonia",
            "https://www.youtube.com/trufflesmacedonia"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://trufflesmacedonia.com/#website",
          "url": "https://trufflesmacedonia.com",
          "name": "Truffles Macedonia",
          "description": "Premium Lagotto Romagnolo in Macedonia",
          "publisher": {
            "@id": "https://trufflesmacedonia.com/#business"
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://trufflesmacedonia.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          ],
          "inLanguage": "en-US"
        },
        {
          "@type": "Organization",
          "@id": "https://trufflesmacedonia.com/#organization", 
          "name": "Truffles Macedonia",
          "alternateName": "Truffles Macedonia Lagotto Romagnolo",
          "url": "https://trufflesmacedonia.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://trufflesmacedonia.com/logo.png",
            "width": 512,
            "height": 512
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+389-XX-XXX-XXX",
              "contactType": "Customer Service",
              "areaServed": "Worldwide",
              "availableLanguage": ["English", "Macedonian"]
            }
          ],
          "foundingDate": "1999",
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "5"
          },
          "knowsAbout": [
            "Lagotto Romagnolo breeding",
            "Dog training",
            "Truffle hunting",
            "Animal care",
            "Genetics",
            "Dog health"
          ],
          "memberOf": [
            {
              "@type": "Organization",
              "name": "Lagotto Romagnolo Club"
            }
          ]
        }
      ]
    };

    // Add dog-specific structured data
    if (dogName) {
      structuredData["@graph"].push({
        "@type": "Product",
        "@id": `https://trufflesmacedonia.com/dog/${dogName.toLowerCase().replace(/\s+/g, '-')}#product`,
        "name": `${dogName} - Lagotto Romagnolo Puppy`,
        "description": `Meet ${dogName}, a beautiful Lagotto Romagnolo puppy from champion bloodlines available at Truffles Macedonia`,
        "brand": {
          "@type": "Brand", 
          "name": "Truffles Macedonia"
        },
        "manufacturer": {
          "@id": "https://trufflesmacedonia.com/#business"
        },
        "category": "Pets",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "1",
          "bestRating": "5",
          "worstRating": "1"
        }
      });
    }

    // Remove existing structured data
    const existingStructuredData = document.querySelector('script[type="application/ld+json"][data-seo="true"]');
    if (existingStructuredData) {
      existingStructuredData.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'true');
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const seoElements = document.querySelectorAll('[data-seo="true"]');
      seoElements.forEach(element => element.remove());
    };
  }, [title, description, keywords, canonicalUrl, ogImage, articlePublishedTime, articleModifiedTime, dogName]);

  return null;
}
