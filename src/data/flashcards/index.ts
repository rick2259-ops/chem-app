import { functionalGroupCards, functionalGroupsDeck } from './functional-groups';
import { reagentCards, reagentsDeck } from './reagents';
import { namedReactionCards, namedReactionsDeck } from './named-reactions';
import { stereochemistryCards, stereochemistryDeck } from './stereochemistry';
import { chem008cCards, chem008cDeck } from './chem008c';
import { Flashcard, Deck } from '@/types/flashcard';

export const allDecks: Deck[] = [
  functionalGroupsDeck,
  reagentsDeck,
  namedReactionsDeck,
  stereochemistryDeck,
  chem008cDeck,
];

export const deckMap: Record<string, Deck> = {
  'functional-groups': functionalGroupsDeck,
  'reagents': reagentsDeck,
  'named-reactions': namedReactionsDeck,
  'stereochemistry': stereochemistryDeck,
  'chem008c': chem008cDeck,
};

export const allCards: Flashcard[] = [
  ...functionalGroupCards,
  ...reagentCards,
  ...namedReactionCards,
  ...stereochemistryCards,
  ...chem008cCards,
];

export const cardMap: Record<string, Flashcard> = Object.fromEntries(
  allCards.map(card => [card.id, card])
);

export function getDeck(deckId: string): Deck | undefined {
  return deckMap[deckId];
}

export function getCardsForDeck(deckId: string): Flashcard[] {
  return allCards.filter(card => card.deckId === deckId);
}

export function getCard(cardId: string): Flashcard | undefined {
  return cardMap[cardId];
}

export function getDecksByCourse(courseId: string): Deck[] {
  return allDecks.filter(deck => deck.courseId === courseId);
}

export {
  functionalGroupCards,
  functionalGroupsDeck,
  reagentCards,
  reagentsDeck,
  namedReactionCards,
  namedReactionsDeck,
  stereochemistryCards,
  stereochemistryDeck,
  chem008cCards,
  chem008cDeck,
};
