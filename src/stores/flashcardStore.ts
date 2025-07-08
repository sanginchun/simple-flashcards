import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { FlashcardList } from "../types";
import {
  createEmptyList,
  createEmptyCard,
  validateCardText,
} from "../utils/flashcards";
import { generateShareableUrl } from "../utils/urlData";

interface FlashcardState {
  list: FlashcardList;
  hasUnsavedChanges: boolean;
  shareUrl: string;
  showShareModal: boolean;

  // Actions
  setList: (list: FlashcardList) => void;
  resetToEmpty: () => void;
  updateTitle: (title: string) => void;
  addCard: () => void;
  updateCard: (
    cardId: string,
    field: "front" | "back",
    value: string
  ) => boolean;
  deleteCard: (cardId: string) => void;
  markSaved: () => void;
  generateShareUrl: () => void;
  setShowShareModal: (show: boolean) => void;

  // Validation
  isValidForSaving: () => { isValid: boolean; error?: string };
}

export const useFlashcardStore = create<FlashcardState>()(
  immer((set, get) => ({
    list: createEmptyList(),
    hasUnsavedChanges: false,
    shareUrl: "",
    showShareModal: false,

    setList: (list: FlashcardList) => {
      set((state) => {
        state.list = list;
        state.hasUnsavedChanges = false;
      });
    },

    resetToEmpty: () => {
      set((state) => {
        state.list = createEmptyList();
        state.hasUnsavedChanges = false;
        state.shareUrl = "";
        state.showShareModal = false;
      });
    },

    updateTitle: (title: string) => {
      set((state) => {
        state.list.title = title;
        state.hasUnsavedChanges = true;
      });
    },

    addCard: () => {
      set((state) => {
        const newCard = createEmptyCard();
        state.list.cards.push(newCard);
        state.hasUnsavedChanges = true;
      });
    },

    updateCard: (cardId: string, field: "front" | "back", value: string) => {
      if (!validateCardText(value)) {
        return false;
      }

      set((state) => {
        const card = state.list.cards.find((c) => c.id === cardId);
        if (card) {
          card[field] = value;
          state.hasUnsavedChanges = true;
        }
      });

      return true;
    },

    deleteCard: (cardId: string) => {
      set((state) => {
        state.list.cards = state.list.cards.filter(
          (card) => card.id !== cardId
        );
        state.hasUnsavedChanges = true;
      });
    },

    markSaved: () => {
      set((state) => {
        state.hasUnsavedChanges = false;
      });
    },

    generateShareUrl: () => {
      const { list } = get();
      try {
        const url = generateShareableUrl(list, "view");
        set((state) => {
          state.shareUrl = url;
        });
        return url;
      } catch (error) {
        throw error;
      }
    },

    setShowShareModal: (show: boolean) => {
      set((state) => {
        state.showShareModal = show;
      });
    },

    isValidForSaving: () => {
      const { list } = get();

      if (!list.title.trim()) {
        return {
          isValid: false,
          error: "Please enter a title for your flashcard set!",
        };
      }

      if (list.cards.length === 0) {
        return { isValid: false, error: "Please add at least one flashcard!" };
      }

      const hasEmptyCards = list.cards.some(
        (card) => !card.front.trim() || !card.back.trim()
      );
      if (hasEmptyCards) {
        return {
          isValid: false,
          error: "Please fill in all flashcard fields!",
        };
      }

      return { isValid: true };
    },
  }))
);
