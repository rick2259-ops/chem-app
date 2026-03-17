import { Mechanism } from '@/types/mechanism';

export const oxymercurationMechanism: Mechanism = {
  id: 'oxymercuration',
  name: 'Oxymercuration-Demercuration',
  courseId: 'CHEM008B',
  topicId: 'alkene-addition',
  reactionType: 'addition',
  overview:
    'Oxymercuration-demercuration converts an alkene to a Markovnikov alcohol with anti stereochemistry. Step 1 (oxymercuration): Hg(OAc)2 in aqueous THF — the mercurinium ion forms (like a bromonium ion), and water attacks from the anti face at the more substituted carbon (Markovnikov). Step 2 (demercuration): NaBH4 replaces Hg with H. Net result: Markovnikov, anti addition of H and OH.',
  steps: [
    {
      stepNumber: 1,
      title: 'Mercurinium Ion Formation',
      explanation:
        'Hg(OAc)2 (mercuric acetate) reacts with the alkene pi bond. The electrophilic mercury bridges the two alkene carbons to form a 3-membered mercurinium ion intermediate — analogous to the bromonium ion in bromination. This bridged, cyclic intermediate prevents rotation and sets up the stereospecific anti addition. The more substituted carbon carries more positive charge in the mercurinium ion (like a Markovnikov carbocation).',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'c1', element: 'C', x: 300, y: 160, highlight: 'attack' },
          { id: 'c2', element: 'C', x: 460, y: 160, highlight: 'none' },
          { id: 'hg', element: 'Hg⁺', x: 380, y: 260, highlight: 'attack' },
          { id: 'h1', element: 'H', x: 260, y: 90, highlight: 'none' },
          { id: 'h2', element: 'H', x: 220, y: 180, highlight: 'none' },
          { id: 'r1', element: 'R', x: 520, y: 90, highlight: 'none' },
          { id: 'r2', element: 'R', x: 520, y: 230, highlight: 'none' },
          { id: 'oac', element: 'OAc', x: 560, y: 280, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-c1c2', fromAtomId: 'c1', toAtomId: 'c2', order: 2 },
          { id: 'b-c1h1', fromAtomId: 'c1', toAtomId: 'h1', order: 1 },
          { id: 'b-c1h2', fromAtomId: 'c1', toAtomId: 'h2', order: 1 },
          { id: 'b-c2r1', fromAtomId: 'c2', toAtomId: 'r1', order: 1 },
          { id: 'b-c2r2', fromAtomId: 'c2', toAtomId: 'r2', order: 1 },
          { id: 'b-c1hg', fromAtomId: 'c1', toAtomId: 'hg', order: 1, isForming: true },
          { id: 'b-c2hg', fromAtomId: 'c2', toAtomId: 'hg', order: 1, isForming: true },
        ],
        arrows: [
          { id: 'arr-pi', fromX: 380, fromY: 160, toX: 380, toY: 250, controlX: 360, controlY: 210, arrowType: 'full', color: '#2563eb' },
        ],
        labels: [
          { id: 'lbl-hg2', x: 490, y: 300, text: 'Hg(OAc)₂', color: '#ca8a04', fontSize: 14 },
          { id: 'lbl-merc', x: 250, y: 40, text: 'Mercurinium Ion (3-membered bridge)', color: '#ca8a04', fontSize: 15 },
          { id: 'lbl-pos', x: 450, y: 175, text: 'δ+', color: '#dc2626', fontSize: 15 },
          { id: 'lbl-step', x: 30, y: 288, text: 'Step 1: Hg²⁺ forms bridged mercurinium ion — analogous to bromonium ion', color: '#374151', fontSize: 12 },
        ],
      },
      keyPoints: [
        'Hg(OAc)2 acts as an electrophile, attacking the pi bond',
        'Bridged mercurinium ion forms — 3-membered ring like bromonium ion',
        'No free carbocation intermediate — prevents rearrangements',
        'More substituted carbon bears more partial positive charge (Markovnikov-like)',
        'The bridged intermediate prevents rotation — sets up stereospecific anti addition',
      ],
    },
    {
      stepNumber: 2,
      title: 'Water Attacks Anti at More Substituted Carbon (Markovnikov)',
      explanation:
        'Water (nucleophile) attacks the more substituted carbon of the mercurinium ion from the ANTI face (opposite to Hg bridge). This anti attack is like the bromide anti attack on a bromonium ion. Markovnikov selectivity: water attacks the carbon that can best stabilize the partial positive charge — the more substituted carbon. The OH ends up at the more substituted carbon (Markovnikov). A proton is then lost to give the product.',
      svgScene: {
        viewBox: '0 0 800 300',
        atoms: [
          { id: 'c1', element: 'C', x: 300, y: 160, highlight: 'none' },
          { id: 'c2', element: 'C', x: 460, y: 160, highlight: 'attack' },
          { id: 'hg', element: 'HgOAc', x: 380, y: 260, highlight: 'none' },
          { id: 'h1', element: 'H', x: 260, y: 90, highlight: 'none' },
          { id: 'h2', element: 'H', x: 220, y: 180, highlight: 'none' },
          { id: 'r1', element: 'R', x: 520, y: 90, highlight: 'none' },
          { id: 'r2', element: 'R', x: 520, y: 230, highlight: 'none' },
          { id: 'water', element: 'H₂O', x: 600, y: 60, highlight: 'attack' },
        ],
        bonds: [
          { id: 'b-c1c2', fromAtomId: 'c1', toAtomId: 'c2', order: 1 },
          { id: 'b-c1h1', fromAtomId: 'c1', toAtomId: 'h1', order: 1 },
          { id: 'b-c1h2', fromAtomId: 'c1', toAtomId: 'h2', order: 1 },
          { id: 'b-c2r1', fromAtomId: 'c2', toAtomId: 'r1', order: 1 },
          { id: 'b-c2r2', fromAtomId: 'c2', toAtomId: 'r2', order: 1 },
          { id: 'b-c1hg', fromAtomId: 'c1', toAtomId: 'hg', order: 1 },
          { id: 'b-oh', fromAtomId: 'c2', toAtomId: 'water', order: 1, isForming: true },
        ],
        arrows: [
          { id: 'arr-water', fromX: 580, fromY: 80, toX: 500, toY: 130, controlX: 550, controlY: 100, arrowType: 'full', color: '#dc2626' },
        ],
        labels: [
          { id: 'lbl-anti', x: 560, y: 50, text: 'Anti attack (top face)', color: '#dc2626', fontSize: 13 },
          { id: 'lbl-mark', x: 380, y: 40, text: 'OH → more substituted C (Markovnikov)', color: '#16a34a', fontSize: 13 },
          { id: 'lbl-hgc1', x: 230, y: 260, text: 'Hg stays at less substituted C', color: '#6b7280', fontSize: 12 },
          { id: 'lbl-step', x: 30, y: 288, text: 'Step 2: H₂O attacks anti at more substituted C → Markovnikov + anti addition of OH', color: '#374151', fontSize: 12 },
        ],
      },
      keyPoints: [
        'Water attacks from the anti face (opposite to Hg bridge)',
        'Nucleophile (H2O) attacks the more substituted carbon — Markovnikov selectivity',
        'Anti addition: OH and HgOAc are trans to each other on the product',
        'After proton loss: beta-hydroxy organomercury compound formed',
        'More substituted carbon gets OH; less substituted carbon retains HgOAc',
      ],
    },
    {
      stepNumber: 3,
      title: 'Demercuration: NaBH4 Replaces Hg with H',
      explanation:
        'The beta-hydroxy organomercury compound is treated with NaBH4 (sodium borohydride) — a mild hydride reducing agent. NaBH4 delivers H⁻ to the C-Hg bond, replacing Hg with H. Importantly, this step proceeds with LOSS OF STEREOCHEMISTRY — the demercuration step is not stereospecific (it occurs via a radical mechanism with no control). The mercury is released as Hg(0). The net reaction: Markovnikov OH, but overall no predictable stereo because the demercuration is non-stereospecific.',
      svgScene: {
        viewBox: '0 0 800 280',
        atoms: [
          { id: 'c1', element: 'C', x: 300, y: 150, highlight: 'none' },
          { id: 'c2', element: 'C', x: 460, y: 150, highlight: 'none' },
          { id: 'oh', element: 'OH', x: 460, y: 240, highlight: 'none' },
          { id: 'h1', element: 'H', x: 260, y: 80, highlight: 'none' },
          { id: 'h2', element: 'H', x: 220, y: 170, highlight: 'none' },
          { id: 'r1', element: 'R', x: 530, y: 80, highlight: 'none' },
          { id: 'r2', element: 'R', x: 530, y: 220, highlight: 'none' },
          { id: 'hnew', element: 'H', x: 300, y: 240, highlight: 'forming' },
          { id: 'hg0', element: 'Hg⁰', x: 640, y: 200, highlight: 'leaving' },
          { id: 'nabh4', element: 'NaBH₄', x: 130, y: 230, highlight: 'attack' },
        ],
        bonds: [
          { id: 'b-c1c2', fromAtomId: 'c1', toAtomId: 'c2', order: 1 },
          { id: 'b-c1h1', fromAtomId: 'c1', toAtomId: 'h1', order: 1 },
          { id: 'b-c1h2', fromAtomId: 'c1', toAtomId: 'h2', order: 1 },
          { id: 'b-c2r1', fromAtomId: 'c2', toAtomId: 'r1', order: 1 },
          { id: 'b-c2r2', fromAtomId: 'c2', toAtomId: 'r2', order: 1 },
          { id: 'b-c2oh', fromAtomId: 'c2', toAtomId: 'oh', order: 1 },
          { id: 'b-c1h', fromAtomId: 'c1', toAtomId: 'hnew', order: 1, isForming: true },
        ],
        arrows: [
          { id: 'arr-h', fromX: 190, fromY: 225, toX: 280, toY: 200, controlX: 230, controlY: 210, arrowType: 'full', color: '#2563eb' },
        ],
        labels: [
          { id: 'lbl-prod', x: 250, y: 40, text: 'Markovnikov Alcohol Product', color: '#16a34a', fontSize: 16 },
          { id: 'lbl-hout', x: 600, y: 180, text: '+ Hg⁰ (released)', color: '#6b7280', fontSize: 13 },
          { id: 'lbl-stereo', x: 300, y: 270, text: 'Demercuration: non-stereospecific (racemic at C1)', color: '#9333ea', fontSize: 12 },
          { id: 'lbl-step', x: 30, y: 15, text: 'Step 3: NaBH₄ replaces HgOAc with H (non-stereospecific)', color: '#374151', fontSize: 12 },
        ],
      },
      keyPoints: [
        'NaBH4 delivers H⁻ to the C-Hg bond via a radical/ionic mechanism',
        'Hg is released as Hg(0) — by-product',
        'Demercuration is NOT stereospecific — racemization possible at this carbon',
        'Overall: Markovnikov OH, but no stereocontrol (unlike hydroboration which is syn)',
        'Net reaction: H2O and H add across alkene, OH at more substituted C',
      ],
    },
    {
      stepNumber: 4,
      title: 'Product Comparison: Markovnikov vs Anti-Markovnikov Alcohols',
      explanation:
        'Oxymercuration-demercuration gives the Markovnikov alcohol (OH at more substituted carbon) without rearrangements, under mild conditions. This complements hydroboration-oxidation (anti-Markovnikov, syn) and acid-catalyzed hydration (Markovnikov, but with possible rearrangements). Choose oxymercuration when you need Markovnikov alcohol without carbocation rearrangements. Choose hydroboration when you need anti-Markovnikov alcohol.',
      svgScene: {
        viewBox: '0 0 800 280',
        atoms: [
          { id: 'alk-c1', element: 'CH₂', x: 150, y: 140, highlight: 'none' },
          { id: 'alk-c2', element: 'CR₂', x: 300, y: 140, highlight: 'none' },
          { id: 'prod1-c1', element: 'CH₃', x: 480, y: 100, highlight: 'none' },
          { id: 'prod1-c2', element: 'CR₂', x: 620, y: 100, highlight: 'none' },
          { id: 'prod1-oh', element: 'OH', x: 620, y: 180, highlight: 'forming' },
          { id: 'prod2-c1', element: 'CH₂', x: 480, y: 220, highlight: 'none' },
          { id: 'prod2-oh', element: 'OH', x: 480, y: 170, highlight: 'none' },
          { id: 'prod2-c2', element: 'CHR₂', x: 620, y: 220, highlight: 'none' },
        ],
        bonds: [
          { id: 'b-alk', fromAtomId: 'alk-c1', toAtomId: 'alk-c2', order: 2 },
          { id: 'b-p1c', fromAtomId: 'prod1-c1', toAtomId: 'prod1-c2', order: 1 },
          { id: 'b-p1oh', fromAtomId: 'prod1-c2', toAtomId: 'prod1-oh', order: 1 },
          { id: 'b-p2c', fromAtomId: 'prod2-c1', toAtomId: 'prod2-c2', order: 1 },
          { id: 'b-p2oh', fromAtomId: 'prod2-c1', toAtomId: 'prod2-oh', order: 1 },
        ],
        arrows: [
          { id: 'arr-oxy', fromX: 330, fromY: 125, toX: 460, toY: 105, controlX: 400, controlY: 90, arrowType: 'full', color: '#ca8a04' },
          { id: 'arr-hyb', fromX: 330, fromY: 155, toX: 460, toY: 215, controlX: 400, controlY: 200, arrowType: 'full', color: '#2563eb' },
        ],
        labels: [
          { id: 'lbl-oxy-lab', x: 350, y: 72, text: 'Hg(OAc)₂/H₂O then NaBH₄ →', color: '#ca8a04', fontSize: 12 },
          { id: 'lbl-mark', x: 590, y: 195, text: '← Markovnikov', color: '#ca8a04', fontSize: 12 },
          { id: 'lbl-hyb-lab', x: 330, y: 240, text: '(1) BH₃ (2) H₂O₂/NaOH →', color: '#2563eb', fontSize: 12 },
          { id: 'lbl-anti', x: 380, y: 155, text: '← Anti-Markovnikov', color: '#2563eb', fontSize: 12 },
          { id: 'lbl-alkene', x: 120, y: 110, text: 'Alkene', color: '#374151', fontSize: 14 },
        ],
      },
      keyPoints: [
        'Oxymercuration: Markovnikov OH, mild conditions, no rearrangements',
        'Hydroboration: anti-Markovnikov OH, syn addition, retention of stereochemistry',
        'Acid hydration (H3O+): Markovnikov, but carbocation rearrangements possible',
        'Use oxymercuration when rearrangements would be a problem for acid hydration',
        'Mechanism summary: mercurinium ion → anti attack of H2O → NaBH4 demercuration',
      ],
    },
  ],
};
