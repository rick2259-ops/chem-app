'use client';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTutorChat } from '@/hooks/useTutorChat';
import { courses } from '@/data/courses';

const suggestedQuestions: Record<string, string[]> = {
  '': [
    'What is the difference between SN1 and SN2 reactions?',
    "Explain Markovnikov's rule with an example.",
    'How do I assign R/S configuration?',
    'What makes a good nucleophile?',
    'Explain the aldol condensation mechanism.',
    "What is aromaticity and how does Hückel's rule work?",
  ],
  'structure-bonding': [
    'What is the difference between sp, sp2, and sp3 hybridization?',
    'How do I determine the bond angle of a molecule?',
    'What is the difference between sigma and pi bonds?',
    'How does resonance affect molecular stability?',
  ],
  'functional-groups': [
    'How do I name a compound with multiple functional groups?',
    'What is the IUPAC name for this structure?',
    'How do I convert between structural and skeletal formulas?',
    'Which functional groups are most reactive and why?',
  ],
  'stereochemistry': [
    'How do I assign R vs S configuration step by step?',
    'What is the difference between enantiomers and diastereomers?',
    'How do I assign E/Z to an alkene?',
    'What makes a molecule chiral?',
    'How do I draw a Fischer projection for glucose?',
  ],
  'acids-bases': [
    'How does resonance affect acidity?',
    'Why are carboxylic acids more acidic than alcohols?',
    'What is the difference between a Lewis and Brønsted acid?',
    'How do inductive effects change pKa?',
  ],
  'sn1-sn2': [
    'What is the difference between SN1 and SN2 mechanisms?',
    'Why do tertiary carbons favor SN1 over SN2?',
    'What makes a good leaving group?',
    'How does solvent polarity affect SN1 vs SN2?',
    'What stereochemistry results from SN2 reactions?',
  ],
  'e1-e2': [
    "How do I apply Zaitsev's rule to predict the major product?",
    'What is the anti-periplanar requirement in E2?',
    'When does elimination compete with substitution?',
    'What is the difference between E1 and E2 mechanisms?',
  ],
  'alkene-addition': [
    "How does Markovnikov's rule work mechanistically?",
    'What is the difference between syn and anti addition?',
    'How does halogenation of alkenes proceed via a bromonium ion?',
    'What causes carbocation rearrangements?',
  ],
  'alkyne-reactions': [
    'How do I reduce an alkyne to a cis vs trans alkene?',
    'Why are terminal alkynes more acidic than alkenes?',
    'What is Markovnikov hydration of an alkyne?',
  ],
  'oxidation-reduction': [
    'What is the difference between PCC and KMnO4 oxidation?',
    'How do I choose between NaBH4 and LiAlH4?',
    'How does OsO4 give syn dihydroxylation?',
    'What does mCPBA do to an alkene?',
  ],
  'nmr-spectroscopy': [
    'How do I interpret the splitting pattern in 1H NMR?',
    'What chemical shift ranges correspond to which functional groups?',
    'How does integration help identify a structure?',
    'What is the difference between 1H and 13C NMR?',
  ],
  'carbonyl-chemistry': [
    'What makes aldehydes more reactive than ketones?',
    'How does the aldol condensation work step by step?',
    'What is the order of reactivity of carboxylic acid derivatives?',
    'How do I draw the mechanism for nucleophilic addition to a carbonyl?',
  ],
  'aromatic-chemistry': [
    "How do I use Hückel's rule to determine aromaticity?",
    'Why are electron-donating groups ortho/para directors?',
    'What is the mechanism for electrophilic aromatic substitution?',
    'How do I predict the product of a Friedel-Crafts reaction?',
  ],
  'amines': [
    'Why are amines basic? How does substitution affect basicity?',
    'What is reductive amination and when is it used?',
    'How does the Gabriel synthesis work?',
    'What is diazotization and what can you do with a diazonium salt?',
    'Why is pyridine less basic than piperidine?',
  ],
  'carbohydrates': [
    'What is the difference between alpha and beta anomers?',
    'How do I draw glucose as a Haworth projection?',
    'What is the difference between glycosidic bond in starch vs cellulose?',
    'How does mutarotation work?',
  ],
  'amino-acids-proteins': [
    'How do I calculate the isoelectric point (pI) of an amino acid?',
    'What is the difference between primary, secondary, and tertiary protein structure?',
    'How is a peptide bond formed and broken?',
    'Which amino acids have charged side chains at pH 7?',
  ],
  'lipids': [
    'What is the difference between saturated and unsaturated fatty acids?',
    'How does saponification work?',
    'Why do phospholipids form a bilayer spontaneously?',
    'What is the role of cholesterol in membranes?',
  ],
  'diels-alder': [
    'What is the s-cis conformation requirement for the diene?',
    'How do I predict the stereochemistry of a Diels-Alder product?',
    'What is the endo rule and why does it apply?',
    'How do electron-withdrawing groups on the dienophile affect reactivity?',
  ],
};

