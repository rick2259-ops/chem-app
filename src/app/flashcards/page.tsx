'use client';
import Link from 'next/link';
import { allDecks, getCardsForDeck } from '@/data/flashcards';
import { useProgress } from '@/hooks/useProgress';
import { getDueCards } from '@/lib/srs/scheduler';

const courseColors: Record<string, { border: string; badge: string; icon: string }> = {
  CHEM008A: { border: 'border-blue-500/30', badge: 'bg-blue-600', icon: '🔵' },
  CHEM008B: { border: 'border-green-500/30', badge: 'bg-green-600', icon: '🟢' },
  CHEM008C: { border: 'border-purple-500/30', badge: 'bg-purple-600', icon: '🟣' },
};

export default function FlashcardsPage() {
  const { progress, isLoaded } = useProgress();

  const totalDue = allDecks.reduce((sum, deck) => {
    if (!isLoaded) return sum;
    const cards = getCardsForDeck(deck.id);
    const due = getDueCards(progress.srsCards, cards.map(c => c.id));
    return sum + due.length;
  }, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Flashcard Decks</h1>
            <p className="text-slate-400">Study with spaced repetition (SM-2 algorithm)</p>
          </div>
          {isLoaded && totalDue > 0 && (
            <div className="bg-orange-500/20 border border-orange-500/40 rounded-xl px-4 py-3 text-center">
              <div className="text-2xl font-bold text-orange-400">{totalDue}</div>
              <div className="text-orange-300 text-xs">cards due today</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {allDecks.map(deck => {
          const cards = getCardsForDeck(deck.id);
          const dueCards = isLoaded
            ? getDueCards(progress.srsCards, cards.map(c => c.id))
            : cards.map(c => c.id);
          const colors = courseColors[deck.courseId] || courseColors['CHEM008A'];
          const reviewedCount = isLoaded
            ? cards.filter(c => !!progress.srsCards[c.id]).length
            : 0;

          return (
            <div
              key={deck.id}
              className={`bg-slate-800 rounded-xl border ${colors.border} p-6 flex flex-col gap-4 hover:bg-slate-750 transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl">{deck.icon}</div>
                {isLoaded && dueCards.length > 0 && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    {dueCards.length} due
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{deck.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{deck.description}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>{cards.length} cards total</span>
                {isLoaded && (
                  <span>{reviewedCount} reviewed</span>
                )}
                <span className={`${colors.badge} text-white px-2 py-0.5 rounded-full`}>
                  {deck.courseId}
                </span>
              </div>

              {/* Progress bar */}
              {isLoaded && cards.length > 0 && (
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round((reviewedCount / cards.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${(reviewedCount / cards.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <Link
                href={`/flashcards/${deck.id}`}
                className={`w-full text-center py-2.5 rounded-lg ${colors.badge} hover:opacity-90 text-white text-sm font-medium transition-opacity`}
              >
                {isLoaded && dueCards.length > 0
                  ? `Study Now (${dueCards.length} due)`
                  : 'Study Deck'}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Info box */}
      <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-sm text-slate-400">
        <span className="text-slate-300 font-medium">How spaced repetition works: </span>
        Rate each card as Again / Hard / Good / Easy. The app schedules cards to appear
        again based on how well you knew them — reviewing more often what you find difficult.
      </div>
    </div>
  );
}
