import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://finmasteracademy.az/sitemap.xml',
    host: 'https://finmasteracademy.az',
  };
}
