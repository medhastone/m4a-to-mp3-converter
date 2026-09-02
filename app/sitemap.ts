import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://m4atomp3converter.com'
  const locales = ['en', 'es', 'fr', 'de', 'pt', 'ru']
  
  const routes = [
    { path: '', priority: 1.0 },
    { path: '/batch-converter', priority: 0.9 },
    { path: '/320kbps', priority: 0.9 },
    { path: '/client-side-safe', priority: 0.8 },
    { path: '/iphone-voice-memos', priority: 0.8 },
    { path: '/mac', priority: 0.8 },
    { path: '/m4a-to-mp3', priority: 0.9 },
    { path: '/privacy-policy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/windows', priority: 0.8 },
    { path: '/about', priority: 0.5 },
  ]
  
  const entries: MetadataRoute.Sitemap = []
  
  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${domain}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route.priority,
        alternates: {
          languages: locales.reduce((acc, l) => {
            acc[l] = `${domain}/${l}${route.path}`
            return acc
          }, {} as Record<string, string>)
        }
      })
    }
  }

  return entries
}
