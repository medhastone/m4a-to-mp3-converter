'use client';
import { usePathname } from 'next/navigation';

export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  
  if (!pathname || pathname === '/' || pathname.match(/^\/[a-z]{2}$/)) {
    return null;
  }
  
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];
  const pathSegments = segments.slice(1);
  
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `https://m4atomp3converter.com/${locale}`
    }
  ];
  
  let currentPath = `/${locale}`;
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": segment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
      "item": `https://m4atomp3converter.com${currentPath}`
    });
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
