'use client';
import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { getDeck, getCardsForDeck } from '@/data/flashcards';
import { getDueCards, reviewCard, createNewSRSCard } from '@/lib/srs/scheduler';
import { useProgress } from '@/hooks/useProgress';
import { Flashcard } from '@/types/flashcard';

type Rating = 0 | 1 | 2 | 3;

const ratingConfig: { rating: Rating; label: string; color: string; desc: string }[] = [
  { rating: 0, label: 'Again', color: 'bg-red-600 hover:bg-red-500', desc: 'Forgot completely' },
  { rating: 1, label: 'Hard', color: 'bg-orange-600 hover:bg-orange-500', desc: 'With difficulty' },
  { rating: 2, label: 'Good', color: 'bg-blue-600 hover:bg-blue-500', desc: 'Recalled correctly' },
  { rating: 3, label: 'Easy', color: 'bg-green-600 hover:bg-green-500', desc: 'Knew it instantly' },
];

function FlashCard({ card, isFlipped, onFlip }: { card: Flashcard; isFlipped: boolean; onFlip: () => void }) {
  return (
    <div className="flashcard-container w-full" style={{ height: '360px' }} onClick={onFlip}>
      <div className={`flashcard-inner w-full h-full cursor-pointer ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flashcard-front absolute inset-0 bg-slate-800 border-2 border-slate-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-slate-500 transition-colors">
          <div className="text-slate-500 text-xs uppercase tracking-widest mb-4">Question</div>
          <p className="text-white text-xl font-medium leading-relaxed">
            {card.front.text}
          </p>
          {card.front.formula && (
            <div className="mt-4 bg-slate-700 rounded-lg px-4 py-2 font-mono text-blue-300 text-lg">
              {card.front.formula}
            </div>
          )}
          {card.front.hint && (
            <div className="mt-4 text-slate-400 text-sm italic">{card.front.hint}</div>
          )}
          <div className="mt-8 text-slate-600 text-sm">Click to reveal answer</div>
        </div>

        {/* Back */}
        <div className="flashcard-back bg-slate-800 border-2 border-blue-600/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="text-blue-400 text-xs uppercase tracking-widest mb-4">Answer</div>
          <p className="text-slate-200 text-base leading-relaxed">
            {card.back.text}
          </p>
          {card.back.formula && (
            <div className="mt-4 bg-slate-700 rounded-lg px-4 py-2 font-mono text-green-300 text-lg">
              {card.back.formula}
            </div>
          )}
        </div>
      </div>
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [sessionRatings, setSessionRatings] = useState<Rating[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [studyCards, setStudyCards] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  const deck = getDeck(deckId);
  const allCards = deck ? getCardsForDeck(deckId) : [];

  useEffect(() => {
    if (!initialized && allCards.length > 0) {
      const due = getDueCards(progress.srsCards, allCards.map(c => c.id));
      setStudyCards(due.length > 0 ? due : allCards.map(c => c.id));
      setInitialized(true);
    }
  }, [initialized, allCards, progress.srsCards]);

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
          <p className="text-slate-400 mb-8">{deck.title}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
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
      <div className="flex items-center justify-between mb-6">
        <Link href="/flashcards" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← {deck.title}
        </Link>
        <span className="text-slate-400 text-sm">
          Card {cardIndex + 1} of {studyCards.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-700 rounded-full h-2 mb-8">
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
