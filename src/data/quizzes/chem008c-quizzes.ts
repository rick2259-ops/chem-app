import { Question } from '@/types/quiz';

export const chem008cQuestions: Question[] = [
  // Aromatic Chemistry
  {
    id: 'q008c-001',
    topicId: 'aromatic-chemistry',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 1,
    prompt: "Which of the following compounds is aromatic according to Hückel's rule?",
    options: [
      'Cyclobutadiene (4 pi electrons)',
      'Cyclopentadiene (4 pi electrons)',
      'Benzene (6 pi electrons)',
      'Cyclooctatetraene (8 pi electrons)'
    ],
    correctIndex: 2,
    explanation: "Hückel's rule: aromatic if (1) cyclic, (2) planar, (3) fully conjugated, (4) has 4n+2 pi electrons (n = 0,1,2,...). 6 pi electrons: 4(1)+2 = 6, so n=1 → aromatic. Cyclobutadiene (4 pi electrons = 4n, n=1) is antiaromatic. Cyclopentadiene is not fully conjugated (has one sp3 CH2). Cyclooctatetraene (8 pi electrons = 4n, n=2) is antiaromatic but actually non-planar (tub-shaped) → non-aromatic.",
    tags: ['aromatic'],
  },
  {
    id: 'q008c-002',
    topicId: 'aromatic-chemistry',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 2,
    prompt: 'When toluene (methylbenzene) undergoes nitration with HNO3/H2SO4, where does the nitro group predominantly attach?',
    options: [
      'Meta position (50% meta)',
      'Ortho and para positions (major products)',
      'Only para position',
      'Only ortho position'
    ],
    correctIndex: 1,
    explanation: "The methyl group is an ortho/para director and ring activator. It donates electron density to the ring through hyperconjugation and induction, stabilizing the arenium ion intermediate when the electrophile attacks ortho or para to the methyl group. The product mixture is approximately 58% ortho, 4% meta, and 38% para. Para is less than ortho in total yield but there are two ortho positions and only one para position, so para is actually the major product per position.",
    tags: ['aromatic'],
  },
  {
    id: 'q008c-003',
    topicId: 'aromatic-chemistry',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 2,
    prompt: 'Which substituent is a META-directing group in EAS reactions?',
    options: [
      '-OCH3 (methoxy group)',
      '-OH (hydroxyl group)',
      '-NO2 (nitro group)',
      '-CH3 (methyl group)'
    ],
    correctIndex: 2,
    explanation: 'The nitro group (-NO2) is a meta director because it is a strong electron-withdrawing group (EWG) via both resonance and induction. When NO2⁺ attacks ortho or para to a -NO2 group, the arenium ion intermediate has a resonance structure placing positive charge directly on the carbon bearing -NO2 (which is very unfavorable — EWG destabilizes adjacent + charge). Meta attack avoids this destabilization. -OCH3, -OH, and -CH3 are all ortho/para directors.',
    tags: ['aromatic'],
  },
  {
    id: 'q008c-004',
    topicId: 'aromatic-chemistry',
    courseId: 'CHEM008C',
    type: 'short-answer',
    difficulty: 3,
    prompt: 'Explain why aniline (PhNH2) is a more reactive substrate for EAS than benzene, while nitrobenzene (PhNO2) is less reactive. Use resonance arguments.',
    correctAnswer: "Aniline: the nitrogen lone pair is donated into the benzene ring by resonance (N lone pair → pi system), creating electron density at ortho and para positions (resonance structures show negative charge at these positions). This makes the ring more electron-rich, better stabilizing the arenium ion intermediate → faster EAS, ortho/para director, ring activator. Nitrobenzene: the nitro group withdraws electrons from the ring by resonance (positive charge placed on ring carbons in resonance structures) AND by induction. This makes the ring electron-poor, destabilizing the arenium ion → slower EAS, meta director, ring deactivator. Key: EDG → activate ring + ortho/para director; EWG → deactivate ring + meta director.",
    explanation: 'Aniline has +M (mesomeric electron donation); NO2 has -M (mesomeric electron withdrawal). These effects propagate to specific ring positions and control both rate and regiochemistry.',
    tags: ['aromatic'],
  },

  // Amines
  {
    id: 'q008c-005',
    topicId: 'amines',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 2,
    prompt: 'Which amine is the MOST basic (highest pKa of conjugate acid)?',
    options: [
      'Aniline (PhNH2, pKa of PhNH3⁺ ≈ 4.6)',
      'Pyridine (pKa of PyH⁺ ≈ 5.3)',
      'Methylamine (CH3NH2, pKa of CH3NH3⁺ ≈ 10.6)',
      'Acetamide (CH3CONH2, pKa ≈ 0.5)'
    ],
    correctIndex: 2,
    explanation: 'Higher pKa of the conjugate acid = stronger base. Methylamine (pKa ~10.6) is the strongest base here. Aniline (pKa ~4.6) is a weak base because the lone pair on N is delocalized into the aromatic ring (resonance), reducing its availability for protonation. Pyridine (pKa ~5.3) is weakly basic — nitrogen is sp2 hybridized (lone pair in sp2 orbital, perpendicular to ring pi system, not delocalized). Acetamide is barely basic (pKa ~0.5) — amide resonance strongly delocalizes the lone pair onto oxygen.',
    tags: ['functional-groups'],
  },
  {
    id: 'q008c-006',
    topicId: 'amines',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 2,
    prompt: 'Which reagent sequence would convert aniline (PhNH2) to fluorobenzene (PhF)?',
    options: [
      'HF directly',
      'NaNO2/HCl at 0°C, then HBF4, then heat (Balz-Schiemann reaction)',
      'F2/FeCl3',
      'NaF/Cu catalyst'
    ],
    correctIndex: 1,
    explanation: 'The Balz-Schiemann reaction converts aryl amines to aryl fluorides: Step 1: diazotization with NaNO2/HCl at 0°C → diazonium chloride (ArN2⁺Cl⁻). Step 2: treat with HBF4 → diazonium tetrafluoroborate (ArN2⁺BF4⁻). Step 3: dry thermal decomposition → ArF + N2 + BF3. Direct fluorination (F2) is too reactive. HF alone does not work. Sandmeyer conditions (CuX) work for Cl, Br, CN but not F.',
    tags: ['aromatic', 'functional-groups'],
  },

  // Carbohydrates
  {
    id: 'q008c-007',
    topicId: 'carbohydrates',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 1,
    prompt: 'In the Haworth projection of beta-D-glucopyranose, where is the OH group at C1 (the anomeric carbon)?',
    options: [
      'Below the ring plane (axial, like alpha)',
      'Above the ring plane (equatorial, like the other OH groups)',
      'There is no OH at C1 in the beta form',
      'Above the ring plane in Haworth, which corresponds to equatorial in the chair'
    ],
    correctIndex: 3,
    explanation: 'In beta-D-glucopyranose Haworth projection: the OH at C1 is drawn UP (above the ring plane) for the beta anomer (same side as the CH2OH at C5). In the chair conformation, this beta-OH at C1 is equatorial (more stable position). Alpha-D-glucose has OH at C1 pointing DOWN in Haworth (axial in chair). The beta form is thermodynamically more stable (~64% at equilibrium in water) because the C1-OH is equatorial.',
    tags: ['carbohydrates'],
  },
  {
    id: 'q008c-008',
    topicId: 'carbohydrates',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 2,
    prompt: 'Why can humans digest starch but NOT cellulose, even though both are glucose polymers?',
    options: [
      'Starch has more glucose units than cellulose',
      'Cellulose has higher molecular weight, making it too large to be absorbed',
      'Starch has alpha-1,4-glycosidic bonds; cellulose has beta-1,4-glycosidic bonds. Human enzymes only cleave alpha linkages',
      'Cellulose contains a different type of sugar (galactose instead of glucose)'
    ],
    correctIndex: 2,
    explanation: 'The critical difference is the stereochemistry of the glycosidic bond. Starch (amylose/amylopectin) has alpha-1,4-glycosidic bonds (C1-OH was alpha, equatorial). Human amylase and pancreatic enzymes are specifically shaped to cleave alpha-1,4 (and alpha-1,6 in glycogen) linkages. Cellulose has beta-1,4-glycosidic bonds, which create a straight, rigid polymer. Humans lack cellulase (beta-glucosidase). Ruminants have symbiotic bacteria with cellulase.',
    tags: ['carbohydrates'],
  },
  {
    id: 'q008c-009',
    topicId: 'carbohydrates',
    courseId: 'CHEM008C',
    type: 'short-answer',
    difficulty: 3,
    prompt: 'Explain what mutarotation is and why it occurs for glucose but not for methyl glucoside. Include the mechanism.',
    correctAnswer: "Mutarotation is the spontaneous change in optical rotation of a sugar solution over time as the alpha and beta anomers interconvert until equilibrium is reached (~36% alpha, 64% beta for D-glucose in water). Mechanism: the anomeric OH at C1 is hemiacetal-like and can ring-open in aqueous solution to give the open-chain aldehyde form, which can then re-close from either face. Alpha-D-glucose: [α] = +112.2°; beta-D-glucose: [α] = +18.7°; equilibrium mixture: [α] = +52.7°. Methyl glucoside is a full acetal (C1-OCH3, formed from hemiacetal + MeOH/H⁺). Full acetals require acid and water to hydrolyze and do not ring-open under neutral aqueous conditions. Therefore methyl glucoside cannot mutarotate.",
    explanation: 'Mutarotation = hemiacetal ring opening and re-closure, equilibrating alpha and beta anomers. Full acetals (glycosides) are stable to ring opening under neutral conditions — they require acid hydrolysis.',
    tags: ['carbohydrates'],
  },

  // Amino Acids & Proteins
  {
    id: 'q008c-010',
    topicId: 'amino-acids-proteins',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 1,
    prompt: 'At physiological pH (~7.4), what is the predominant form of an amino acid with pKa1 = 2.2 and pKa2 = 9.4?',
    options: [
      'Fully protonated: +H3N-CHR-COOH',
      'Zwitterion: +H3N-CHR-COO⁻',
      'Fully deprotonated: H2N-CHR-COO⁻',
      'Uncharged: H2N-CHR-COOH'
    ],
    correctIndex: 1,
    explanation: 'At pH 7.4, which is between pKa1 (2.2) and pKa2 (9.4): the carboxylic acid has been deprotonated (pH > pKa1 = 2.2) → -COO⁻. The amine is protonated (pH < pKa2 = 9.4) → -NH3⁺. This gives the zwitterion (+H3N-CHR-COO⁻) as the predominant species at physiological pH. The isoelectric point (pI) = (2.2 + 9.4)/2 = 5.8.',
    tags: ['amino-acids'],
  },
  {
    id: 'q008c-011',
    topicId: 'amino-acids-proteins',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 2,
    prompt: 'Which amino acid has an R group (side chain) that can form a disulfide bond with another amino acid of the same type?',
    options: ['Serine (Ser, S)', 'Cysteine (Cys, C)', 'Methionine (Met, M)', 'Threonine (Thr, T)'],
    correctIndex: 1,
    explanation: 'Cysteine has a thiol (-SH) side chain. Two cysteine residues can be oxidized to form a disulfide bond (Cys-S-S-Cys). Disulfide bonds are important for tertiary and quaternary protein structure stabilization. Serine and threonine have hydroxyl groups (-OH), not thiols. Methionine has a thioether (-SCH3), which cannot form disulfide bonds because the S is not a free thiol.',
    tags: ['amino-acids'],
  },
  {
    id: 'q008c-012',
    topicId: 'amino-acids-proteins',
    courseId: 'CHEM008C',
    type: 'short-answer',
    difficulty: 3,
    prompt: 'Describe the four levels of protein structure. For each level, describe the type of interactions that maintain it.',
    correctAnswer: '1° (Primary): The sequence of amino acids linked by covalent peptide bonds. Maintained by peptide (amide) bonds and disulfide bonds. 2° (Secondary): Local regular structures — alpha-helix (stabilized by H-bonds between backbone NH and C=O 4 residues apart, same chain) and beta-sheet (H-bonds between parallel or antiparallel strands). 3° (Tertiary): Overall 3D folding of a single polypeptide chain. Maintained by: hydrophobic interactions (nonpolar side chains buried in core), H-bonds between side chains, electrostatic/salt bridges (ionic interactions between charged side chains), disulfide bonds (covalent, between Cys residues). 4° (Quaternary): Assembly of multiple polypeptide chains (subunits). Same noncovalent forces as tertiary, plus disulfide bonds between subunits. Example: hemoglobin (4 subunits).',
    explanation: 'Primary = peptide bonds (sequence). Secondary = backbone H-bonds (helix, sheet). Tertiary = side chain interactions (hydrophobic, H-bond, ionic, disulfide). Quaternary = inter-subunit noncovalent interactions.',
    tags: ['amino-acids'],
  },

  // Lipids
  {
    id: 'q008c-013',
    topicId: 'lipids',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 2,
    prompt: 'Which of the following statements about saturated vs. unsaturated fatty acids is CORRECT?',
    options: [
      'Saturated fatty acids have lower melting points because the straight chains pack loosely',
      'Unsaturated fatty acids have higher melting points due to the rigidity of double bonds',
      'Unsaturated fatty acids have lower melting points because cis-double bonds introduce kinks that prevent tight packing',
      'Saturated and unsaturated fatty acids have the same melting points if they have the same carbon chain length'
    ],
    correctIndex: 2,
    explanation: 'Cis-double bonds in unsaturated fatty acids introduce kinks (bends) in the carbon chain. These kinks prevent tight parallel packing of fatty acid chains, reducing van der Waals interactions. Less cohesion → lower melting point. Saturated fatty acids have all-trans zig-zag chains that pack tightly → stronger van der Waals forces → higher melting points. This is why butter (saturated) is solid at room temperature and vegetable oils (polyunsaturated) are liquid.',
    tags: ['functional-groups'],
  },

  // Diels-Alder
  {
    id: 'q008c-014',
    topicId: 'diels-alder',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 2,
    prompt: 'Which diene can undergo a Diels-Alder reaction readily?',
    options: [
      '1,3-butadiene in s-trans conformation only',
      'Cyclopentadiene (locked s-cis)',
      '2-butene (an alkene, not a diene)',
      '1,2-propadiene (allene)'
    ],
    correctIndex: 1,
    explanation: "Cyclopentadiene has its diene locked in the s-cis conformation (the ring forces the two double bonds to be on the same side of the C2-C3 single bond). This makes cyclopentadiene extremely reactive in Diels-Alder reactions — it dimerizes on standing. 1,3-Butadiene can react in its s-cis rotamer but must rotate to get there. The s-trans conformation CANNOT react (C1 and C4 too far apart to bond to dienophile simultaneously). Allene and 2-butene are not dienes.",
    tags: ['addition', 'stereochemistry'],
  },
  {
    id: 'q008c-015',
    topicId: 'diels-alder',
    courseId: 'CHEM008C',
    type: 'multiple-choice',
    difficulty: 3,
    prompt: 'In the Diels-Alder reaction of cyclopentadiene with maleic anhydride (cis-butenedioic anhydride), what are the regiochemistry and stereochemistry of the product?',
    options: [
      'A bicyclic product with the anhydride substituents in the exo configuration',
      'A bicyclic product with the anhydride substituents in the endo configuration (kinetic product)',
      'A monocyclic cyclohexene with trans-substituents',
      'A monocyclic cyclohexene with cis-substituents'
    ],
    correctIndex: 1,
    explanation: "Cyclopentadiene + maleic anhydride gives a bicyclic product (bicycle[2.2.1] system, norbornene skeleton). The endo rule: the anhydride substituents prefer the endo orientation (pointing toward the diene π system) in the transition state due to secondary orbital interactions (SOI). The two anhydride C=O groups point toward the diene in the endo TS. Maleic anhydride's two C=O groups were cis — syn addition preserves this relationship — so both C=O groups are on the same face in the product (cis/endo). The endo product is the kinetic product.",
    tags: ['addition', 'stereochemistry'],
  },
  {
    id: 'q008c-016',
    topicId: 'diels-alder',
    courseId: 'CHEM008C',
    type: 'short-answer',
    difficulty: 3,
    prompt: 'Explain why the Diels-Alder reaction is classified as a pericyclic reaction and why it is thermally allowed. What would happen if you tried to run it photochemically?',
    correctAnswer: "The Diels-Alder is pericyclic — it proceeds through a cyclic transition state where bond breaking and forming occur simultaneously (concerted) with no ionic or radical intermediates. It is a [4+2] cycloaddition: 4 electrons from the diene + 2 electrons from the dienophile. Orbital symmetry analysis (Woodward-Hoffmann rules): for thermal [4s+2s] cycloaddition, the HOMO of the diene (2 nodes) and LUMO of the dienophile overlap with correct symmetry (bonding interaction at both ends simultaneously) — thermally ALLOWED. Photochemically: UV excites diene to its first excited state. The photochemically excited HOMO now has different symmetry — the [4s+2s] reaction becomes thermally forbidden photochemically. A photochemical [2+2] cycloaddition (giving a 4-membered ring) would instead be allowed.",
    explanation: 'Pericyclic = cyclic TS, concerted, no intermediates. Thermal [4+2] allowed (Woodward-Hoffmann). Photochemical [4+2] forbidden; thermal [2+2] forbidden; photochemical [2+2] allowed.',
    tags: ['addition'],
  },
];
