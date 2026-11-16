// Limits are commonly cited values: VERIFY each one against the official notification before launch.
// Format: [maxKB, minKB, widthPx, heightPx]. Width/height 0 = "as per notification" (auto resize).
export const GROUPS = {
  central: 'Central naukri',
  bank: 'Banking',
  ent: 'Entrance',
  state: 'State aur dusre exam',
  doc: 'Documents',
};

export const EXAMS = [
  { slug: 'ssc', label: 'SSC (CGL, CHSL, MTS, GD)', group: 'central', photo: [50, 20, 100, 120], sign: [20, 10, 140, 60] },
  { slug: 'upsc', label: 'UPSC (Civil Services, NDA, CDS)', group: 'central', photo: [50, 20, 0, 0], sign: [50, 20, 0, 0] },
  { slug: 'rrb', label: 'Railway RRB (NTPC, Group D, ALP, JE)', group: 'central', photo: [50, 20, 0, 0], sign: [20, 10, 0, 0] },
  { slug: 'defence', label: 'Defence (Agniveer, AFCAT)', group: 'central', photo: [50, 20, 0, 0], sign: [20, 10, 0, 0] },
  { slug: 'ibps', label: 'IBPS (PO, Clerk, RRB, SO)', group: 'bank', photo: [50, 20, 200, 230], sign: [20, 10, 140, 60] },
  { slug: 'sbi', label: 'SBI (PO, Clerk)', group: 'bank', photo: [50, 20, 200, 230], sign: [20, 10, 140, 60] },
  { slug: 'rbi', label: 'RBI (Grade B, Assistant)', group: 'bank', photo: [50, 20, 200, 230], sign: [50, 10, 140, 60] },
  { slug: 'neet-jee', label: 'NEET, JEE Main, CUET (NTA)', group: 'ent', photo: [200, 10, 0, 0], sign: [30, 4, 0, 0] },
  { slug: 'gate-cat', label: 'GATE, CAT aur dusre entrance', group: 'ent', photo: [100, 10, 0, 0], sign: [50, 5, 0, 0] },
  { slug: 'state-psc', label: 'State PSC (BPSC, UPPSC, MPPSC)', group: 'state', photo: [50, 20, 0, 0], sign: [20, 10, 0, 0] },
  { slug: 'police', label: 'Police bharti (state)', group: 'state', photo: [50, 20, 0, 0], sign: [20, 10, 0, 0] },
  { slug: 'teacher', label: 'Teacher exam (CTET, TET, DSSSB)', group: 'state', photo: [50, 20, 0, 0], sign: [20, 10, 0, 0] },
  { slug: 'irctc', label: 'IRCTC profile photo', group: 'doc', photo: [50, 10, 0, 0], sign: [20, 5, 0, 0] },
  { slug: 'aadhaar', label: 'Aadhaar update', group: 'doc', photo: [50, 10, 0, 0], sign: [20, 5, 0, 0] },
  { slug: 'voter-id', label: 'Voter ID (Form 6, 8)', group: 'doc', photo: [50, 10, 0, 0], sign: [20, 5, 0, 0] },
  { slug: 'pan-passport', label: 'PAN ya Passport', group: 'doc', photo: [100, 10, 0, 0], sign: [50, 5, 0, 0] },
];

export const CUSTOM = { photo: [100, 0, 0, 0], sign: [50, 0, 0, 0] };

export const bySlug = (s) => EXAMS.find((e) => e.slug === s);

export function specLine(s) {
  const kb = s[1] ? `${s[1]}–${s[0]} KB` : `Max ${s[0]} KB`;
  const px = s[2] && s[3] ? `${s[2]}×${s[3]} px` : 'pixel size notification ke hisaab se';
  return `${kb}, ${px}`;
}
