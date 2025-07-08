import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { FlashcardList, StudySession, Flashcard } from "../types";

interface StudyState {
  list: FlashcardList | null;
  session: StudySession;
  isComplete: boolean;

  // Actions
  setList: (list: FlashcardList) => void;
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
};

export const useStudyStore = create<StudyState>()(
  immer((set, get) => ({
    list: null,
    session: { ...initialSession },
    isComplete: false,

    setList: (list: FlashcardList) => {
      set((state) => {
        state.list = list;
        state.session = { ...initialSession };
        state.isComplete = false;
      });
    },

    flipCard: () => {
      set((state) => {
        state.session.showBack = !state.session.showBack;
      });
    },

    answerCard: (correct: boolean) => {
      const { list, session } = get();
      if (!list || !session.showBack) return;

      set((state) => {
        state.session.correctAnswers = correct
          ? state.session.correctAnswers + 1
          : state.session.correctAnswers;
        state.session.totalAnswered += 1;
        state.session.showBack = false;

        if (state.session.currentIndex + 1 >= list.cards.length) {
          state.isComplete = true;
        } else {
          state.session.currentIndex += 1;
        }
      });
    },

    nextCard: () => {
      const { list } = get();
      if (!list) return;

      set((state) => {
        if (state.session.currentIndex < list.cards.length - 1) {
          state.session.currentIndex += 1;
          state.session.showBack = false;
        }
      });
    },

    previousCard: () => {
      set((state) => {
        if (state.session.currentIndex > 0) {
          state.session.currentIndex -= 1;
          state.session.showBack = false;
        }
      });
    },

    restart: () => {
      set((state) => {
        state.session = { ...initialSession };
        state.isComplete = false;
      });
    },

    reset: () => {
      set((state) => {
        state.list = null;
        state.session = { ...initialSession };
        state.isComplete = false;
      });
    },

    getCurrentCard: () => {
      const { list, session } = get();
      if (!list || !list.cards[session.currentIndex]) return null;
      return list.cards[session.currentIndex];
    },

    getProgress: () => {
      const { list, session } = get();
      if (!list || list.cards.length === 0) return 0;
      return ((session.currentIndex + 1) / list.cards.length) * 100;
    },

    getPercentage: () => {
      const { session } = get();
      if (session.totalAnswered === 0) return 0;
      return Math.round((session.correctAnswers / session.totalAnswered) * 100);
    },
  }))
);
