import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { FlashcardList, StudySession, Flashcard, StudyOptions } from "../types";

interface StudyState {
  list: FlashcardList | null;
  session: StudySession;
  isComplete: boolean;
  isPreparing: boolean;
  studyCards: Flashcard[]; // Cards in study order (possibly shuffled)

  // Actions
  setList: (list: FlashcardList) => void;
  setStudyOptions: (options: StudyOptions) => void;
  startStudy: () => void;
  flipCard: () => void;
  answerCard: (correct: boolean) => void;
  nextCard: () => void;
  previousCard: () => void;
  restart: () => void;
  reset: () => void;

  // Computed
  getCurrentCard: () => Flashcard | null;
  getProgress: () => number;
  getPercentage: () => number;
}

const initialSession: StudySession = {
  currentIndex: 0,
  showBack: false,
  correctAnswers: 0,
  totalAnswered: 0,
  currentCardAnswered: false,
  options: {
    shuffleOrders: false,
    flipped: false,
  },
};

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useStudyStore = create<StudyState>()(
  immer((set, get) => ({
    list: null,
    session: { ...initialSession },
    isComplete: false,
    isPreparing: false,
    studyCards: [],

    setList: (list: FlashcardList) => {
      set((state) => {
        state.list = list;
        state.session = { ...initialSession };
        state.isComplete = false;
        state.isPreparing = true;
        state.studyCards = [...list.cards];
      });
    },

    setStudyOptions: (options: StudyOptions) => {
      set((state) => {
        state.session.options = options;
      });
    },

    startStudy: () => {
      const { list } = get();
      if (!list) return;

      set((state) => {
        // Apply shuffle if enabled
        if (state.session.options.shuffleOrders) {
          state.studyCards = shuffleArray(list.cards);
        } else {
          state.studyCards = [...list.cards];
        }

        state.isPreparing = false;
        state.session.currentIndex = 0;
        state.session.showBack = false;
        state.session.correctAnswers = 0;
        state.session.totalAnswered = 0;
        state.session.currentCardAnswered = false;
        state.isComplete = false;
      });
    },

    flipCard: () => {
      set((state) => {
        state.session.showBack = !state.session.showBack;
      });
    },

    answerCard: (correct: boolean) => {
      const { studyCards, session } = get();
      if (!studyCards.length || !session.showBack) return;

      set((state) => {
        state.session.correctAnswers = correct
          ? state.session.correctAnswers + 1
          : state.session.correctAnswers;
        state.session.totalAnswered += 1;
        state.session.currentCardAnswered = true;
        state.session.showBack = false;

        if (state.session.currentIndex + 1 >= studyCards.length) {
          state.isComplete = true;
        } else {
          state.session.currentIndex += 1;
          state.session.currentCardAnswered = false; // Reset for next card
        }
      });
    },

    nextCard: () => {
      const { studyCards } = get();
      if (!studyCards.length) return;

      set((state) => {
        if (state.session.currentIndex < studyCards.length - 1) {
          state.session.currentIndex += 1;
          state.session.showBack = false;
          state.session.currentCardAnswered = false;
        }
      });
    },

    previousCard: () => {
      set((state) => {
        if (state.session.currentIndex > 0) {
          state.session.currentIndex -= 1;
          state.session.showBack = false;
          state.session.currentCardAnswered = false;
        }
      });
    },

    restart: () => {
      const { list } = get();
      if (!list) return;

      set((state) => {
        // Apply shuffle if enabled
        if (state.session.options.shuffleOrders) {
          state.studyCards = shuffleArray(list.cards);
        } else {
          state.studyCards = [...list.cards];
        }

        state.session.currentIndex = 0;
        state.session.showBack = false;
        state.session.correctAnswers = 0;
        state.session.totalAnswered = 0;
        state.session.currentCardAnswered = false;
        state.isComplete = false;
      });
    },

    reset: () => {
      set((state) => {
        state.list = null;
        state.session = { ...initialSession };
        state.isComplete = false;
        state.isPreparing = false;
        state.studyCards = [];
      });
    },

    getCurrentCard: () => {
      const { studyCards, session } = get();
      if (!studyCards.length || !studyCards[session.currentIndex]) return null;
      return studyCards[session.currentIndex];
    },

    getProgress: () => {
      const { studyCards, session } = get();
      if (!studyCards.length) return 0;
      return ((session.currentIndex + 1) / studyCards.length) * 100;
    },

    getPercentage: () => {
      const { session } = get();
      if (session.totalAnswered === 0) return 0;
      return Math.round((session.correctAnswers / session.totalAnswered) * 100);
    },
  }))
);
