import Link from 'next/link';
import Resizer from '../components/Resizer';
import { CUSTOM, EXAMS, GROUPS } from '../lib/exams';

export default function Home() {
  return (
    <>
      <h1>Photo aur signature, exact KB mein</h1>
      <p className="lead">Apna exam chuno, photo daalo, aur form ki limit ke andar file download karo. Photo aapke phone se bahar nahi jaati.</p>

      {Object.keys(GROUPS).map((g) => (
        <section key={g}>
          <h2>{GROUPS[g]}</h2>
          <ul className="links">
            {EXAMS.filter((e) => e.group === g).map((e) => (
              <li key={e.slug}><Link href={`/${e.slug}`}>{e.label}</Link></li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Apni limit khud daalo</h2>
      <Resizer photo={CUSTOM.photo} sign={CUSTOM.sign} />
    </>
  );
}
