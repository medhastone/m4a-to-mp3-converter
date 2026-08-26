import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://m4atomp3converter.com'
  const locales = ['en', 'es', 'fr', 'hi', 'de', 'pt']
  
  const entries: MetadataRoute.Sitemap = []
  
  for (const locale of locales) {
    entries.push({
      url: `${domain}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: locales.reduce((acc, l) => {
          acc[l] = `${domain}/${l}`
          return acc
        }, {} as Record<string, string>)
      }
    })
  }

  return entries
}
