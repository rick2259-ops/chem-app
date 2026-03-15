import { SRSCard } from '@/types/flashcard';

// SM-2 Spaced Repetition Algorithm
export function reviewCard(card: SRSCard, rating: 0 | 1 | 2 | 3): SRSCard {
  // rating: 0=Again, 1=Hard, 2=Good, 3=Easy
  let { interval, easeFactor, repetitions } = card;

  if (rating === 0) {
    // Again - reset
    interval = 1;
    repetitions = 0;
  } else if (rating === 1) {
    // Hard - repeat soon
    interval = Math.max(1, Math.round(interval * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
    repetitions += 1;
  } else if (rating === 2) {
    // Good
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    // Easy - increase ease
    if (repetitions === 0) interval = 4;
    else interval = Math.round(interval * easeFactor * 1.3);
    easeFactor = Math.min(2.5, easeFactor + 0.15);
    repetitions += 1;
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    ...card,
    interval,
    easeFactor,
    repetitions,
    nextReviewDate: nextDate.toISOString().split('T')[0],
    lastRating: rating,
  };
}

export function getDueCards(
  srsCards: Record<string, SRSCard>,
  deckCardIds: string[]
): string[] {
  const today = new Date().toISOString().split('T')[0];
  return deckCardIds.filter(id => {
    const card = srsCards[id];
    if (!card) return true; // New card, always due
    return card.nextReviewDate <= today;
  });
}

export function createNewSRSCard(flashcardId: string): SRSCard {
  return {
    flashcardId,
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewDate: new Date().toISOString().split('T')[0],
    lastRating: 2,
  };
}
