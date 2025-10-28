import type { MetadataRoute } from "next";
import { availableDogs } from "@/data/dogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://trufflesmacedonia.com";
  const today = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: today, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/our-dogs`, lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/available-puppies`, lastModified: today, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/gallery`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: today, changeFrequency: "yearly", priority: 0.6 },
  ];

  const dogPages: MetadataRoute.Sitemap = availableDogs.map((dog) => {
    const slug = dog.id ?? dog.name.toLowerCase().replace(/\s+/g, "-");
    return {
      url: `${baseUrl}/dog/${slug}`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    };
  });

  return [...routes, ...dogPages];
}
