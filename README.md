# Exam Form Toolkit

Photo aur signature ko exact KB/pixel mein resize karne wali site (Next.js App Router, JavaScript).
Image processing poori browser mein hoti hai, isliye koi server ya upload nahi.

## Chalane ke liye
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Vercel par deploy
1. Is folder ko GitHub repo mein push karo.
2. Vercel mein "Add New Project" se repo import karo (settings default rehne do).
3. Domain lene ke baad Vercel mein env variable daalo: `NEXT_PUBLIC_SITE_URL=https://tumhara-domain.com`
   (sitemap, robots aur canonical links isi se bante hain).

## Launch se pehle (zaroori)
- `lib/exams.js` ki har limit official notification se verify karo. Ye aam taur par chalne wali values hain.
- Har exam page par apna guide text jodo (kaise photo kheencho, common galtiyan). Zyada unique text = behtar SEO.
- Google Search Console mein sitemap (`/sitemap.xml`) submit karo.

## Aage ke kaam
- PDF compress aur image-to-PDF tool
- Zyada exams aur state-wise pages
- AdSense, traffic aane ke baad
