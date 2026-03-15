import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt, buildGradingPrompt } from '@/lib/claude/prompts';
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
      question,
      correctAnswer,
      studentAnswer,
    } = body as {
      messages?: ChatMessage[];
      context?: TutorContext;
      gradingMode?: boolean;
      question?: string;
      correctAnswer?: string;
      studentAnswer?: string;
    };

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
