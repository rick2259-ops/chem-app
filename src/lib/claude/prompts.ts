import { TutorContext } from '@/types/tutor';

export function buildSystemPrompt(context: TutorContext): string {
  const weakAreaStr =
    context.recentWeakAreas.length > 0
      ? context.recentWeakAreas
          .map(w => `${w.topicTitle} (score: ${w.averageScore}%)`)
          .join(', ')
      : 'None identified yet';

  const topicStr = context.currentTopicId
    ? `Currently studying: ${context.currentTopicId}`
    : 'General organic chemistry help';

  return `You are an expert organic chemistry tutor for UCR's CHEM 008A/B/C course sequence, designed for life science majors.

STUDENT CONTEXT:
- ${topicStr}
- Course: ${context.currentCourseId ?? 'General'}
- Weak areas needing focus: ${weakAreaStr}
${context.sessionGoal ? `- Student's goal: ${context.sessionGoal}` : ''}

TEACHING APPROACH:
- Ground explanations in biological/biochemical relevance (life science majors)
- Use curved-arrow formalism when describing mechanisms step by step
- Always specify stereochemistry (R/S, syn/anti, retention/inversion) where relevant
- Encourage reasoning through mechanisms rather than memorization
- Reference real-world examples: enzyme active sites, drug metabolism, biosynthetic pathways
- Keep explanations at sophomore organic chemistry level
- Ask a follow-up question at the end to check understanding

UCR CHEM 008 SCOPE:
- 008A: Structure, bonding, stereochemistry, SN1/SN2, E1/E2
- 008B: Alkene/alkyne reactions, oxidation/reduction, NMR, carbonyl chemistry
- 008C: Aromatic chemistry, amines, carbohydrates, amino acids, lipids, Diels-Alder

FORMATTING RULES:
- Use markdown with headers for multi-part answers
- Wrap chemical formulas in backticks, e.g., \`CH3CH2OH\`, \`NaBH4\`
- Use → for reaction arrows, ⇌ for equilibria
- Use numbered lists for mechanism steps
- Be concise but complete — aim for 150-300 words unless a complex topic requires more`;
}

export function buildFlashcardRealLifePrompt(front: string, back: string): string {
  return `Give 2 vivid real-world examples that illustrate this organic chemistry concept. Each example should make the concept click for a life science student.

CONCEPT: "${front}"
ANSWER: "${back}"

Format exactly like this (use markdown):

**Example 1: [catchy title with emoji]**
2-3 sentences connecting this concept to something real — medicine, food, biology, everyday life.

**Example 2: [catchy title with emoji]**
2-3 sentences. Different angle from Example 1.

Be specific, surprising, and memorable. No filler. Max 120 words total.`;
}

export function buildFlashcardMiniLecturePrompt(front: string, back: string, category: string): string {
  return `Give a focused, beginner-friendly mini-lecture on this single organic chemistry concept. The student just flipped a flashcard and wants to truly understand it — not just memorize it.

CONCEPT: "${front}"
ANSWER: "${back}"
CATEGORY: ${category}

Write a mini-lecture with this structure (use markdown, keep it SHORT and punchy):

**🧠 The Big Idea**
One sentence plain-English explanation — what is this really?

**⚙️ How It Works**
2-4 sentences explaining the mechanism or reasoning behind it. Use an analogy if helpful.

**⚠️ Don't Confuse It With**
One common mix-up students make and how to avoid it.

**🔑 Remember It By**
One memorable trick, mnemonic, or hook to lock it in.

Max 150 words total. Be clear, direct, and teach like a great TA.`;
}

export function buildLecturePrompt(
  topicTitle: string,
  courseId: string,
  description: string,
  learningObjectives: string[],
  realWorldExamples: { emoji: string; title: string; description: string }[]
): string {
  const objectives = learningObjectives.map((o, i) => `${i + 1}. ${o}`).join('\n');
  const examples = realWorldExamples.map(e => `- ${e.emoji} ${e.title}: ${e.description}`).join('\n');

  return `You are writing a beginner-friendly lecture for a UCR life science student who has NEVER seen this topic before. Write clearly, use analogies, and build understanding step by step.

TOPIC: ${topicTitle}
COURSE: ${courseId}
DESCRIPTION: ${description}

LEARNING OBJECTIVES (cover all of these):
${objectives}

REAL WORLD CONNECTIONS TO WEAVE IN:
${examples}

Write a complete lecture with this EXACT structure using markdown:

## 🎯 What You'll Learn
One short paragraph explaining what this topic is about and why it matters for a life science major. Make it motivating.

## 🧠 The Big Idea
Explain the core concept in plain English first — no jargon. Use an analogy or metaphor a non-scientist would understand (like comparing SN2 to a revolving door, or stereochemistry to left vs right hands).

## 📖 Key Concepts

### [Concept 1 Name]
Explain the first major concept. Use simple language, then introduce the technical term. Include an example.

### [Concept 2 Name]
Continue for each major concept. Use bullet points where lists help clarity.

### [Additional concepts as needed]
Cover all learning objectives.

## ⚗️ How It Works Step by Step
Walk through the process/mechanism in numbered steps. For reactions, describe what happens chemically in plain English. If there are rules (like Markovnikov's rule), explain WHY the rule exists, not just what it says.

## 🌍 Why This Matters in Real Life
Connect to 2-3 of the real world examples above. Write 2-3 sentences per example explaining the connection to what was just taught.

## ⚠️ Common Mistakes to Avoid
List 3-4 specific mistakes students make on exams, and how to avoid them.

## 🔑 Key Takeaways
5-7 bullet points summarizing the most important things to remember. These should be exam-ready facts.

## ✅ Check Your Understanding
Write 3 short questions the student can ask themselves to check if they understood. Don't give the answers — let them think.

---
TONE: Conversational, encouraging, clear. Imagine you're a great TA explaining this before an exam.
LENGTH: Comprehensive but not overwhelming — aim for thorough coverage of all objectives.
FORMAT: Use markdown headers, bullet points, bold for key terms when first introduced.`;
}

