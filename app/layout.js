import './globals.css';
import { Hind } from 'next/font/google';

const hind = Hind({ subsets: ['latin', 'devanagari'], weight: ['400', '600', '700'], display: 'swap' });
const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata = {
  metadataBase: new URL(site),
  title: { default: 'Exam Form Toolkit: photo aur signature exact KB mein', template: '%s | Exam Form Toolkit' },
  description: 'SSC, UPSC, Railway, IBPS, NEET aur sabhi exam forms ke liye photo aur signature ko exact KB aur pixel mein resize karo. Free, browser mein.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className={hind.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
