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
