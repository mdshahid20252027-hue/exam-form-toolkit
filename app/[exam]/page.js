import Link from 'next/link';
import { notFound } from 'next/navigation';
import Resizer from '../../components/Resizer';
import { EXAMS, bySlug, specLine } from '../../lib/exams';

export const dynamicParams = false;

export function generateStaticParams() {
  return EXAMS.map((e) => ({ exam: e.slug }));
}

export function generateMetadata({ params }) {
  const e = bySlug(params.exam);
  if (!e) return {};
  return {
    title: `${e.label} photo aur signature size`,
    description: `${e.label} form ke liye photo aur signature ko exact KB aur pixel mein resize karo. Free, browser mein, koi upload nahi.`,
    alternates: { canonical: `/${e.slug}` },
  };
}

export default function ExamPage({ params }) {
  const e = bySlug(params.exam);
  if (!e) notFound();

  const faqs = [
    [`${e.label} mein photo kitne KB ki honi chahiye?`, `Aam taur par ${specLine(e.photo)}. Official notification se pakka kar lo, kyunki limit har saal badal sakti hai.`],
    [`${e.label} mein signature ka size kya hota hai?`, `Aam taur par ${specLine(e.sign)}. Signature ko safed kagaz par kale ya neele pen se karke saaf photo kheencho.`],
    ['Photo upload nahi ho rahi to kya karein?', 'Upar tool mein photo ya signature chuno, limit check karo aur Download karo. File JPG format mein banti hai, jo zyadatar portals maante hain.'],
  ];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <>
      <p><Link href="/">← Sab exams</Link></p>
      <h1>{e.label}: photo aur signature size</h1>
      <p className="lead">Photo ya signature chuno aur limit ke andar file download karo.</p>

      <Resizer photo={e.photo} sign={e.sign} />

      <h2>Limits (aam taur par)</h2>
      <table>
        <tbody>
          <tr><th scope="row">Photo</th><td>{specLine(e.photo)}</td></tr>
          <tr><th scope="row">Signature</th><td>{specLine(e.sign)}</td></tr>
        </tbody>
      </table>
      <p className="small">Apne exam ki official notification se ye limits zaroor match kar lo.</p>

      <h2>Kaise karein</h2>
      <ol>
        <li>Upar Photo ya Signature chuno.</li>
        <li>Apni file chuno. Tool size ghata kar limit ke andar le aata hai.</li>
        <li>Download karo aur form par upload karo.</li>
      </ol>

      <h2>Sawal-jawab</h2>
      {faqs.map(([q, a]) => (
        <details key={q}><summary>{q}</summary><p>{a}</p></details>
      ))}

      <h2>Dusre exam</h2>
      <ul className="links">
        {EXAMS.filter((x) => x.slug !== e.slug).map((x) => (
          <li key={x.slug}><Link href={`/${x.slug}`}>{x.label}</Link></li>
        ))}
      </ul>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
