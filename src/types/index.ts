export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardList {
  id: string;
  title: string;
  cards: Flashcard[];
}

export interface StudyOptions {
  shuffleOrders: boolean;
  flipped: boolean;
}

export interface StudySession {
  currentIndex: number;
  showBack: boolean;
  correctAnswers: number;
  totalAnswered: number;
  currentCardAnswered: boolean;
  incorrectCards: Flashcard[];
  options: StudyOptions;
}

export interface SavedList {
  id: string;
  title: string;
  cardCount: number;
  createdAt: Date;
  lastAccessed: Date;
  encodedData: string;
}