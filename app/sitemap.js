import { EXAMS } from '../lib/exams';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default function sitemap() {
  return [{ url: site }, ...EXAMS.map((e) => ({ url: `${site}/${e.slug}` }))];
}
