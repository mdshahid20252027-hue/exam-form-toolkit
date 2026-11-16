'use client';
import { useEffect, useRef, useState } from 'react';
import { processImage } from '../lib/compress';

const toVals = (s) => ({ maxKb: String(s[0]), minKb: String(s[1]), w: String(s[2]), h: String(s[3]) });
const fmtSize = (n) => (n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.round(n / 1024) + ' KB');
const MSG = {
  ok: ['Taiyar hai. Limit ke andar hai.', 'ok'],
  small: ['File Min KB se chhoti hai. Bada photo chuno, ya Min KB form ke hisaab se check karo.', 'warn'],
  big: ['Limit tak nahi pahunchi. Width aur height ko 0 kar do, ya Max KB check karo.', 'warn'],
};

export default function Resizer({ photo, sign }) {
  const [type, setType] = useState('photo');
  const [vals, setVals] = useState(toVals(photo));
  const [tick, setTick] = useState(0);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');
  const imgRef = useRef(null);
  const urlRef = useRef(null);

  function pickType(t) {
    setType(t);
    setVals(toVals(t === 'photo' ? photo : sign));
  }
  const setField = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }));

  function onFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setErr('');
    const u = URL.createObjectURL(f);
    const im = new Image();
    im.onload = () => { URL.revokeObjectURL(u); im.origSize = f.size; imgRef.current = im; setTick((t) => t + 1); };
    im.onerror = () => { URL.revokeObjectURL(u); setErr('Ye image khul nahi payi. JPG ya PNG try karo.'); };
    im.src = u;
  }

  useEffect(() => {
    const img = imgRef.current;
    const maxKb = parseInt(vals.maxKb, 10) || 0;
    if (!img || maxKb < 1) return;
    let dead = false;
    const t = setTimeout(async () => {
      const r = await processImage(img, type, {
        maxKb,
        minKb: parseInt(vals.minKb, 10) || 0,
        w: parseInt(vals.w, 10) || 0,
        h: parseInt(vals.h, 10) || 0,
      });
      if (dead) return;
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = URL.createObjectURL(r.blob);
      setRes({ ...r, url: urlRef.current, orig: img.origSize });
    }, 250);
    return () => { dead = true; clearTimeout(t); };
  }, [tick, type, vals]);

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const msg = res ? MSG[res.status] : null;
  const fields = [['maxKb', 'Max KB'], ['minKb', 'Min KB'], ['w', 'Width px'], ['h', 'Height px']];

  return (
    <>
      <div className="card">
        <div className="seg" role="group" aria-label="File type">
          <button type="button" aria-pressed={type === 'photo'} onClick={() => pickType('photo')}>Photo</button>
          <button type="button" aria-pressed={type === 'sign'} onClick={() => pickType('sign')}>Signature</button>
        </div>
        <div className="specs">
          {fields.map(([k, label]) => (
            <div key={k}>
              <label htmlFor={'f-' + k}>{label}</label>
              <input id={'f-' + k} type="number" min="0" value={vals[k]} onChange={setField(k)} />
            </div>
          ))}
        </div>
        <p className="small">Ye aam taur par chalne wali limits hain. Har saal notification badalti hai, isliye apne form ki official notification se match karo aur zarurat ho to boxes badal do. Width aur height 0 ho to size apne aap ghataya jata hai.</p>
      </div>

      <label className="pick">
        <input type="file" accept="image/*" onChange={onFile} />
        <span>{type === 'photo' ? 'Photo chuno' : 'Signature chuno'}</span>
      </label>
      {err && <p className="chip warn">{err}</p>}

      {res && (
        <div className="card" aria-live="polite">
          <div className="pv"><img src={res.url} alt="Taiyar file ka preview" /></div>
          <p className="stat">{fmtSize(res.orig)} se {fmtSize(res.blob.size)} ({res.w}×{res.h} px)</p>
          <p className={'chip ' + msg[1]}>{msg[0]}</p>
          <a className="btn" href={res.url} download={type === 'photo' ? 'exam-photo.jpg' : 'exam-signature.jpg'}>Download karo</a>
        </div>
      )}
    </>
  );
}
