import { Flashcard, FlashcardList } from '@/types';
import { nanoid } from 'nanoid';

export const createEmptyList = (): FlashcardList => ({
  id: nanoid(),
  title: 'My Flashcards',
  cards: []
});

export const createEmptyCard = (): Flashcard => ({
  id: nanoid(),
  front: '',
  back: ''
});

export const validateCardText = (text: string): boolean => {
  // Max length to ensure URL encoding doesn't exceed limits
  const MAX_CARD_TEXT_LENGTH = 200;
  return text.length <= MAX_CARD_TEXT_LENGTH;
};

export const addCardToList = (list: FlashcardList, card: Flashcard): FlashcardList => ({
  ...list,
  cards: [...list.cards, card]
});

export const updateCardInList = (list: FlashcardList, cardId: string, updates: Partial<Flashcard>): FlashcardList => ({
  ...list,
  cards: list.cards.map(card => 
    card.id === cardId ? { ...card, ...updates } : card
  )
});

export const removeCardFromList = (list: FlashcardList, cardId: string): FlashcardList => ({
  ...list,
  cards: list.cards.filter(card => card.id !== cardId)
});

export const updateListTitle = (list: FlashcardList, title: string): FlashcardList => ({
  ...list,
  title
});