function MessageBubble({ role, content, isStreaming }: { role: 'user' | 'assistant'; content: string; isStreaming?: boolean }) {
  return (
    <div className={`flex gap-3 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {role === 'assistant' && (
        <div className="w-8 h-8 flex-shrink-0 bg-blue-600 rounded-full flex items-center justify-center text-sm">
          🤖
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          role === 'user'
            ? 'bg-blue-600 text-white rounded-br-sm'
            : 'bg-slate-700 text-slate-100 rounded-bl-sm'
        }`}
      >
        {role === 'user' ? (
          <span>{content}</span>
        ) : (
          <div className="prose-chem">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-lg font-bold text-white mt-3 mb-2 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold text-blue-300 mt-4 mb-2 first:mt-0 border-b border-slate-600 pb-1">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-semibold text-slate-200 mt-3 mb-1">{children}</h3>,
                p: ({ children }) => <p className="mb-2 last:mb-0 text-slate-100 leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                em: ({ children }) => <em className="italic text-blue-200">{children}</em>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 text-slate-200">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 text-slate-200">{children}</ol>,
                li: ({ children }) => <li className="text-slate-200 leading-relaxed">{children}</li>,
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  return isBlock
                    ? <code className="block bg-slate-900 text-green-300 text-xs px-3 py-2 rounded-lg my-2 font-mono overflow-x-auto">{children}</code>
                    : <code className="bg-slate-900 text-green-300 text-xs px-1.5 py-0.5 rounded font-mono">{children}</code>;
                },
                pre: ({ children }) => <pre className="bg-slate-900 rounded-lg my-2 overflow-x-auto">{children}</pre>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-3 my-2 text-slate-300 italic">{children}</blockquote>,
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3">
                    <table className="w-full text-xs border-collapse">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-slate-600">{children}</thead>,
                th: ({ children }) => <th className="px-3 py-2 text-left text-white font-semibold border border-slate-500">{children}</th>,
                td: ({ children }) => <td className="px-3 py-2 text-slate-200 border border-slate-600">{children}</td>,
                tr: ({ children }) => <tr className="even:bg-slate-800/50">{children}</tr>,
                hr: () => <hr className="border-slate-600 my-3" />,
              }}
            >
              {content}
            </ReactMarkdown>
            {isStreaming && <span className="streaming-cursor" />}
          </div>
        )}
      </div>
      {role === 'user' && (
        <div className="w-8 h-8 flex-shrink-0 bg-slate-600 rounded-full flex items-center justify-center text-sm">
          👤
        </div>
      )}
    </div>
  );
}

export default function TutorPage() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, isStreaming, context, sendMessage, clearChat, updateContext } = useTutorChat();

  // Build flat topic list for selector
  const topicOptions: { value: string; label: string; courseId: string }[] = [
    { value: '', label: 'No specific topic', courseId: '' },
    ...courses.flatMap(course =>
      course.topics.map(t => ({
        value: t.id,
        label: `${t.title}`,
        courseId: course.id,
      }))
    ),
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput('');
    await sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (q: string) => {
    setInput(q);
    inputRef.current?.focus();
  };

  const handleTopicChange = (topicId: string) => {
    const topic = courses.flatMap(c => c.topics).find(t => t.id === topicId);
    const course = courses.find(c => c.topics.some(t => t.id === topicId));
    updateContext({
      currentTopicId: topicId || null,
      currentCourseId: course?.id ?? null,
    });
  };

  const suggested = suggestedQuestions[context.currentTopicId ?? ''] ?? suggestedQuestions[''];

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <div className="w-72 flex-shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col p-4 overflow-y-auto">
        <div className="mb-5">
          <h2 className="text-white font-semibold text-sm mb-3">Topic Context</h2>
          <select
            value={context.currentTopicId ?? ''}
            onChange={e => handleTopicChange(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            {topicOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {context.currentTopicId && (
            <div className="mt-2 text-xs text-blue-400 bg-blue-500/10 rounded-lg px-3 py-2">
              Context set — AI will focus on this topic
            </div>
          )}
        </div>

        <div>
          <h2 className="text-white font-semibold text-sm mb-3">Suggested Questions</h2>
          <div className="space-y-2">
            {suggested.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestedQuestion(q)}
                className="w-full text-left text-xs text-slate-300 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 rounded-lg px-3 py-2.5 transition-all leading-relaxed"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="mt-auto pt-4 text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            Clear conversation
          </button>
        )}
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="border-b border-slate-700 px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-lg">🤖</div>
          <div>
            <div className="text-white font-semibold text-sm">UCR Chem AI Tutor</div>
            <div className="text-slate-400 text-xs">
              {isStreaming ? (
                <span className="text-blue-400 animate-pulse">Thinking...</span>
              ) : (
                'Powered by Claude · Ask anything about Organic Chemistry'
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-4">⚗️</div>
              <h3 className="text-white text-xl font-semibold mb-2">Welcome to your AI Chemistry Tutor</h3>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-6">
                I can help you understand reaction mechanisms, nomenclature, stereochemistry,
                spectroscopy, and everything else in your UCR CHEM 008A/B/C courses.
              </p>
              <div className="grid grid-cols-2 gap-2 max-w-lg w-full">
                {suggested.slice(0, 4).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="text-left text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl px-3 py-3 transition-all leading-relaxed"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map(msg => (
              <MessageBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                isStreaming={msg.isStreaming}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-slate-700 p-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 bg-slate-800 border border-slate-600 focus-within:border-blue-500 rounded-xl overflow-hidden transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about reactions, mechanisms, spectroscopy... (Enter to send)"
                rows={2}
                className="w-full bg-transparent text-white text-sm px-4 pt-3 pb-2 resize-none focus:outline-none placeholder-slate-500"
              />
              <div className="flex items-center justify-between px-3 pb-2">
                <span className="text-xs text-slate-600">Press Enter to send, Shift+Enter for new line</span>
                <span className={`text-xs ${input.length > 1000 ? 'text-red-400' : 'text-slate-600'}`}>
                  {input.length}/2000
                </span>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white text-lg transition-all flex items-center justify-center"
            >
              {isStreaming ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                '→'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
