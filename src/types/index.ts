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

export interface StudySession {
  currentIndex: number;
  showBack: boolean;
  correctAnswers: number;
  totalAnswered: number;
}