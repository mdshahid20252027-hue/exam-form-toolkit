const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site}/sitemap.xml` };
}
