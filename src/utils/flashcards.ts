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