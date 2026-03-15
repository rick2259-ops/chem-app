'use client';
import { use, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { courses, getTopic } from '@/data/courses';

const courseColors: Record<string, { badge: string; border: string; glow: string }> = {
  CHEM008A: { badge: 'bg-blue-600',   border: 'border-blue-500/40',   glow: 'shadow-blue-500/10' },
  CHEM008B: { badge: 'bg-green-600',  border: 'border-green-500/40',  glow: 'shadow-green-500/10' },
  CHEM008C: { badge: 'bg-purple-600', border: 'border-purple-500/40', glow: 'shadow-purple-500/10' },
};

export default function LecturePage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = use(params);
  const [lectureContent, setLectureContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const topic = getTopic(topicId);
  const course = courses.find(c => c.topics.some(t => t.id === topicId));
  const colors = courseColors[course?.id ?? 'CHEM008A'];

  // Auto-scroll as content streams in
  useEffect(() => {
    if (isGenerating) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lectureContent, isGenerating]);

  const generateLecture = async () => {
    if (!topic || !course || hasStarted.current) return;
    hasStarted.current = true;
    setIsGenerating(true);
    setError('');
    setLectureContent('');

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lectureMode: true,
          topicTitle: topic.title,
          courseId: course.id,
          description: topic.description,
          learningObjectives: topic.learningObjectives,
          realWorldExamples: topic.realWorldExamples ?? [],
        }),
      });

      if (!res.ok) throw new Error('Failed to generate lecture');
      if (!res.body) throw new Error('No stream body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setLectureContent(accumulated);
      }

      setIsComplete(true);
    } catch (e) {
      setError('Failed to generate lecture. Please check your API key and try again.');
      hasStarted.current = false;
    } finally {
      setIsGenerating(false);
    }
  };

  if (!topic || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-white text-lg mb-3">Topic not found</p>
          <Link href="/topics" className="text-blue-400 hover:text-blue-300 text-sm">← Back to Topics</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/topics/${course.id}/${topicId}`} className="text-slate-400 hover:text-white transition-colors text-sm">
              ← Back
            </Link>
            <span className="text-slate-600">|</span>
            <span className={`${colors.badge} text-white text-xs font-bold px-2 py-0.5 rounded`}>{course.id}</span>
            <span className="text-white font-semibold text-sm truncate max-w-xs">{topic.title}</span>
          </div>
          {isComplete && (
            <div className="flex items-center gap-2">
              <Link
                href={`/quiz/${topicId}`}
                className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                ✏️ Take Quiz
              </Link>
              <Link
                href="/flashcards"
                className="text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                🃏 Flashcards
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* Topic intro card */}
        <div className={`bg-slate-800 rounded-2xl border ${colors.border} p-8 mb-8 shadow-xl ${colors.glow}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">📖</span>
            <div>
              <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Lecture — {course.name}</div>
              <h1 className="text-2xl font-bold text-white">{topic.title}</h1>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed mb-5">{topic.description}</p>

          {/* Learning objectives preview */}
          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-3">After this lecture you will be able to:</div>
            <ul className="space-y-1.5">
              {topic.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">○</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Real world preview */}
          {topic.realWorldExamples?.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {topic.realWorldExamples.map((ex, i) => (
                <span key={i} className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1 rounded-full">
                  {ex.emoji} {ex.title}
                </span>
              ))}
            </div>
          )}

          {/* Generate button */}
          {!isGenerating && !lectureContent && (
            <button
              onClick={generateLecture}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all text-base flex items-center justify-center gap-3 group"
            >
              <span className="text-xl group-hover:animate-bounce">🎓</span>
              Start Lecture — Learn from Scratch
            </button>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
              <button onClick={() => { hasStarted.current = false; setError(''); }} className="ml-3 underline hover:no-underline">Try again</button>
            </div>
          )}
        </div>

        {/* Lecture content */}
        {(isGenerating || lectureContent) && (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            {/* Generating indicator */}
            {isGenerating && (
              <div className="flex items-center gap-3 px-6 py-3 bg-blue-600/10 border-b border-blue-500/20">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-blue-300 text-sm">Generating your personalized lecture...</span>
              </div>
            )}

            {isComplete && (
              <div className="flex items-center gap-2 px-6 py-3 bg-green-600/10 border-b border-green-500/20">
                <span className="text-green-400">✓</span>
                <span className="text-green-300 text-sm font-medium">Lecture complete — ready to practice!</span>
              </div>
            )}

            {/* Rendered markdown lecture */}
            <div className="p-8 lecture-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold text-white mt-8 mb-3 first:mt-0 flex items-center gap-2 border-b border-slate-700 pb-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-semibold text-blue-300 mt-5 mb-2">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-sm font-semibold text-slate-200 mt-4 mb-1">{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-200 leading-relaxed mb-3 text-[15px]">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-white">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-amber-200">{children}</em>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-1.5 mb-4 ml-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-1.5 mb-4 ml-1 list-decimal list-inside">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2 text-slate-200 text-[15px] leading-relaxed">
                      <span className="text-blue-400 mt-1 flex-shrink-0 text-xs">◆</span>
                      <span>{children}</span>
                    </li>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    return isBlock
                      ? <code className="block bg-slate-900 text-green-300 text-sm px-4 py-3 rounded-lg my-3 font-mono overflow-x-auto">{children}</code>
                      : <code className="bg-slate-900 text-green-300 text-sm px-1.5 py-0.5 rounded font-mono">{children}</code>;
                  },
                  pre: ({ children }) => <pre className="my-0">{children}</pre>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-amber-400 pl-4 my-3 text-amber-100 bg-amber-500/5 py-2 rounded-r-lg italic">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="border-slate-600 my-6" />,
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="w-full text-sm border-collapse">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-slate-700">{children}</thead>,
                  th: ({ children }) => <th className="px-4 py-2 text-left text-white font-semibold border border-slate-600">{children}</th>,
                  td: ({ children }) => <td className="px-4 py-2 text-slate-200 border border-slate-700">{children}</td>,
                  tr: ({ children }) => <tr className="even:bg-slate-800/60">{children}</tr>,
                }}
              >
                {lectureContent}
              </ReactMarkdown>
              {isGenerating && <span className="streaming-cursor text-blue-400" />}
            </div>
          </div>
        )}

        {/* Bottom CTA after lecture completes */}
        {isComplete && (
          <div className="mt-8 bg-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-white font-semibold text-lg mb-2 text-center">Ready to Practice? 🚀</h3>
            <p className="text-slate-400 text-sm text-center mb-5">
              Now that you've read the lecture, test yourself to lock in the knowledge.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Link
                href={`/quiz/${topicId}`}
                className="flex flex-col items-center gap-2 p-4 bg-blue-600/20 border border-blue-500/30 rounded-xl hover:bg-blue-600/30 transition-colors text-center"
              >
                <span className="text-2xl">✏️</span>
                <div className="text-white text-sm font-medium">Practice Quiz</div>
                <div className="text-blue-300 text-xs">Test your knowledge</div>
              </Link>
              <Link
                href="/flashcards"
                className="flex flex-col items-center gap-2 p-4 bg-green-600/20 border border-green-500/30 rounded-xl hover:bg-green-600/30 transition-colors text-center"
              >
                <span className="text-2xl">🃏</span>
                <div className="text-white text-sm font-medium">Flashcards</div>
                <div className="text-green-300 text-xs">Spaced repetition</div>
              </Link>
              <Link
                href="/tutor"
                className="flex flex-col items-center gap-2 p-4 bg-orange-600/20 border border-orange-500/30 rounded-xl hover:bg-orange-600/30 transition-colors text-center"
              >
                <span className="text-2xl">🤖</span>
                <div className="text-white text-sm font-medium">Ask AI Tutor</div>
                <div className="text-orange-300 text-xs">Clear up confusion</div>
              </Link>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
