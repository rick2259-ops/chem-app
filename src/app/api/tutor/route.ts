import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt, buildGradingPrompt, buildLecturePrompt, buildFlashcardRealLifePrompt, buildFlashcardMiniLecturePrompt, buildFlashcardGenerationPrompt, buildSynthesisPrompt, buildQuizGenerationPrompt } from '@/lib/claude/prompts';
import { TutorContext, ChatMessage } from '@/types/tutor';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      messages,
      context,
      gradingMode,
      lectureMode,
      flashcardRealLifeMode,
      flashcardMiniLectureMode,
      flashcardGenerateMode,
      cardFront,
      cardBack,
      cardCategory,
      topicTitle,
      courseId,
      description,
      learningObjectives,
      realWorldExamples,
      question,
      correctAnswer,
      studentAnswer,
      generateDeckTitle,
      generateDeckDescription,
      generateCount,
      generateExistingFronts,
      quizGenerateMode,
      quizTopicTitle,
      quizCourseId,
      quizDescription,
      quizExistingPrompts,
      synthesisMode,
      synthesisCourseId,
      synthesisdifficulty,
    } = body as {
      messages?: ChatMessage[];
      context?: TutorContext;
      gradingMode?: boolean;
      lectureMode?: boolean;
      flashcardRealLifeMode?: boolean;
      flashcardMiniLectureMode?: boolean;
      flashcardGenerateMode?: boolean;
      cardFront?: string;
      cardBack?: string;
      cardCategory?: string;
      topicTitle?: string;
      courseId?: string;
      description?: string;
      learningObjectives?: string[];
      realWorldExamples?: { emoji: string; title: string; description: string }[];
      question?: string;
      correctAnswer?: string;
      studentAnswer?: string;
      generateDeckTitle?: string;
      generateDeckDescription?: string;
      generateCount?: number;
      generateExistingFronts?: string[];
      quizGenerateMode?: boolean;
      quizTopicTitle?: string;
      quizCourseId?: string;
      quizDescription?: string;
      quizExistingPrompts?: string[];
      synthesisMode?: boolean;
      synthesisCourseId?: string;
      synthesisdifficulty?: 'easy' | 'medium' | 'hard';
    };

    // Quiz question generation
    if (quizGenerateMode && quizTopicTitle && quizCourseId && quizDescription !== undefined) {
      const prompt = buildQuizGenerationPrompt(
        quizTopicTitle,
        quizCourseId,
        quizDescription,
        generateCount ?? 5,
        quizExistingPrompts ?? []
      );
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      });
      const text = response.content[0].type === 'text' ? response.content[0].text : '[]';
      return new Response(text, { headers: { 'Content-Type': 'application/json' } });
    }

    // Synthesis problem generation
    if (synthesisMode && synthesisCourseId && synthesisdifficulty) {
      const prompt = buildSynthesisPrompt(synthesisCourseId, synthesisdifficulty);
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      });
      const text = response.content[0].type === 'text' ? response.content[0].text : '{}';
      return new Response(text, { headers: { 'Content-Type': 'application/json' } });
    }

    // Flashcard AI generation
    if (flashcardGenerateMode && generateDeckTitle && generateDeckDescription) {
      const prompt = buildFlashcardGenerationPrompt(
        generateDeckTitle,
        generateDeckDescription,
        generateCount ?? 5,
        generateExistingFronts ?? []
      );
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      });
      const text = response.content[0].type === 'text' ? response.content[0].text : '[]';
      return new Response(text, { headers: { 'Content-Type': 'application/json' } });
    }

    // Flashcard real-life example
    if (flashcardRealLifeMode && cardFront && cardBack) {
      const prompt = buildFlashcardRealLifePrompt(cardFront, cardBack);
      const stream = await client.messages.create({
        model: 'claude-sonnet-4-6', max_tokens: 400,
        messages: [{ role: 'user', content: prompt }], stream: true,
      });
      const readable = new ReadableStream({
        async start(controller) {
          for await (const event of stream)
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta')
              controller.enqueue(new TextEncoder().encode(event.delta.text));
          controller.close();
        },
      });
      return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    // Flashcard mini lecture
    if (flashcardMiniLectureMode && cardFront && cardBack) {
      const prompt = buildFlashcardMiniLecturePrompt(cardFront, cardBack, cardCategory ?? 'general');
      const stream = await client.messages.create({
        model: 'claude-sonnet-4-6', max_tokens: 500,
        messages: [{ role: 'user', content: prompt }], stream: true,
      });
      const readable = new ReadableStream({
        async start(controller) {
          for await (const event of stream)
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta')
              controller.enqueue(new TextEncoder().encode(event.delta.text));
          controller.close();
        },
      });
      return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    if (lectureMode && topicTitle && courseId && description && learningObjectives && realWorldExamples) {
      const prompt = buildLecturePrompt(topicTitle, courseId, description, learningObjectives, realWorldExamples);
      const stream = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      });
      const readable = new ReadableStream({
        async start(controller) {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(new TextEncoder().encode(event.delta.text));
            }
          }
          controller.close();
        },
      });
      return new Response(readable, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked' },
      });
    }

    if (gradingMode && question && correctAnswer && studentAnswer) {
      // Short answer grading mode - returns JSON
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: buildGradingPrompt(question, correctAnswer, studentAnswer),
          },
        ],
      });
      const text =
        response.content[0].type === 'text' ? response.content[0].text : '{}';
      return new Response(text, {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Streaming tutor mode
    if (!messages || !context) {
      return new Response('Missing messages or context', { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(context);
    const anthropicMessages = messages
      .filter(m => !m.isStreaming)
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    const stream = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: anthropicMessages,
      stream: true,
    });

    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(new TextEncoder().encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Tutor API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
