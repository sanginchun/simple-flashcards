import { FlashcardList, SavedList } from "../types";

const SAVED_LISTS_KEY = "flashcards_saved_lists";

export function getSavedLists(): SavedList[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(SAVED_LISTS_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved) as SavedList[];
    return parsed.map((list) => ({
      ...list,
      createdAt: new Date(list.createdAt),
      lastAccessed: new Date(list.lastAccessed),
    }));
  } catch (error) {
    console.error("Error loading saved lists:", error);
    return [];
  }
}

export function saveFlashcardList(
  flashcardList: FlashcardList,
  viewUrl: string,
  editUrl: string
): void {
  if (typeof window === "undefined") return;

  try {
    const savedLists = getSavedLists();
    const now = new Date();

    const existingIndex = savedLists.findIndex(
      (saved) => saved.id === flashcardList.id
    );

    const savedList: SavedList = {
      id: flashcardList.id,
      title: flashcardList.title,
      cardCount: flashcardList.cards.length,
      createdAt: existingIndex >= 0 ? savedLists[existingIndex].createdAt : now,
      lastAccessed: now,
      viewUrl,
      editUrl,
    };

    if (existingIndex >= 0) {
      savedLists[existingIndex] = savedList;
    } else {
      savedLists.push(savedList);
    }

    localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(savedLists));
  } catch (error) {
    console.error("Error saving flashcard list:", error);
  }
}

export function deleteSavedList(id: string): void {
  if (typeof window === "undefined") return;

  try {
    const savedLists = getSavedLists();
    const filtered = savedLists.filter((list) => list.id !== id);
    localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting saved list:", error);
  }
}

export function updateLastAccessed(id: string): void {
  if (typeof window === "undefined") return;

  try {
    const savedLists = getSavedLists();
    const index = savedLists.findIndex((list) => list.id === id);

    if (index >= 0) {
      savedLists[index].lastAccessed = new Date();
      localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(savedLists));
    }
  } catch (error) {
    console.error("Error updating last accessed:", error);
  }
}