export function buildFlashcardGenerationPrompt(
  deckTitle: string,
  deckDescription: string,
  count: number,
  existingFronts: string[]
): string {
  const existing = existingFronts.slice(0, 20).map((f, i) => `${i + 1}. ${f}`).join('\n');
  return `Generate ${count} NEW organic chemistry flashcards for a UCR CHEM 008 student studying "${deckTitle}".

DECK FOCUS: ${deckDescription}

ALREADY COVERED (do NOT duplicate these concepts):
${existing}

Return ONLY a valid JSON array with exactly ${count} objects. No markdown, no explanation, just the array.

Each object must have exactly these fields:
{
  "front": "clear question or prompt (1-2 sentences max)",
  "back": "concise answer with key details (2-4 sentences max)",
  "hint": "optional memory trick or context (1 sentence, or empty string)"
}

Rules:
- Questions must be exam-relevant for UCR CHEM 008A/B/C
- Cover different sub-topics within the deck's focus
- Back answers should be precise and include any key formulas inline (e.g., RCHO)
- Vary question styles: definitions, mechanisms, comparisons, predictions
- Difficulty should range from basic to challenging
- No duplicate concepts from the existing list above`;
}

export function buildSynthesisPrompt(
  courseId: string,
  difficulty: 'easy' | 'medium' | 'hard'
): string {
  const difficultyRules: Record<string, string> = {
    easy: '2 steps total, use only single reaction types covered in the specified course, common everyday reagents (NaBH4, HBr, H2SO4, etc.), no stereochemical complexity, straightforward functional group interconversions',
    medium: '3 steps total, may cross reaction types (e.g., oxidation then substitution), introduce some stereochemical consideration (Markovnikov, anti-addition, etc.), moderate reagent complexity',
    hard: '4-5 steps total, protecting groups may be required, retrosynthetic thinking is essential, stereochemical requirements must be met (specific enantiomers or diastereomers), multi-functional molecule targets',
  };

  const courseScope: Record<string, string> = {
    '008A': 'Structure, bonding, stereochemistry, SN1/SN2 substitution, E1/E2 elimination — focus reactions in this scope',
    '008B': 'Alkene/alkyne additions, oxidation/reduction, NMR spectroscopy, carbonyl chemistry (aldehydes, ketones, carboxylic acids) — focus reactions in this scope',
    '008C': 'Aromatic chemistry (EAS/NAS), amines, carbohydrates, amino acids, lipids, Diels-Alder reaction — focus reactions in this scope',
  };

  return `You are an expert organic chemistry problem designer for UCR's CHEM ${courseId} course.

Generate a single synthesis problem at ${difficulty.toUpperCase()} difficulty.

COURSE SCOPE FOR ${courseId}: ${courseScope[courseId] ?? 'General organic chemistry reactions'}

DIFFICULTY REQUIREMENTS (${difficulty}): ${difficultyRules[difficulty]}

The problem must be chemically realistic and pedagogically sound. The synthesis route must actually work with the reagents listed.

Return ONLY a valid JSON object — no markdown code fences, no explanation text, no preamble. Just the raw JSON object.

The JSON must match this exact structure:
{
  "title": "short problem title (e.g., 'Synthesis of Ibuprofen Precursor')",
  "startingMaterial": "IUPAC name and brief structural description (e.g., 'propan-1-ol — a primary alcohol, CH3CH2CH2OH')",
  "targetMolecule": "IUPAC name and brief structural description of the target product",
  "numSteps": <integer matching difficulty rules above>,
  "context": "1-2 sentences of real-world relevance — connect this synthesis to a drug, natural product, industrial chemical, or biological molecule",
  "hints": [
    "Hint 1: think about the functional group transformation needed in the first step...",
    "Hint 2: consider what reagent selectively does X without affecting Y...",
    "Hint 3: retrosynthetically, the target contains a Z group which suggests..."
  ],
  "solution": [
    {"step": 1, "reagents": "exact reagents and solvents (e.g., NaBH4, MeOH, 0°C)", "reactionType": "Reaction class name (e.g., Reduction, SN2, Aldol)", "product": "name/description of intermediate product formed"},
    {"step": 2, "reagents": "...", "reactionType": "...", "product": "..."}
  ],
  "explanation": "2-3 sentence summary of the overall synthetic strategy — why these steps were chosen in this order, any key selectivity considerations"
}

Rules for the hints array: provide exactly 3 hints regardless of difficulty. Hints should be progressive — Hint 1 is the gentlest nudge, Hint 3 nearly gives it away.
Rules for the solution array: number of objects must match numSteps exactly.
The synthesis must be completable using reagents and reactions appropriate for ${courseId} at ${difficulty} difficulty.`;
}

export function buildGradingPrompt(
  question: string,
  correctAnswer: string,
  studentAnswer: string
): string {
  return `You are grading an organic chemistry answer. Be fair and educational.

QUESTION: ${question}
MODEL ANSWER: ${correctAnswer}
STUDENT ANSWER: ${studentAnswer}

Grade the student's answer and respond with JSON only (no markdown):
{
  "score": <0-100>,
  "isCorrect": <true if score >= 70>,
  "feedback": "<2-3 sentence explanation of what was right/wrong and the key concept>",
  "keyConceptsMissed": ["<concept 1>", "<concept 2>"]
}`;
}
