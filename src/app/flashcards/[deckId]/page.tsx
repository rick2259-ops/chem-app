'use client';
import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDeck, getCardsForDeck } from '@/data/flashcards';
import { getDueCards, reviewCard, createNewSRSCard } from '@/lib/srs/scheduler';
import { useProgress } from '@/hooks/useProgress';
import { useCustomCards } from '@/hooks/useCustomCards';
import { Flashcard } from '@/types/flashcard';

type Rating = 0 | 1 | 2 | 3;

// Reusable streaming AI panel for flashcards
function CardAIPanel({ mode, card, label, icon, borderColor, textColor, bgColor }: {
  mode: 'reallife' | 'minilecture';
  card: Flashcard;
  label: string;
  icon: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    setIsOpen(false);
    setText('');
    setIsLoading(false);
    hasFetched.current = false;
  }, [card.id]);

  const handleOpen = async () => {
    if (hasFetched.current) { setIsOpen(o => !o); return; }
    hasFetched.current = true;
    setIsOpen(true);
    setIsLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [mode === 'reallife' ? 'flashcardRealLifeMode' : 'flashcardMiniLectureMode']: true,
          cardFront: card.front.text,
          cardBack: card.back.text,
          cardCategory: card.category,
        }),
      });
      if (!res.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setText(acc);
      }
    } catch {
      setText('Could not load. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-left">
      <button
        onClick={handleOpen}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border ${borderColor} ${bgColor} ${textColor} hover:opacity-90 transition-all text-xs font-medium`}
      >
        <span>{icon}</span>
        {label}
        <span className="ml-auto text-slate-500">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className={`mt-1 rounded-xl border ${borderColor} bg-slate-900 p-4 text-left animate-fadeInUp`}>
          {isLoading && !text && (
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              Generating...
            </div>
          )}
          {text && (
            <div className={`text-xs leading-relaxed ${textColor}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0 text-slate-200">{children}</p>,
                  strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                  code: ({ children }) => <code className="bg-slate-800 text-green-300 px-1 rounded font-mono text-xs">{children}</code>,
                  ul: ({ children }) => <ul className="space-y-1 mb-2">{children}</ul>,
                  li: ({ children }) => <li className="flex gap-1.5 text-slate-200"><span className="text-blue-400 flex-shrink-0">•</span><span>{children}</span></li>,
                }}
              >{text}</ReactMarkdown>
              {isLoading && <span className="streaming-cursor text-blue-400" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// AI card generator panel
function GenerateCardsPanel({ deck, existingCards, onGenerated }: {
  deck: { id: string; title: string; description: string };
  existingCards: Flashcard[];
  onGenerated: (cards: Flashcard[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(5);
  const [error, setError] = useState('');
  const [lastGenerated, setLastGenerated] = useState(0);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    try {
      const existingFronts = existingCards.map(c => c.front.text);
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flashcardGenerateMode: true,
          generateDeckTitle: deck.title,
          generateDeckDescription: deck.description,
          generateCount: count,
          generateExistingFronts: existingFronts,
        }),
      });
      const text = await res.text();
      // Extract JSON array from response (Claude may wrap in markdown)
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('Invalid response');
      const raw: { front: string; back: string; hint?: string }[] = JSON.parse(jsonMatch[0]);

      const newCards: Flashcard[] = raw.map((item, i) => ({
        id: `ai-${deck.id}-${Date.now()}-${i}`,
        deckId: deck.id,
        category: 'functional-group' as const,
        front: { text: item.front, hint: item.hint || undefined },
        back: { text: item.back },
        tags: ['ai-generated', deck.id],
      }));

      onGenerated(newCards);
      setLastGenerated(newCards.length);
      setIsOpen(false);
    } catch {
      setError('Generation failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(o => !o)}
        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-all text-sm font-medium"
      >
        <span>✨</span>
        Generate AI Cards
        {lastGenerated > 0 && (
          <span className="bg-violet-600 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">+{lastGenerated} added</span>
        )}
        <span className="ml-auto text-slate-500">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="mt-2 bg-slate-800 border border-violet-500/30 rounded-xl p-4 animate-fadeInUp">
          <p className="text-slate-300 text-sm mb-3">
            Claude will generate new cards unique to this deck, avoiding topics already covered.
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-slate-400 text-sm">How many cards?</span>
            {[3, 5, 10].map(n => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${count === n ? 'bg-violet-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                {n}
              </button>
            ))}
          </div>
          {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating {count} cards...
              </>
            ) : (
              `✨ Generate ${count} Cards`
            )}
          </button>
        </div>
      )}
    </div>
  );
}

