// Runs in the browser only: resize + JPEG-compress an image to a target KB range.
function draw(img, type, w, h, scale) {
  const c = document.createElement('canvas');
  const x = c.getContext('2d');
  let cw, ch;
  if (w && h) { cw = w; ch = h; }
  else {
    const m = Math.min(1, 900 / Math.max(img.width, img.height)) * scale;
    cw = Math.max(1, Math.round(img.width * m));
    ch = Math.max(1, Math.round(img.height * m));
  }
  c.width = cw; c.height = ch;
  x.fillStyle = '#fff'; x.fillRect(0, 0, cw, ch);
  x.imageSmoothingQuality = 'high';
  if (w && h) {
    // photo: crop to fill; signature: fit the whole signature
    const r = type === 'photo' ? Math.max(cw / img.width, ch / img.height) : Math.min(cw / img.width, ch / img.height);
    const dw = img.width * r, dh = img.height * r;
    x.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  } else {
    x.drawImage(img, 0, 0, cw, ch);
  }
  return c;
}

const toBlob = (c, q) => new Promise((res) => c.toBlob(res, 'image/jpeg', q));

async function encode(img, type, w, h, scale, maxB) {
  const c = draw(img, type, w, h, scale);
  const first = await toBlob(c, 0.92);
  if (first.size <= maxB) return { blob: first, ok: true, w: c.width, h: c.height };
  let lo = 0.03, hi = 0.9, best = null, low = null;
  for (let i = 0; i < 8; i++) {
    const q = (lo + hi) / 2;
    const t = await toBlob(c, q);
    if (t.size <= maxB) { best = t; lo = q; } else { low = t; hi = q; }
  }
  if (best) return { blob: best, ok: true, w: c.width, h: c.height };
  return { blob: low || first, ok: false, w: c.width, h: c.height };
}

export async function processImage(img, type, { maxKb, minKb, w, h }) {
  const maxB = maxKb * 1024;
  if (!(w && h)) { w = 0; h = 0; }
  const free = !(w && h);
  const scales = free ? [1, 0.8, 0.62, 0.48, 0.36, 0.26] : [1];
  let r = null;
  for (const s of scales) { r = await encode(img, type, w, h, s, maxB); if (r.ok) break; }
  if (r.ok && free && r.blob.size < minKb * 1024) {
    for (const s of [1.6, 2.4]) {
      const r2 = await encode(img, type, 0, 0, s, maxB);
      if (r2.ok && r2.blob.size >= minKb * 1024) { r = r2; break; }
    }
  }
  const status = !r.ok ? 'big' : r.blob.size < minKb * 1024 ? 'small' : 'ok';
  return { ...r, status };
}
