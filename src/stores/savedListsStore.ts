import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { FlashcardList, SavedList } from "../types";
import { encodeListToUrl } from "../utils/urlData";

interface SavedListsState {
  savedLists: SavedList[];
  saveFlashcardList: (list: FlashcardList) => void;
  deleteSavedList: (id: string) => void;
  updateLastAccessed: (id: string) => void;
  isListSaved: (id: string) => boolean;
}

export const useSavedListsStore = create<SavedListsState>()(
  persist(
    immer((set, get) => ({
      savedLists: [],

      saveFlashcardList: (list: FlashcardList) => {
        set((state) => {
          const now = new Date();
          const existingIndex = state.savedLists.findIndex(
            (saved) => saved.id === list.id
          );
          const encodedData = encodeListToUrl(list);

          const savedList: SavedList = {
            id: list.id,
            title: list.title,
            cardCount: list.cards.length,
            createdAt:
              existingIndex >= 0
                ? state.savedLists[existingIndex].createdAt
                : now,
            lastAccessed: now,
            encodedData,
          };

          if (existingIndex >= 0) {
            state.savedLists[existingIndex] = savedList;
          } else {
            state.savedLists.push(savedList);
          }
        });
      },

      deleteSavedList: (id: string) => {
        set((state) => {
          state.savedLists = state.savedLists.filter((list) => list.id !== id);
        });
      },

      updateLastAccessed: (id: string) => {
        set((state) => {
          const index = state.savedLists.findIndex((list) => list.id === id);
          if (index >= 0) {
            state.savedLists[index].lastAccessed = new Date();
          }
        });
      },

      isListSaved: (id: string) => {
        return get().savedLists.some((saved) => saved.id === id);
      },
    })),
    {
      name: "flashcards_saved_lists",
      partialize: (state) => ({ savedLists: state.savedLists }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert date strings back to Date objects and handle old format migration
          state.savedLists = state.savedLists
            .map((list) => {
              const updatedList = {
                ...list,
                createdAt: new Date(list.createdAt),
                lastAccessed: new Date(list.lastAccessed),
              };

              return updatedList;
            })
            .filter((list) => "encodedData" in list); // Only keep lists with encodedData
        }
      },
    }
  )
);