const ratingConfig: { rating: Rating; label: string; color: string; desc: string }[] = [
  { rating: 0, label: 'Again', color: 'bg-red-600 hover:bg-red-500', desc: 'Forgot completely' },
  { rating: 1, label: 'Hard', color: 'bg-orange-600 hover:bg-orange-500', desc: 'With difficulty' },
  { rating: 2, label: 'Good', color: 'bg-blue-600 hover:bg-blue-500', desc: 'Recalled correctly' },
  { rating: 3, label: 'Easy', color: 'bg-green-600 hover:bg-green-500', desc: 'Knew it instantly' },
];

function FlashCard({ card, isFlipped, onFlip }: { card: Flashcard; isFlipped: boolean; onFlip: () => void }) {
  return (
    <div className="w-full">
      <div className="flashcard-container w-full" style={{ height: '260px' }} onClick={onFlip}>
        <div className={`flashcard-inner w-full h-full cursor-pointer relative ${isFlipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flashcard-front absolute inset-0 bg-slate-800 border-2 border-slate-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-slate-500 transition-colors">
            <div className="text-slate-500 text-xs uppercase tracking-widest mb-4">Question</div>
            <p className="text-white text-xl font-medium leading-relaxed">{card.front.text}</p>
            {card.front.hint && (
              <div className="mt-4 text-slate-400 text-sm italic">{card.front.hint}</div>
            )}
            <div className="mt-6 text-slate-600 text-sm">Click to reveal answer</div>
          </div>

          {/* Back */}
          <div className="flashcard-back absolute inset-0 bg-slate-800 border-2 border-blue-600/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-3">Answer</div>
            <p className="text-slate-200 text-base leading-relaxed">{card.back.text}</p>
            {card.back.formula && (
              <div className="mt-3 bg-slate-700 rounded-lg px-4 py-2 font-mono text-green-300 text-lg">
                {card.back.formula}
              </div>
            )}
            {card.tags?.includes('ai-generated') && (
              <div className="mt-3 text-xs text-violet-400 opacity-60">✨ AI Generated</div>
            )}
          </div>
        </div>
      </div>

      {/* AI help buttons — only visible when flipped */}
      {isFlipped && (
        <div className="mt-3 space-y-2 animate-fadeInUp">
          <CardAIPanel
            mode="reallife"
            card={card}
            label="Show Real Life Example"
            icon="🌍"
            borderColor="border-amber-500/30"
            textColor="text-amber-300"
            bgColor="bg-amber-500/10"
          />
          <CardAIPanel
            mode="minilecture"
            card={card}
            label="Mini Lecture — Explain This to Me"
            icon="⚡"
            borderColor="border-blue-500/30"
            textColor="text-blue-300"
            bgColor="bg-blue-500/10"
          />
        </div>
      )}
    </div>
  );
}

export default function FlashcardStudyPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = use(params);
  const { progress, updateProgress } = useProgress();
  const { customCards, addCards } = useCustomCards(deckId);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [sessionRatings, setSessionRatings] = useState<Rating[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [studyCards, setStudyCards] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  const deck = getDeck(deckId);
  const staticCards = deck ? getCardsForDeck(deckId) : [];
  const allCards = [...staticCards, ...customCards];

  useEffect(() => {
    if (!initialized && allCards.length > 0) {
      const due = getDueCards(progress.srsCards, allCards.map(c => c.id));
      setStudyCards(due.length > 0 ? due : allCards.map(c => c.id));
      setInitialized(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, staticCards.length, customCards.length, progress.srsCards]);

  const handleGenerated = (newCards: Flashcard[]) => {
    addCards(newCards);
    // Add new cards to current study session
    setStudyCards(prev => [...prev, ...newCards.map(c => c.id)]);
  };

  if (!deck) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-white text-xl font-semibold mb-2">Deck not found</div>
          <Link href="/flashcards" className="text-blue-400 hover:text-blue-300 text-sm">
            ← Back to Decks
          </Link>
        </div>
      </div>
    );
  }

  const currentCardId = studyCards[cardIndex];
  const currentCard = allCards.find(c => c.id === currentCardId);
  const progressPct = studyCards.length > 0 ? (cardIndex / studyCards.length) * 100 : 0;

  const handleRating = (rating: Rating) => {
    if (!currentCardId) return;

    const existingSRS = progress.srsCards[currentCardId] || createNewSRSCard(currentCardId);
    const newSRS = reviewCard(existingSRS, rating);

    updateProgress(prev => ({
      ...prev,
      srsCards: {
        ...prev.srsCards,
        [currentCardId]: newSRS,
      },
    }));

    setSessionRatings(prev => [...prev, rating]);
    setIsFlipped(false);

    setTimeout(() => {
      if (cardIndex + 1 >= studyCards.length) {
        setIsComplete(true);
      } else {
        setCardIndex(prev => prev + 1);
      }
    }, 150);
  };

  const correctCount = sessionRatings.filter(r => r >= 2).length;
  const accuracy = sessionRatings.length > 0 ? Math.round((correctCount / sessionRatings.length) * 100) : 0;

  if (isComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">Session Complete!</h2>
          <p className="text-slate-400 mb-6">{deck.title}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700 rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{studyCards.length}</div>
              <div className="text-slate-400 text-xs mt-1">Cards studied</div>
            </div>
            <div className="bg-slate-700 rounded-xl p-4">
              <div className={`text-2xl font-bold ${accuracy >= 80 ? 'text-green-400' : accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {accuracy}%
              </div>
              <div className="text-slate-400 text-xs mt-1">Accuracy</div>
            </div>
            <div className="bg-slate-700 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">
                {sessionRatings.filter(r => r === 0).length}
              </div>
              <div className="text-slate-400 text-xs mt-1">To review again</div>
            </div>
          </div>

          {/* Generate more cards on completion */}
          <div className="mb-6">
            <GenerateCardsPanel
              deck={deck}
              existingCards={allCards}
              onGenerated={(newCards) => {
                addCards(newCards);
                setStudyCards(newCards.map(c => c.id));
                setCardIndex(0);
                setSessionRatings([]);
                setIsFlipped(false);
                setIsComplete(false);
              }}
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setCardIndex(0);
                setSessionRatings([]);
                setIsFlipped(false);
                setIsComplete(false);
                const again = studyCards.filter(
                  (_, i) => sessionRatings[i] === 0
                );
                setStudyCards(again.length > 0 ? again : studyCards);
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-colors"
            >
              Study Again
            </button>
            <Link
              href="/flashcards"
              className="block w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors text-center"
            >
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-400 animate-pulse">Loading cards...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/flashcards" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← {deck.title}
        </Link>
        <span className="text-slate-400 text-sm">
          Card {cardIndex + 1} of {studyCards.length}
          {customCards.length > 0 && (
            <span className="ml-2 text-violet-400 text-xs">({customCards.length} AI)</span>
          )}
        </span>
      </div>

      {/* Generate more cards — always accessible */}
      <div className="mb-4">
        <GenerateCardsPanel
          deck={deck}
          existingCards={allCards}
          onGenerated={handleGenerated}
        />
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Card */}
      <FlashCard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(f => !f)}
      />

      {/* Rating buttons - only shown when flipped */}
      <div className={`mt-6 transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="text-center text-slate-400 text-sm mb-3">How well did you know this?</div>
        <div className="grid grid-cols-4 gap-3">
          {ratingConfig.map(({ rating, label, color, desc }) => (
            <button
              key={rating}
              onClick={() => handleRating(rating)}
              className={`${color} text-white rounded-xl py-3 px-2 transition-all text-center`}
            >
              <div className="font-semibold text-sm">{label}</div>
              <div className="text-xs opacity-75 mt-0.5">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {!isFlipped && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsFlipped(true)}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
          >
            Show Answer
          </button>
        </div>
      )}
    </div>
  );
}
